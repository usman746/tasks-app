import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, updateTask } from "../apis/actions";

// Sample data
// const sampleTasks = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "Complete the project",
//     dueDate: "2024-11-10",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     description: "Send email to the client",
//     dueDate: "2024-11-12",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     title: "Task 3",
//     description: "Review pull request",
//     dueDate: "2024-11-14",
//     status: "Completed",
//   },
// ];

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const { userToken, dataOneTask } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleTask({ userToken, id: taskId }));
  }, [taskId]);

  useEffect(() => {
    if (dataOneTask) setTask(dataOneTask);
  }, [dataOneTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...task, userToken, id: taskId };
    dispatch(updateTask(submitData));
    navigate("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 shadow-lg rounded"
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={task.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={task.description}
          onChange={handleChange}
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          variant="outlined"
          fullWidth
          value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Status"
          name="status"
          variant="outlined"
          fullWidth
          select
          value={task.status}
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
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

export default EditTask;
