import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as AntdLayout, Button, Dropdown, Flex, Input } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "基本資料",
      onClick: () => navigate("/user"),
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: "登出",
      onClick: () => navigate("/signin"),
    },
  ];

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          paddingInline: 48,
          lineHeight: "64px",
          backgroundColor: "white",
        }}
      >
        <Button
          icon={<img width={32} height={32} src="src/assets/img/blog.svg" />}
          type="text"
          onClick={() => navigate("/")}
        />
        <Flex gap={8} align="center">
          <Input.Search title="搜尋" placeholder="搜尋" />

          <Dropdown menu={{ items }} placement="bottomRight">
            <Button
              icon={<UserOutlined />}
              shape="circle"
              type="text"
              size="large"
            />
          </Dropdown>
        </Flex>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          display: "flex",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <span>Copyright</span>
        <span>©</span>
        <span>2024</span>
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
