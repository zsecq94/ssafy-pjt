import os
import dlib
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import tensorflow as tf
import numpy as np
import time

# define function


def align_faces(img):  # 원본이미지를 넣으면 align 완료된 얼굴이미지 반환하는 함수
    dets = detector(img, 1)

    objs = dlib.full_object_detections()

    for detection in dets:
        s = sp(img, detection)
        objs.append(s)

    faces = dlib.get_face_chips(img, objs, size=256, padding=0.35)

    return faces


def preprocess(img):
    return img.astype(np.float32) / 127.5 - 1  # 0 ~ 255 -> -1 ~ 1


def postprocess(img):
    return ((img+1.)*127.5).astype(np.uint8)  # -1 ~ 1 -> 0 ~ 255

# load model


detector = dlib.get_frontal_face_detector()  # 얼굴 영역 인식 모델 로드
sp = dlib.shape_predictor("./BeautyGAN/shape_predictor_5_face_landmarks.dat")

# at the beginning of the program for complex migration projects from TensorFlow 1.x to 2.x.
tf.compat.v1.disable_eager_execution()

with tf.compat.v1.Session() as sess:  # 위 코드를 통해 즉시실행했기 때문에 with문으로 감싸줘야한다.
    sess.run(tf.compat.v1.global_variables_initializer())

sess = tf.compat.v1.Session()
saver = tf.compat.v1.train.import_meta_graph("./BeautyGAN/model.meta")
saver.restore(sess, tf.train.latest_checkpoint("./BeautyGAN/"))
graph = tf.compat.v1.get_default_graph()

X = graph.get_tensor_by_name('X:0')  # source
Y = graph.get_tensor_by_name('Y:0')  # reference
Xs = graph.get_tensor_by_name('generator/xs:0')  # output

# find face in images

img1 = dlib.load_rgb_image('./images/'+os.sys.argv[1])
img1_faces = align_faces(img1)

img2 = dlib.load_rgb_image('./images/'+os.sys.argv[2])
img2_faces = align_faces(img2)


# run

src_img = img1_faces[0]  # 소스 이미지
ref_img = img2_faces[0]  # 레퍼런스 이미지

X_img = preprocess(src_img)
# np.expand_dims() : 배열에 차원을 추가한다. 즉, (256,256,2) -> (1,256,256,3)
X_img = np.expand_dims(X_img, axis=0)

Y_img = preprocess(ref_img)
Y_img = np.expand_dims(Y_img, axis=0)  # 텐서플로에서 0번 axis는 배치 방향

output = sess.run(Xs, feed_dict={
    X: X_img,
    Y: Y_img
})

output_img = postprocess(output[0])


data = time.time()

plt.imsave(f'./images/output_{data}.jpg', output_img)

print(f'images/output_{data}.jpg')
