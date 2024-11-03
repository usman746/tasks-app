import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import AppLayout from "./AppLayout";
import { AddTask, EditTask, Home, Login, SignUp } from "./pages";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-task",
        element: (
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-task/:taskId",
        element: (
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
