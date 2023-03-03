# loag library
import os
from PIL import Image
import torch
import numpy as np
import torchvision.transforms as T

import pickle

# load result

output_img = os.sys.argv[1]
check = os.sys.argv[2]

with open('./encoding_img_list.pkl', 'rb') as f:
    result = pickle.load(f)

transform = T.Resize((50, 50))

outputimg = output_img[30:]
test = Image.open(outputimg)

transform_test_img = transform(test)

tensor_test_img = torch.Tensor(np.array(transform_test_img))

encoding_test_img = tensor_test_img.view([-1])

test_norm = torch.norm(encoding_test_img)

num = 0

dist = []

for x_norm, encoding_img in result:

    value = 0

    for a, b in zip(encoding_img, encoding_test_img):

        value += (a*b)

    distance = value/(x_norm*test_norm)

    dist.append([distance.item(), num])
    num += 1

dist.sort()

lst = []

if check == "2":
    for i in range(0, 5):
        lst.append(dist[i][1]+1)
    print(lst)
else:
    for i in range(31, 26, -1):
        lst.append(dist[i][1]+1)
    print(lst)
