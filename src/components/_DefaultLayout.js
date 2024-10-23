import React, { useEffect } from "react";
import {Badge, Flex, Layout, Menu} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserNofications, getUserProfile } from "../apis/users";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
//import UserMenu from "../UserMenu";
import {userMenu, adminMenu} from "../menu";
// import Sider from "antd/es/layout/Sider";
// import {Content} from "antd/es/layout/layout";
//import { fireDB } from "../firabaseConfig";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  // textAlign: 'center',
  // color: '#fff',
  height: 64,
  // paddingInline: 48,
  // lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
};

function _DefaultLayout({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const { reloadNotifications, unreadNotifications } = useSelector(
     (state) => state.notifications
  );
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuToRender, setMenuToRender] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await getUserProfile(userId);

      //console.log('response.data',response.data)
      dispatch(HideLoading());
      if (response.data?.isAdmin === true) {

        setMenuToRender([...userMenu,...adminMenu]);
        //setMenuToRender(adminMenu);
      } else {

        setMenuToRender(userMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications = async () => {
    try {
      dispatch(ShowLoading());
      await getUserNofications();
      dispatch(HideLoading());
      dispatch(SetReloadNotifications(false));
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  return (
      <Layout>

        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}>
              <div className="header justify-content-between d-flex">
                <div className="d-flex items-center gap-2">
                  {/*HEADER*/}
                  {collapsed && (
                      // class="ri-menu-2-fill"
                      <i
                          className="ri-menu-unfold-line"
                          onClick={() => setCollapsed(!collapsed)}
                      ></i>
                  )}
                  {!collapsed && (
                      // class="ri-close-line"
                      <i
                          className="ri-menu-unfold-2-line"
                          onClick={() => setCollapsed(!collapsed)}
                      ></i>
                  )}
                  <span className="logo">JOBS-LITE</span>
                </div>
                <div className="d-flex gap-1 align-items-center">
                  <Badge
                      count={unreadNotifications?.length || 0}
                      className="mx-5"
                      onClick={() => navigate("/notifications")}
                  >
                    <i className="ri-notification-line"></i>
                  </Badge>

                  {!collapsed && <span>{user?.name}</span>}
                  {/*<span>{user?.name}</span>*/}
                  <i className="ri-shield-user-line"></i>
                </div>
              </div>
            </Header>
            <Layout>

               <Sider
                    collapsible
                    theme="light"
                    style={{
                      position: "fixed",
                      top: "64px",
                      left: 0,
                      borderRight: "1px solid #f1f1f1",
                      height: "calc(100vh - 64px)",
                    }}
                >


                <Menu
                    className="SideMenuVertical"
                    mode="inline"

                    items={[
                      {
                        label: "Dashboard (Country)",
                        key: "/app/country_lang",
                      },
                      {
                        label: "Regions",
                        key: "/app/regions",
                      },
                      {
                        label: "Inventory",
                        key: "/inventory",
                      },
                      {
                        label: "Orders",
                        key: "/orders",
                      },
                    ]}
                >
                </Menu>
              </Sider>
              {/*<Content style={contentStyle}>*/}
              <Layout style={{ marginLeft: "200px" }}>
                <Content style={{padding: "16px",minHeight: "calc(100vh - 64px)"}}>
                  <div className="body">{children}</div>
                </Content>
              </Layout>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Flex>


        <div className="layout">
          {/*{children}*/}
{/*Sidebar*/}
{/*Sidebar*/}

          <div className="content">

              <div className="header justify-content-between d-flex">
                <div className="d-flex items-center gap-2">
                  {/*HEADER*/}
                  {collapsed && (
                      // class="ri-menu-2-fill"
                    <i
                      class="ri-menu-unfold-line"
                      onClick={() => setCollapsed(!collapsed)}
                    ></i>
                  )}
                  {!collapsed && (
                      // class="ri-close-line"
                    <i
                      class="ri-menu-unfold-2-line"
                      onClick={() => setCollapsed(!collapsed)}
                    ></i>
                  )}
                  <span className="logo">JOBS-LITE</span>
                </div>
                <div className="d-flex gap-1 align-items-center">
                  <Badge
                    count={unreadNotifications?.length || 0}
                    className="mx-5"
                    onClick={() => navigate("/notifications")}
                  >
                    <i class="ri-notification-line"></i>
                  </Badge>

                  {!collapsed && <span>{user?.name}</span>}
                  {/*<span>{user?.name}</span>*/}
                  <i class="ri-shield-user-line"></i>
                </div>
              </div>
              <Layout hasSider>

                {/*<Sider*/}
                {/*    collapsible*/}
                {/*    theme="light"*/}
                {/*    style={{*/}
                {/*      position: "fixed",*/}
                {/*      top: "64px",*/}
                {/*      left: 0,*/}
                {/*      borderRight: "1px solid #f1f1f1",*/}
                {/*      height: "calc(100vh - 64px)",*/}
                {/*    }}*/}
                {/*>*/}

                {/*</Sider>*/}


                <Layout style={{ marginLeft: "200px" }}>
                  <Content style={{padding: "16px",minHeight: "calc(100vh - 64px)"}}>
                    <div className="body">{children}</div>
                  </Content>
                </Layout>


              </Layout>

          </div>
        </div>
      </Layout>

  );
}

export default _DefaultLayout;
