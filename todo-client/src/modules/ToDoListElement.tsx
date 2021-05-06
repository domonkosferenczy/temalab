import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { StoreContext } from "../store/store";

interface params {
  name: string;
  description: string;
  deadline: string;
  id: number;
  priority: number;
}

export default function ToDoListElement(params: params) {
  const [, dispatch] = useContext(StoreContext);
  const useStyles = makeStyles(() => ({
    toDoDescription: {
      textOverflow: "hidden",
      marginTop: 12,
    },
  }));

  const classes = useStyles();

  return (
    <Grid key={params.id} item>
      <Card
        className={"ToDoElement"}
        variant="outlined"
        onClick={() =>
          dispatch({ type: "updateChosenTodo", payload: params.id })
        }
      >
        <CardContent>
          <Typography className={"title"} component="h3">
            {params.name}
          </Typography>
          <Typography variant="subtitle2">
            {params.deadline.substring(0, 10).replaceAll("-", ".")}
          </Typography>
          <Typography variant="body2" className={classes.toDoDescription}>
            {params.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
