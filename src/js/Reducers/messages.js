const initialState = {
  data: [],
  searchQuery: '',
  filtered: {}
};

export default function Messages(state = initialState, action) {
  switch(action.type) {

    case 'READ_MESSAGES_SUCCESS':
      return {
        ...state,
        data: action.payload,
      };

    case 'CREATE_MESSAGE_SUCCESS':
      alert(`Сообщение "${action.payload.title}" добавлено`);
      return {
        ...state,
        data: {...state.data, data: [action.payload, ...state.data.data], count: state.data.count++ },
      };

    case 'DELETE_MESSAGE_SUCCESS':
      return {
        ...state,
        data: {...state.data, data: state.data.data.filter(item => item.id !== action.payload), count: state.data.count-- },
      };

    case 'UPDATE_MESSAGE_SUCCESS':
      alert(`Сообщение "${action.payload.title}" отредактированно`);
      const { id, title, body, category } = action.payload;
      return {
        ...state,
        data: { ...state.data, data: state.data.data.map(item => {
            if (item.id === id) return { id, title, body: body, category: { id: category }};
            return item;
          })}
      };

    case 'SEARCH_FILTER_MESSAGE_SUCCESS':
      return {
        ...state,
        searchQuery: action.payload,
        filtered: state.data.data.filter((i)=>{
          return i.title.toLowerCase().search(action.payload.toLowerCase()) !== -1;
        })
      };

    default:
      return state;
  }
}
