import axios from 'axios';
import _ from 'lodash';
import CONSTANTS from '../constants';

const { API_ROOT } = CONSTANTS;

const athenaService = {
  uploadFiles: files => marshallFileUpload(files),
};

export default athenaService;

const marshallFileUpload = (file) => {
  console.log('service file: ', file);
  const formData = new FormData();
  formData.append('image', file[0]);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${API_ROOT}/athena/upload-images`, formData, config)
      .then((response) => {
          console.log("The file is successfully uploaded");
      }).catch((error) => {
  });
};