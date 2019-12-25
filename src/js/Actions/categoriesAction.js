import API from "../api";

export const readCategory = () => dispatch => {
  return API('readCategory', {
    conditions: ["id", "IS NOT NULL"],
    fields: ["id", "title", "parent", "messages", "children"]
  }).then(res => {
    console.log(res);
    dispatch({
      type: 'READ_CATEGORY_SUCCESS',
      payload: res
    });
  }).catch(err => {
    console.log(err);
    dispatch({
      type: 'READ_CATEGORY_FAILED',
    });
  });
};

