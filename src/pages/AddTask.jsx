import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../apis/actions";

const AddTask = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the new task to your database or app state
    const submitData = { ...newTask, userToken };
    dispatch(addTask(submitData));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Add New Task
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 shadow-lg rounded"
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={newTask.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newTask.description}
          onChange={handleChange}
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          variant="outlined"
          fullWidth
          value={newTask.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Status"
          name="status"
          variant="outlined"
          fullWidth
          select
          value={newTask.status}
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Task
        </Button>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          color="primary"
          fullWidth
        >
          Back
        </Button>
      </form>
    </div>
  );
};

export default AddTask;
