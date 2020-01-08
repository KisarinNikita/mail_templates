const initialState = {
  data: []
};

export default function Messages(state = initialState, action) {
  switch(action.type) {

    case 'READ_MESSAGES_SUCCESS':
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}