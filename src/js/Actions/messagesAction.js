import API from "../api";

export const readMessagesAction = () => dispatch => {
  return API('readMessage', {
    conditions: ["id", "IS NOT NULL"],
    fields: ["id", "title", "body", "category"]
  }).then(res => {
    dispatch({
      type: 'READ_MESSAGES_SUCCESS',
      payload: res.result
    });
  }).catch(err => {
    dispatch({
      type: 'READ_MESSAGES_FAILED',
      payload: err
    });
  });
};