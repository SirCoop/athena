import axios from 'axios';
import _ from 'lodash';
import CONSTANTS from '../constants';

const { API_ROOT } = CONSTANTS;

const athenaService = {
  uploadFiles: files => axios.post(`${API_ROOT}/athena/images`, marshallFileUpload(files)),
};

export default athenaService;

const marshallFileUpload = (files) => {
  console.log('service: ', files);
  return files;
};