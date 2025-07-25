import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./loginPage.jsx";
import PostPage from "./Postpage";
import CreatePost from "./CreatePost";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "posts",
        element: <PostPage />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
