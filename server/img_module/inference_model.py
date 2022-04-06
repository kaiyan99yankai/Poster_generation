import timm
import torch

from einops import rearrange
from torchvision import transforms

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


class ImageInferenceModel():
    def __init__(
            self,
            resize_size,
            device,
            weight_path='./img_module/weights/efficientnet/weight.pth.tar'):
        self.transform = transforms.Compose([
            transforms.Resize((resize_size, resize_size)),
            transforms.ToTensor(),
            transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD)
        ])
        self.net = timm.create_model('efficientnet_b0', num_classes=9)
        self.net.to(device)
        self.net.eval()
        self.net.load_state_dict(torch.load(weight_path, map_location=device))
        self.device = device

    def predict(self, image, top_k=3):
        # image is a PIL image
        with torch.no_grad():
            image = image.convert('RGB')
            img = self.transform(image).to(self.device)
            img = rearrange(img, 'c h w -> () c h w')
            label = self.net(img).topk(top_k)[1][0].cpu().numpy().tolist()
        return label
