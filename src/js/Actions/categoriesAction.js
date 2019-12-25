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
      payload: res.result
    });
  }).catch(err => {
    dispatch({
      type: 'DELETE_CATEGORY_FAILED',
      payload: err
    });
  });
};

