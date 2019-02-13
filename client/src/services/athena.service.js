import axios from 'axios';
import _ from 'lodash';
import CONSTANTS from '../constants';

const { API_ROOT } = CONSTANTS;

const athenaService = {
  uploadPersonalImage: files => marshallPersonalImageUpload(files),
  uploadArtImage: files => marshallArtImageUpload(files),
};

export default athenaService;

const marshallPersonalImageUpload = (files) => {
  console.log('service files: ', files);
  const formData = new FormData();
  formData.append('content_image', files[0]);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${API_ROOT}/athena/upload-images/content`, formData, config)
      .then((response) => {
          console.log("The file is successfully uploaded");
      }).catch((error) => {
  });
};

const marshallArtImageUpload = (files) => {
  console.log('service files: ', files);
  const formData = new FormData();
  formData.append('style_image', files[0]);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${API_ROOT}/athena/upload-images/style`, formData, config)
      .then((response) => {
          console.log("The file is successfully uploaded");
      }).catch((error) => {
  });
};