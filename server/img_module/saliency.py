import torch
import logging

from .u2net import U2NET, U2NETP
from pathlib2 import Path
from torchvision import transforms
from .utils.tensor_operation import normalization_by_range

# The paper and original repo for U2Net can be seen in the README's reference
NETS = {
    'u2net': (U2NET, Path('./img_module/weights/u2net/u2net.pth')),
    'u2netp': (U2NETP, Path('./img_module/weights/u2net/u2netp.pth'))
}

IMGNET_MEAN_RGB = (0.485, 0.456, 0.406)
IMGNET_STD_RGB = (0.229, 0.224, 0.225)


class SaliencyObjDetecter:
    def __init__(self, device, net_type='u2net'):
        self.device = device
        # initial net
        net_class, net_weight_path = NETS[net_type]
        self.net = net_class()
        logging.info('Using {} with weight {}'.format(net_type,
                                                      net_weight_path))
        self.net.load_state_dict(torch.load(str(net_weight_path)))
        self.net.to(device)
        self.net.eval()

        # initial transforms
        self.transform = transforms.Compose([
            transforms.Resize(320),
            transforms.ToTensor(),
            transforms.Normalize(IMGNET_MEAN_RGB, IMGNET_STD_RGB)
        ])

        self.img_transform = transforms.Compose(
            [transforms.Resize(320),
             transforms.ToTensor()])

    def get_saliency_mask(self, img):
        with torch.no_grad():
            img_tensor = self.transform(img).unsqueeze(0).to(self.device)
            d0 = self.net(img_tensor)
            mask = normalization_by_range(d0[:, 0, :, :]).to('cpu')
        return mask

    def get_front_back_ground(self, img):
        mask_tensor = self.get_saliency_mask(img)
        img_tensor = self.img_transform(img)
        background_tensor = img_tensor * (1 - mask_tensor)
        frontground_tensor = img_tensor * mask_tensor
        return frontground_tensor, background_tensor
