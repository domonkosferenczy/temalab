import React, { useState, useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import TrashIcon from "@material-ui/icons/Delete";
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Grid,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { StoreContext } from "../store/store";
import { apiFetch } from "../store/api";
import config from "../config/config";

interface Todo {
  name: string;
  description: string;
  deadline: string;
  id: number;
  priority: number;
}

export default function CreateEdit() {
  const [State, dispatch] = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [fields, setFields] = useState({
    name: "",
    description: "",
    state: "depending",
    deadline: "2020-04-04",
    priority: 1,
  });

  if (!loaded && State.chosenTodo) {
    const defaultTodo = State.todos.find(
      (todo: Todo) => todo.id === State.chosenTodo
    );
    if (defaultTodo) {
      setFields({
        name: defaultTodo.name,
        description: defaultTodo.description,
        state: defaultTodo.state,
        deadline: defaultTodo.deadline.substring(0, 10),
        priority: defaultTodo.priority,
      });
    }
    setLoaded(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({
      type: "updateChosenTodo",
      payload: null,
    });
    setOpen(false);
    setFields({
      name: "",
      description: "",
      state: "depending",
      deadline: "2020-04-04",
      priority: 1,
    });
    setLoaded(false);
  };

  const handleSave = async () => {
    const payload: any = {
      Name: fields.name,
      Description: fields.description,
      State: fields.state.toLowerCase(),
      Deadline: new Date(fields.deadline).toISOString(),
      Priority: fields.priority,
    };
    if (State.chosenTodo) payload.id = State.chosenTodo;
    try {
      await apiFetch(
        `${config.api}/todos${State.chosenTodo ? `/${State.chosenTodo}` : ""}`,
        {
          method: State.chosenTodo ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (e) {
      console.warn(e);
    }
    dispatch({
      type: "updateLoaded",
      payload: false,
    });
    handleClose();
  };

  const handleDelete = async () => {
    const payload: any = {
      name: fields.name,
      description: fields.description,
      state: fields.state.toLowerCase(),
      deadline: new Date(fields.deadline).toISOString(),
      priority: fields.priority,
    };
    if (State.chosenTodo) payload.Id = State.chosenTodo;
    try {
      await apiFetch(`${config.api}/todos/${State.chosenTodo}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn(e);
    }
    dispatch({
      type: "updateLoaded",
      payload: false,
    });
    handleClose();
  };

  const body = (
    <Container>
      <form autoComplete="off">
        <Grid container justify="center" direction="column" spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              style={{ width: 100 + "%" }}
              value={fields.name}
              onChange={(e) => setFields({ ...fields, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="filled"
              style={{ width: 100 + "%" }}
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label={"Priority"}
              style={{ width: 100 + "%" }}
              value={fields.state}
              onChange={(e) =>
                setFields({ ...fields, state: e.target.value as string })
              }
            >
              <MenuItem value={"depending"}>Depending</MenuItem>
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="date"
              label="Date"
              type="date"
              style={{ width: 100 + "%" }}
              value={fields.deadline}
              onChange={(e) =>
                setFields({ ...fields, deadline: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Priority"
              type="number"
              style={{ width: 100 + "%" }}
              value={fields.priority}
              onChange={(e) =>
                setFields({ ...fields, priority: parseInt(e.target.value) })
              }
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        style={{ marginBottom: 12 }}
      >
        + Create New To Do
      </Button>
      <Dialog
        fullScreen
        open={State.chosenTodo ? true : false || open}
        onClose={() => handleClose()}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <Grid container justify={"space-between"}>
              <Grid item>
                <Typography variant="h6">
                  {State.chosenTodo ? "Edit To Do" : "Create New To Do"}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => handleDelete()}
                >
                  <TrashIcon />
                </Button>
                <Button autoFocus color="inherit" onClick={() => handleSave()}>
                  <SaveIcon />
                </Button>
                <Button autoFocus color="inherit" onClick={() => handleClose()}>
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {body}
      </Dialog>
    </div>
  );
}
