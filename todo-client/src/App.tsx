import React from "react";
import "./App.css";
import ToDoApp from "./ToDoApp";
import { Store } from "./store/store";

function App() {
  return (
    <Store>
      <ToDoApp />
    </Store>
  );
}

export default App;
