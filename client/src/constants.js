const CONSTANTS = {
  API_ROOT: process.env.NODE_ENV === 'development' ? process.env.DEV_API_ROOT : process.env.PROD_API_ROOT,
};

export default CONSTANTS;