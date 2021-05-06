const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "updateTodos":
      return {
        ...state,
        todos: action.payload,
      };
    case "updateChosenTodo":
      return {
        ...state,
        chosenTodo: action.payload,
      };
    case "updateLoaded":
      return {
        ...state,
        loaded: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
