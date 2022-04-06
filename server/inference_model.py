import requests as req

from img_module.inference_model import ImageInferenceModel
from text_processing_module.inference_model import TextInferenceModel
from io import BytesIO
from PIL import Image

BUCKET_URL = 'http://ve450poster-1306380978.cos.ap-shanghai.myqcloud.com'


class InferenceModel():
    def __init__(self, device='cuda'):
        self.img_model = ImageInferenceModel(224, device=device)
        self.text_model = TextInferenceModel(device=device)

    def predict(self, img, text):
        img_labels = self.img_model.predict(img)
        if text is not None:
            text_labels = self.text_model.predict(text)
            return [*img_labels[0:2], text_labels]
        else:
            return img_labels


class BackendInferenceModel(InferenceModel):
    def __init__(self, device='cuda'):
        super(BackendInferenceModel, self).__init__(device=device)

    def predict_from_raw(self, json_data):
        img_response = req.get(BUCKET_URL + '/' + json_data.load.imgName)
        img = Image.open(BytesIO(img_response.content))
        text = json_data.load.text
        return self.predict(img, text)
