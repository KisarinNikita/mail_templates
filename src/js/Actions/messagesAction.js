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

export const createMessageAction = (title, body, category) => dispatch => {
  return API('createMessage', {
    data: { title: title, body: body, category: {id: category} },
  }).then(res => {
    console.log(res.result);
    dispatch({
      type: 'CREATE_MESSAGE_SUCCESS',
      payload: {
        id: res.result["Primary key"]["id"],
        title: title,
        category: {id: category},
        body: body,
      }
    });
  }).catch(err => {
    console.log(err);
    dispatch({
      type: 'CREATE_MESSAGE_FAILED',
      payload: err
    });
  });
};

export const deleteMessageAction = (id) => dispatch => {
  return API('deleteMessage', {
    conditions: ["id", "=", id],
  }).then(res => {
    dispatch({
      type: 'DELETE_MESSAGE_SUCCESS',
      payload: id
    });
  }).catch(err => {
    dispatch({
      type: 'DELETE_MESSAGE_FAILED',
      payload: err
    });
  });
};

export const updateMessageAction = (id, title, body, category) => dispatch => {
  return API('updateMessage', {
    conditions: ["id", "=", id],
    data: { title: title, body: body, category: {id: category}},
  }).then(res => {
    dispatch({
      type: 'UPDATE_MESSAGE_SUCCESS',
      payload: {
        id: id,
        title: title,
        body: body,
        category: category
      }
    });
  }).catch(err => {
    dispatch({
      type: 'UPDATE_MESSAGE_FAILED',
      payload: err
    });
  });
};

export const searchFilterMessageAction = (data) => dispatch => {
  dispatch({
    type: 'SEARCH_FILTER_MESSAGE_SUCCESS',
    payload: data
  });
};
