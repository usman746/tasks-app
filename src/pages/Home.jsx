import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../apis/actions";
import { logout } from "../apis/slice";

// Sample Task Data
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

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();
  const { userToken, dataTask } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    dispatch(deleteTask({ userToken, id: taskId }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskToDelete(null);
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete)
    );
    dispatch(getTask({ userToken, id: taskToDelete }));
    handleClose();
  };

  useEffect(() => {
    dispatch(getTask({ userToken }));
    // Fetch tasks for logged-in user here, using sample data for demo
  }, []);

  useEffect(() => {
    // Fetch tasks for logged-in user here, using sample data for demo
    if (dataTask) setTasks(dataTask);
  }, [dataTask]);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100 min-h-screen relative">
      <Button
        className="absolute right-5 top-5"
        variant="contained"
        color="error"
        onClick={logoutUser}
      >
        Logout
      </Button>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Tasks</h1>
      <Button
        variant="contained"
        color="primary"
        className="mb-6"
        onClick={() => navigate("/add-task")}
      >
        Add New Task
      </Button>
      <div className="w-full max-w-2xl">
        {tasks.map((task, idx) => (
          <Card key={idx} className="mb-4 shadow-lg hover:shadow-xl transition">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Typography
                  variant="h5"
                  component="div"
                  className="font-semibold text-blue-600"
                >
                  {task.title}
                </Typography>
                <Chip
                  label={task.status}
                  color={
                    task.status === "Completed"
                      ? "success"
                      : task.status === "In Progress"
                      ? "primary"
                      : "default"
                  }
                />
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2"
              >
                {task.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="italic text-gray-500"
              >
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
              <div className="flex justify-between items-center mt-5">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteClick(task._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
