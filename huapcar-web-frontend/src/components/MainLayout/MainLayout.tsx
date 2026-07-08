import { Layout as AtndLayout } from "antd";
import type { FC, PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  return (
    <AtndLayout>
      <AtndLayout.Header
        style={{ display: "flex", alignItems: "center" }}
      ></AtndLayout.Header>
      {props.children}
    </AtndLayout>
  );
};
