<template>
  <div class="content">
    <div id="upload">
      <b-button v-b-modal.modal-1 pill size="lg"
                variant="outline-success"
                @click="modalShow = !modalShow">
        Upload your photo
      </b-button>
      <b-modal id="modal-lg" v-model="modalShow"
               size="lg"
               title="Intelligent Poster Generator">
        <b-form>
          <h4>Input image</h4>
          <b-form-file
            v-model="form.img"
            class="mt-3"
            plain
            @change='upLoad($event)'
          ></b-form-file>
          <div class="mt-3">Selected file: {{ form.img ? form.img.name : '' }}</div>
          <hr>
          <br>
          <h4>Input text</h4>
          <br>
          <b-form-input
            v-model="form.text"
            placeholder="Enter a sentence"
          ></b-form-input>
          <hr>
          <br>
          <h4>Choose an ideal color</h4>
          <br>
          <b-form-input
            id="color"
            v-model="form.color"
            type="color">
          </b-form-input>
        </b-form>

        <template #modal-footer>
          <b-button type="reset" variant="outline-danger" @click="onReset()">
            Reset
          </b-button>
          <b-button type="submit" variant="success" @click="onSubmit(form)">
            Submit
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<!--http://ve450poster-1306380978.cos.ap-shanghai.myqcloud.com-->
<script>
import COS from 'cos-js-sdk-v5';
import axios from 'axios';
// import axios from 'axios';

const Bucket = 've450poster-1306380978';
const Region = 'ap-shanghai';
const cos = new COS({
  getAuthorization(options, callback) {
    const authorization = COS.getAuthorization({
      SecretId: 'AKIDe6HDsHPIuFJ6dw0nKabLr63kBNIxMUji',
      SecretKey: 'jCPL0PXWKvHXbR2NVS9cplRrY2GEuJSK',
      Method: options.Method,
      Key: options.Key,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 60,
    });
    callback(authorization);
  },
});

export default {
  name: 'uploader',

  data() {
    return {
      modalShow: false,
      form: {
        img: null,
        text: '',
        color: '',
      },
      load: {
        imgName: '',
        fileType: '',
        text: '',
        color: '',
      },
    };
  },

  mounted() {
  },

  methods: {
    upLoad(e) {
      const file = e.target.files[0];
      if (!file) return;
      // 分片上传文件
      cos.putObject({
        Bucket,
        Region,
        Key: file.name,
        Body: file,
        // eslint-disable-next-line no-unused-vars
        onProgress(progressData, callback) {
        },
      },
      // eslint-disable-next-line no-unused-vars
      (err, data) => {
      });
      cos.getObjectUrl({
        Key: file.name,
        Bucket,
        Sign: false,
        Region: 'ap-shanghai',
      }, (err, data) => {

      });
    },
    postLoad(input) {
      const path = 'http://localhost:5000/algorithm';
      axios.post(path, input)
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    initForm(){
      this.form.img = null;
      this.form.text = '';
      this.form.color = '';
    },
    onSubmit(form) {
      if (!form.img) {
        // eslint-disable-next-line no-alert
        alert('Please upload at least one image!');
        return;
      }
      // eslint-disable-next-line no-alert
      alert('Upload Succeed!');
      this.modalShow = false;
      // window.alert(this.child_payload);
      this.load.imgName = form.img.name;
      this.load.fileType = form.img.type;
      this.load.text = form.text;
      this.load.color = form.color;
      this.postLoad(this.load);
      this.initForm();
    },
    onReset() {
      this.initForm();
    }
  },

};

</script>

<style scoped>
h4 {
  text-align: center;
}
</style>
