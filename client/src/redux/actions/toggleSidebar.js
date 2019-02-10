export default bool => {
  return {
    type: 'TOGGLE_SIDEBAR',
    payload: bool,
  };
};