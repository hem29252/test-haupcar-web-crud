import { createBrowserRouter, RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import { routes } from "./config/routes";

export default function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ConfigProvider>
  );
}
