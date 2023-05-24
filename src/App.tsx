import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ToDoListPage from "./pages/ToDoList";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import UnauthenticatedRoute from "./components/guards/UnauthenticatedRoute";
import { Layout } from "antd";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <UnauthenticatedRoute>
                <LoginPage />
            </UnauthenticatedRoute>
        ),
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/todo-list",
        element: (
            <ProtectedRoute>
                <ToDoListPage />
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return (
        <Layout className="h-100">
            <Layout.Content className="h-100">
                <RouterProvider router={router} />
            </Layout.Content>
        </Layout>
    );
}

export default App;
