import axios from 'axios';
import _ from 'lodash';
import CONSTANTS from '../constants';

const { API_ROOT } = CONSTANTS;

const athenaService = {
  startAthenaJob: (formObj) => startAthenaJob(formObj),
  uploadPersonalImage: (files, formObj) => marshallPersonalImageUpload(files, formObj),
  uploadArtImage: (files, formObj) => marshallArtImageUpload(files, formObj),
};

export default athenaService;

const startAthenaJob = (jobInfo) => {
  return axios.post(`${API_ROOT}/api/athena/start`, jobInfo);
}

const marshallPersonalImageUpload = (files, formObj) => {
  const formData = new FormData();
  formData.append('content_image', files[0]);
  formData.append('firstName', formObj.firstName);
  formData.append('lastName', formObj.lastName);
  formData.append('email', formObj.email);
  formData.append('fileName', formObj.fileName);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  return axios.post(`${API_ROOT}/api/athena/upload-images/content`, formData, config);
};

const marshallArtImageUpload = (files, formObj) => {
  const formData = new FormData();
  formData.append('style_image', files[0]);
  formData.append('firstName', formObj.firstName);
  formData.append('lastName', formObj.lastName);
  formData.append('email', formObj.email);
  formData.append('fileName', formObj.fileName);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  return axios.post(`${API_ROOT}/api/athena/upload-images/style`, formData, config);
};