import { Button, Layout, theme, Menu, Input } from "antd";
import { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AlertOutlined,
  HomeOutlined,
  TeamOutlined,
  CarryOutOutlined,
  DollarOutlined,
  ToolOutlined,
  CoffeeOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";
import "./Side.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { BoxArrowRight, Gear, Person } from "react-bootstrap-icons";

const { Header, Sider } = Layout;
const { Search } = Input;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log(value);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar "
      >
        <div className="logo">
          <div className="logo-icon width-50px height-50px">
            <AlertOutlined />
          </div>
        </div>
        <Menu theme="dark" mode="inline" className="menu-bar">
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link className="text-decoration-none" to="/">
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="border" icon={<TeamOutlined />}>
            <Link className="text-decoration-none" to="/border">
              Border
            </Link>
          </Menu.Item>
          <Menu.Item key="bazar" icon={<CarryOutOutlined />}>
            <Link className="text-decoration-none" to="/bazar">
              Bazar
            </Link>
          </Menu.Item>
          <Menu.Item key="deposit" icon={<DollarOutlined />}>
            <Link className="text-decoration-none" to="/deposit">
              Deposit
            </Link>
          </Menu.Item>
          <Menu.Item
            key="meal"
            icon={<CoffeeOutlined />}
            className="SidebarHover"
          >
            <Link className="text-decoration-none" to="/meal">
              Meal
            </Link>
          </Menu.Item>
          <Menu.Item key="summary" icon={<BorderOuterOutlined />}>
            <Link className="text-decoration-none" to="/summary">
              Summary
            </Link>
          </Menu.Item>
          <Menu.Item key="reports" icon={<ToolOutlined />}>
            <Link className="text-decoration-none" to="/report">
              Feedback
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Search
            placeholder="Are You Looking For something?...."
            allowClear
            size="large"
            onSearch={onSearch}
            className="search-bar"
          />

          <div className="dropdown-menu-container ">
            <DropdownButton
              id="profile-dropdown"
              title={
                <img
                  src="https://scontent.frjh3-1.fna.fbcdn.net/v/t39.30808-6/265123842_2034978933336405_901740030518575765_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BI-Yzt106cIQ7kNvgHolmVf&_nc_ht=scontent.frjh3-1.fna&oh=00_AYD3mUlqvzFajfAJwBkggkwTpt5gfL0nm0oqRhUFMyfMpQ&oe=666F6AF2"
                  alt="Profile"
                  className="profile-picture"
                />
              }
              variant="outline"
              className=" border-0 custom-dropdown "
            >
              <div className="dropdown_profile">
                <Dropdown.Item
                  href="/profile"
                  className="dropdown-item  text-white"
                >
                  <Person className="icon" />
                  <span className="item-text">Profile</span>
                </Dropdown.Item>
                <Dropdown.Item
                  href="/settings"
                  className="dropdown-item  text-white"
                >
                  <Gear className="icon" />
                  <span className="item-text">settings</span>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={handleLogout}
                  className="dropdown-item  text-white"
                >
                  <BoxArrowRight className="icon" />
                  <span className="item-text">LogOut</span>
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>
        </Header>
        <div style={{ padding: 24, background: colorBgContainer }}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
