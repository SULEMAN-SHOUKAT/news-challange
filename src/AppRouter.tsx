import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/browse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Browse />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
