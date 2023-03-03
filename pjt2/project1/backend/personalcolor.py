#import package

import glob

import os
import os.path as osp

import random

import numpy as np

import json

from PIL import Image

import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
import torchvision
from torchvision import models, transforms

#face detection
import dlib

detector = dlib.get_frontal_face_detector()  #얼굴 영역 인식 모델 로드
sp = dlib.shape_predictor("./BeautyGAN/shape_predictor_5_face_landmarks.dat")

def align_faces(img):  #원본이미지를 넣으면 align 완료된 얼굴이미지 반환하는 함수
    dets = detector(img,1)

    objs = dlib.full_object_detections()

    for detection in dets:
        s = sp(img, detection)
        objs.append(s)

    faces = dlib.get_face_chips(img, objs, size=256, padding=0.35)

    return faces


#입력 이미지의 전처리 클래스
#훈련시와 추론시 처리가 다르다

class ImageTransform():
    
    """
    이미지 전처리 클래스, 훈련시, 검증시의 동작이 다르다.
    이미지 크기를 리사이즈하고, 색상을 표준화

    훈련시에는 RandomResizedCrop과 RandomHorizontalFlip으로 데이터 확장

    Attributes
    ---------------
    resize: int
        리사이즈 대상 이미지의 크기

    mean: (R,G,B)
        각 색상 채널의 평균값
    
    std : (R,G,B)
        각 색상 채널의 표준편차
    """

    def __init__(self, resize, mean, std):
        
        self.data_transform = {
            'train': transforms.Compose([
                transforms.RandomResizedCrop(
                    resize,scale = (0.5,1.0) #데이터 확장
                ),
                transforms.RandomHorizontalFlip(), #데이터 확장
                transforms.ToTensor(), #텐서 변환
                transforms.Normalize(mean,std) #표준화
            ]),
            'val': transforms.Compose([
                transforms.Resize(resize), #리사이즈
                transforms.CenterCrop(resize), #이미지 중앙을 resize*resize로 자르기
                transforms.ToTensor(), #텐서로 변환
                transforms.Normalize(mean,std) #표준화
            ])
        }

    def __call__(self,img,phase='train'):
        
        """
        Parameters
        -----------
        phase: 'train' or 'val'
            전처리 모드를 지정
        """

        return self.data_transform[phase](img)
    

#학습된 mobilenetv2 모델을 로드

net = models.mobilenet_v2(pretrained = False)

#마지막 출력층의 출력 유닛을 spring,summer,fall,winter 4가지로 바꾼다

net.classifier[1] = nn.Linear(in_features=1280, out_features=4, bias=True)

#학습된 모델의 parameter를 가져온다.

model_state_dict = torch.load("./MobileNetV2/model.pth")
net.load_state_dict(model_state_dict)

# 추론 모드
net.eval()

#추론

#1. 이미지 읽기

image_file_path = os.sys.argv[1]
img = dlib.load_rgb_image(image_file_path)
img = align_faces(img)
img = Image.fromarray(np.uint8(img[0])).convert('RGB')

#3. 이미지 전처리

size = 224

mean = (0.485, 0.456, 0.406)

std = (0.229, 0.224, 0.225)

transform = ImageTransform(size,mean,std)
img_transformed = transform(img,phase='val') #torch.Size([3,224,224])

img_transformed = img_transformed.unsqueeze(0)

#inference
outputs = net(img_transformed)
_, preds = torch.max(outputs, 1) 

print(preds.item())