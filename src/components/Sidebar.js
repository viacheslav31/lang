import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Menu} from "antd";
import {userMenu} from "../menu";

export function Sidebar({collapsed,menuToRender}) {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  //const [collapsed, setCollapsed] = React.useState(false);
  //const [menuToRender, setMenuToRender] = React.useState([]);

    //const [currentToolbarMenu, setCurrentToolbarMenu] = useState('mail');

    // const itemsToolbarMenu = [
    //     {
    //         label: 'Navigation One3 Navigation Two Navigation Two Navigation Two Navigation Two',
    //         key: 'mail',
    //     },
    //     {
    //         label: 'Navigation Two Navigation Two Navigation Two Navigation Two Navigation Two',
    //         key: 'app',
    //     },
    // ];

    // const onClickToolbarMenu = (e) => {
    //     console.log('click ', e);
    //     setCurrentToolbarMenu(e.key);
    // };

  return (
      <>
        {!collapsed && <div className="sidebar justify-content-between flex">

          {/*### sidebar width*/}
          <div
              className="menu"
              // style={{width: collapsed ? "40px" : "150px",}}
              style={{width: "150px",}}
          >
            <div
                className={`menu-item ${window.location.pathname === '/login' && "active-menu-item"}`}
                onClick={() => {
                  localStorage.removeItem("user")
                  navigate('/login')
                }}
                key='UserLogout'
            >
              {!collapsed && <span>Logout</span>}
              <i className="ri-logout-box-r-line"></i>
            </div>


            <Menu className="text-danger"
                  //onClick={onClickToolbarMenu}
                  //selectedKeys={[currentToolbarMenu]}
                  mode="inline" //vertical
                  theme="dark"
                  items={userMenu}
                  onClick={(item) => {
                      //item.key
                      navigate(item.key);
                  }}
            />

            {menuToRender.map((item, index) => {
              const isActive = window.location.pathname === item.path;
              return (
                  <>

                  </>
                  // <div
                  //     className={`menu-item ${isActive && "active-menu-item"}`}
                  //     // onClick={item.onClick}
                  //     onClick={item.isMenuCallback ? (item.navigate) : () => navigate(item.navigate)}
                  //     key={index}
                  // >
                  //   {item.icon}
                  //   {!collapsed && <span>{item.title}</span>}
                  // </div>
              );
            })}
          </div>
        </div>
        }
      </>
  );
}



{/*SIDEBAR*/}
{/*{userMenu.map((item, index) => {*/}
{/*  const isActive = window.location.pathname === item.path;*/}
{/*  return (*/}
{/*      <div*/}
{/*          className={`menu-item ${isActive && "active-menu-item"}`}*/}
{/*          // onClick={item.onClick}*/}
{/*          //onClick={() => navigate(item.navigate)}*/}
{/*          onClick={item.isMenuCallback ? (item.navigate) : () => navigate(item.navigate)}*/}
{/*          key={index}*/}
{/*      >*/}
{/*        {!collapsed && <span>{item.title}</span>}*/}
{/*        {item.icon}*/}
{/*      </div>*/}
{/*  );*/}
{/*})}*/}
{/*{adminMenu.map((item, index) => {*/}
{/*  const isActive = window.location.pathname === item.path;*/}
{/*  return (*/}
{/*      <div*/}
{/*          className={`menu-item ${isActive && "active-menu-item"}`}*/}
{/*          onClick={item.isMenuCallback ? (item.navigate) : () => navigate(item.navigate)}*/}
{/*          key={index}*/}
{/*      >*/}
{/*        {!collapsed && <span>{item.title}</span>}*/}
{/*        {item.icon}*/}
{/*      </div>*/}
{/*  );*/}
{/*})}*/}
{/*LOGOUT*/}
