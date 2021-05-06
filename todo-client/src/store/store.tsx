import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  loaded: false,
  chosenTodo: null,
  todos: [],
};

export const StoreContext: any = createContext(initialState);

export const Store: any = (props: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
