import API from "../api";

export const readCategoryAction = () => dispatch => {
  return API('readCategory', {
    conditions: ["id", "IS NOT NULL"],
    fields: ["id", "title", "parent", "messages", "children"]
  }).then(res => {
    dispatch({
      type: 'READ_CATEGORY_SUCCESS',
      payload: res.result
    });
  }).catch(err => {
    dispatch({
      type: 'READ_CATEGORY_FAILED',
      payload: err
    });
  });
};

export const deleteCategoryAction = (id) => dispatch => {
  return API('deleteCategory', {
    conditions: ["id", "=", id],
  }).then(res => {
    dispatch({
      type: 'DELETE_CATEGORY_SUCCESS',
      payload: id
    });
  }).catch(err => {
    dispatch({
      type: 'DELETE_CATEGORY_FAILED',
      payload: err
    });
  });
};

export const createCategoryAction = (title, parent) => dispatch => {
  return API('createCategory', {
    data: { title: title, parent: parent ? { id: parent } : null },
  }).then(res => {
    dispatch({
      type: 'CREATE_CATEGORY_SUCCESS',
      payload: {
        id: res.result["Primary key"]["id"],
        title: title,
        messages: [],
        parent: parent ? { id: parent } : null
      }
    });
  }).catch(err => {
    dispatch({
      type: 'CREATE_CATEGORY_FAILED',
      payload: err
    });
  });
};

export const updateCategoryAction = (id, title, parent) => dispatch => {
  return API('createCategory', {
    conditions: ["id", "=", id],
    data: { title: title, parent: parent ? { id: parent } : null },
  }).then(res => {
    dispatch({
      type: 'UPDATE_CATEGORY_SUCCESS',
      payload: {
        id: id,
        title: title,
        messages: [],
        parent: parent ? { id: parent } : null
      }
    });
  }).catch(err => {
    dispatch({
      type: 'UPDATE_CATEGORY_FAILED',
      payload: err
    });
  });
};

export const searchFilterAction = (data) => dispatch => {
  dispatch({
    type: 'SEARCH_FILTER_SUCCESS',
    payload: data
  });
};
