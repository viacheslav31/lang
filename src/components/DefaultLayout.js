import React, {useEffect, useState} from "react";
import { Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserNofications, getUserProfile } from "../apis/users";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
//import UserMenu from "../UserMenu";
import {userMenu, adminMenu} from "../menu";
import {Sidebar} from "./Sidebar";

//import {LangEdu} from "../pages/lang/LangEdu";
//import { fireDB } from "../firabaseConfig";

function DefaultLayout({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const { reloadNotifications, unreadNotifications } = useSelector(
     (state) => state.notifications
  );
  const [collapsed, setCollapsed] = useState(false);
  const [menuToRender, setMenuToRender] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentToolbarMenu, setCurrentToolbarMenu] = useState('mail');

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
    //setCollapsed(false)
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  // const itemsToolbarMenu = [
  //   {
  //     label: 'Home',
  //     key: 'home',
  //   },
  //   {
  //     label: 'Admin...',
  //     key: 'admin',
  //   },
  // ];

  const onClickToolbarMenu = (e) => {
    console.log('click ', e);
    setCurrentToolbarMenu(e.key);
  };

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} menuToRender={menuToRender}/>

      {/* TOOLBAR */}
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex items-center gap-2">
            {/*HEADER*/}
            {collapsed && (
                // class="ri-menu-2-fill"
                <>
                  <i
                    class="ri-menu-unfold-line"
                    onClick={() => setCollapsed(!collapsed)}
                  ></i>

                  <Menu style={{ flex: "auto", minWidth: 0 }}
                        onClick={onClickToolbarMenu}
                        selectedKeys={[currentToolbarMenu]}
                        mode="horizontal"
                        items={userMenu}
                        onClick={(item) => {
                          navigate(item.key);
                        }}
                  />


                  {/*<Dropdown menu={itemsToolbarMenu}>*/}
                  {/*  <a onClick={(e) => e.preventDefault()}>*/}
                  {/*    <Space>Hover me<DownOutlined /></Space>*/}
                  {/*  </a>*/}
                  {/*</Dropdown>*/}
                  {/*<Dropdown.Button*/}
                  {/*    type="primary"*/}
                  {/*    menu={{itemsToolbarMenu,}}*/}

                  {/*>*/}
                    {/*onClick={() => enterLoading(0)}*/}
                  {/*  Submit*/}
                  {/*</Dropdown.Button>*/}
                </>
            )}
            {!collapsed && (
                // class="ri-close-line"
              <i
                class="ri-menu-unfold-2-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            <span className="logo">LANG-CARTS</span>
          </div>
          <div className="d-flex gap-1 align-items-center">


            <Badge
              // count={unreadNotifications?.length || 0}
              count={0}
              className="mx-5"
              // onClick={() => navigate("/notifications")}
            >
              <i class="ri-notification-line"></i>
            </Badge>

            {/*{!collapsed && <span>{user?.name}</span>}*/}
            <span>{user?.name}</span>
            <i class="ri-shield-user-line"></i>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>

    </div>
  );
}

export default DefaultLayout;
