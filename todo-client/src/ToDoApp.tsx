import React, { useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import "./App.css";
import CreateEdit from "./modules/CreateEdit";
import ToDoList from "./modules/ToDoList";
import { apiFetch } from "./store/api";
import { StoreContext } from "./store/store";
import config from "./config/config";

function ToDoApp() {
  const [state, dispatch] = useContext(StoreContext);

  const loadData = async () => {
    const todos = await apiFetch(`${config.api}/todos`, {});
    dispatch({
      type: "updateTodos",
      payload: todos,
    });
    dispatch({
      type: "updateLoaded",
      payload: true,
    });
  };

  async function fetchAPI() {
    await loadData();
  }

  if (!state.loaded) {
    fetchAPI();
    return <div></div>;
  }

  console.log(state);

  return (
    <div className="ToDoApp">
      <Container style={{ marginTop: 12 }}>
        <CreateEdit></CreateEdit>
        <Grid container className={""} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              <ToDoList type="depending"></ToDoList>
              <ToDoList type="processing"></ToDoList>
              <ToDoList type="done"></ToDoList>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ToDoApp;
