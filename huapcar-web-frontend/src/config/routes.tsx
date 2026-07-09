import { Outlet, type RouteObject } from "react-router";
import { MainLayout } from "../components/MainLayout/MainLayout";
import * as Pages from "../pages";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        Component: Pages.HomePage,
      },
      {
        path: "/car",
        Component: Pages.CarListPage,
      },
      {
        path: "/car/add",
        Component: Pages.CarAddPage,
      },
      {
        path: "/car/edit/:carId",
        Component: Pages.CarEditPage,
      },
    ],
  },
];
