const initialState = {
  ids: [],
  data: [],
  searchQuery: '',
  filtered: {}
};

export default function Categories(state = initialState, action) {
  switch(action.type) {

    case 'READ_CATEGORY_SUCCESS':
      return {
        ...state,
        ids: action.payload.data.map(item => item.id),
        data: action.payload
      };

    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        ids: state.ids.filter(item => item !== action.payload),
        data: { ...state.data, data: state.data.data.filter(item => item.id !== action.payload), count: state.data.count-- }
      };

    case 'CREATE_CATEGORY_SUCCESS':
      alert(`Категория ${action.payload.title} добавлена`);
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        data: { ...state.data, data: [action.payload, ...state.data.data], count: state.data.count++ }
      };

    case 'UPDATE_CATEGORY_SUCCESS':
      alert(`Категория ${action.payload.title} отредактированна`);
      const { id, title, parent, messages } = action.payload;
      return {
        ...state,
        ids: state.ids.map(item => {
          if (item === id) return item++;
          return item;
        }),
        data: { ...state.data, data: state.data.data.map(item => {
            if (item.id === id) return { id, title, parent: parent ? parent : null, messages };
            return item;
          })}
      };

    case 'SEARCH_FILTER_CATEGORY_SUCCESS':
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
