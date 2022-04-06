import requests as req
import torch

from img_module.inference_model import ImageInferenceModel
from text_processing_module.inference_model import TextInferenceModel
from io import BytesIO
from PIL import Image

from flask import Flask, json, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin
# configuration
DEBUG = True

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
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        super(BackendInferenceModel, self).__init__(device=device)

    def predict_from_raw(self, json_data):
        img_response = req.get(BUCKET_URL + '/' + json_data['imgName'])
        img = Image.open(BytesIO(img_response.content))
        text = json_data['text']
        text = text if text else None
        return self.predict(img, text)


# instantiate the app
inference_model = BackendInferenceModel()
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})
RESULT = [1, 3, 5]
output = {}


@app.route('/algorithm', methods=['GET', 'POST'])
@cross_origin()
def predict():
    if request.method == 'POST':
        post_data = request.get_json()
        result = inference_model.predict_from_raw(json_data=post_data)
        result = '{},{},{}'.format(result[0], result[1], result[2])
        output['result'] = result
        # print(output)
    return jsonify(output)


if __name__ == '__main__':
    app.run()
