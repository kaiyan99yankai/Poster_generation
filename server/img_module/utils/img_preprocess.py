import img_module
import torch
import torchvision
import cv2

from einops import rearrange


def tensor_to_cv2(img_tensor):
    num_channel = img_tensor.shape[0]
    img = (img_tensor * 255).byte()
    img = img.numpy()
    img = rearrange(img, 'c h w -> h w c')
    if num_channel == 3:
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img
