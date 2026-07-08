import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./constants/routes";

export default function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
