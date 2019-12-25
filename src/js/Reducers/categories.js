const initialState: any = {
  loading: true,
  data: {},
  ids: []
};

export default function Categories(state = initialState, action) {
  switch(action.type) {
    case 'READ_CATEGORY_SUCCESS':
      return {
        ...state,
        loading: false,
        ids: action.payload.data.map(item => item.id),
        data: action.payload
      };
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        ids: state.ids.filter(item => item !== action.payload),
        data: { ...state.data, data: state.data.data.filter(item => item.id !== action.payload), count: state.data.count-- }
      };


    default:
      return state;
  }
}





