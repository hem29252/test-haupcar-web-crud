import {
  Layout as AtndLayout,
  Avatar,
  Menu,
  Row,
  theme,
  Grid,
  type MenuProps,
  Drawer,
} from "antd";
import {
  createElement,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { BarChartOutlined, CarOutlined, MenuOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router";

const { useBreakpoint } = Grid;

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenDraw, setIsOpenDraw] = useState(false);

  const breakpoint = useBreakpoint();
  const isMobile = !breakpoint.md;

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const handleOpenDrawerMenu = () => {
    setIsOpenDraw(true);
  };

  const handleCloseDrawerMenu = () => {
    setIsOpenDraw(false);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: createElement(BarChartOutlined),
      label: "Overview",
      onClick: () => {
        if (isMobile) {
          handleCloseDrawerMenu();
        }

        navigate("/");
      },
    },
    {
      key: "2",
      icon: createElement(CarOutlined),
      label: "Car",
      onClick: () => {
        if (isMobile) {
          handleCloseDrawerMenu();
        }

        navigate("/car");
      },
    },
  ];

  const getDefaultSelectedKey = () => {
    if (location.pathname === "/") {
      return ["1"];
    }

    if (location.pathname === "/car") {
      return ["2"];
    }

    if (location.pathname.startsWith("/car")) {
      return ["2"];
    }

    return [];
  };

  return (
    <>
      <AtndLayout>
        <AtndLayout.Header
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: 20 }}>
              {isMobile && (
                <MenuOutlined onClick={handleOpenDrawerMenu} color="#fff" />
              )}
              {isMobile ? " CAR" : " CAR MANAGEMENT"}
            </div>
          </div>

          <Row align={"middle"} style={{ gap: 6 }}>
            <div style={{ color: "#fff" }}>Mr. Somchai</div>
            <Avatar
              style={{ backgroundColor: colorPrimary, verticalAlign: "middle" }}
              size="large"
            >
              S
            </Avatar>
          </Row>
        </AtndLayout.Header>
        <AtndLayout style={{ height: "calc(100vh - 64px)" }}>
          {!isMobile && (
            <AtndLayout.Sider width={200}>
              <Menu
                mode="inline"
                selectedKeys={getDefaultSelectedKey()}
                style={{ height: "100%" }}
                items={menuItems}
              />
            </AtndLayout.Sider>
          )}

          <Content
            style={{
              padding: 24,
              overflowY: "auto",
            }}
          >
            {props.children}
          </Content>
        </AtndLayout>
      </AtndLayout>
      <Drawer
        title="Menu"
        placement={"left"}
        onClose={handleCloseDrawerMenu}
        open={isOpenDraw}
      >
        <Menu
          mode="inline"
          selectedKeys={getDefaultSelectedKey()}
          style={{ height: "100%" }}
          items={menuItems}
        />
      </Drawer>
    </>
  );
};
