import React, { useContext } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import ToDoListElement from "./ToDoListElement";
import { StoreContext } from "../store/store";

export default function ToDoList(props: any) {
  const [state] = useContext(StoreContext);
  const elements = state.todos
    .filter((todo: any) => todo.state === props.type)
    .sort((todoA: any, todoB: any) => {
      return todoA.Priority - todoB.Priority;
    })
    .map((todo: any) => {
      return ToDoListElement(todo);
    });

  return (
    <Grid key={props.type} item xs={12} sm={4}>
      <Paper className={"paper"} style={{ padding: 6 }}>
        <Typography variant="overline" component="h2" display="block">
          {props.type}
        </Typography>
        <Grid container justify="center" direction="column" spacing={1}>
          {elements}
        </Grid>
      </Paper>
    </Grid>
  );
}
