//import {useNavigate} from "react-router-dom";
//const navigate = useNavigate();
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";

//const user = JSON.parse(localStorage.getItem("user"));


export const userMenu = [

    {
        label: "Home",
        icon: <AppstoreOutlined />,
        key: "/",
    },
    {
        label: "Admin",

        icon: <AppstoreOutlined />,
        key: "/app",
    },
    // {
    //     label: "Lang Edu",
    //     icon: <AppstoreOutlined />,
    //     key: "/lang/edu",
    // },

    // {
    //     title: "Profile",
    //     //onClick: () => navigate(`/profile/${user.id}`),
    //     navigate: `/profile`,
    //     // navigate: `/profile/${user?.id}`,
    //     //isMenuCallback: false,
    //     icon: <i class="ri-user-2-line"></i>,
    //     path: "/profile",
    // },

    // {
    //     title: "Home",
    //     //onClick: () => navigate("/"),
    //     navigate: "/",
    //     //isMenuCallback: false,
    //     icon: <i class="ri-home-7-line"></i>,
    //     path: "/",
    // },
    // {
    //     title: "Lang Edu (admin)",
    //     navigate: "/lang",
    //     icon: <i class="ri-file-list-3-line"></i>,
    //     path: "/lang",
    // },
    // {
    //     title: "Lang Edu",
    //     navigate: "/lang/edu",
    //     icon: <i class="ri-file-list-3-line"></i>,
    //     path: "/lang/edu",
    // },

    // {
    //     title: "Applied Jobs",
    //     navigate: "/applied-jobs",
    //     //onClick: () => navigate("/applied-jobs"),
    //     //isMenuCallback: false,
    //     icon: <i class="ri-file-list-3-line"></i>,
    //     path: "/applied-jobs",
    // },
    //
    // {
    //     title: "Posted Jobs",
    //     //onClick: () => navigate("/posted-jobs"),
    //     navigate: "/posted-jobs",
    //     //isMenuCallback: false,
    //     icon: <i class="ri-file-list-2-line"></i>,
    //     path: "/posted-jobs",
    // },
    // {
    //     title: "Profile",
    //     //onClick: () => navigate(`/profile/${user.id}`),
    //     navigate: `/profile`,
    //     // navigate: `/profile/${user?.id}`,
    //     //isMenuCallback: false,
    //     icon: <i class="ri-user-2-line"></i>,
    //     path: "/profile",
    //},

    // {
    //     title: "Logout",
    //     // onClick: () => {
    //     //     // ### Logout
    //     //     localStorage.removeItem("user");
    //     //     //navigate("/login");
    //     // },
    //     //isMenuCallback: true, //callback run with array
    //     navigate: () => {localStorage.removeItem("user");},
    //     icon: <i class="ri-logout-box-r-line"></i>,
    //     path: "/login",
    // },
];

export const adminMenu = [
      // {
      //   title: "Home (admin)",
      //   //onClick: () => navigate("/"),
      //   navigate: "/",
      //   icon: <i class="ri-home-7-line"></i>,
      //   path: "/admin",
      // },


      {
        title: "Jobs  (admin)",
        //onClick: () => navigate("/admin/jobs"),
        navigate: "/admin/jobs",
        icon: <i class="ri-file-list-2-line"></i>,
        path: "/admin/jobs",
      },
      {
        title: "Users (admin)",
        //onClick: () => navigate("/admin/users"),
        navigate: "/admin/users",
        icon: <i class="ri-user-2-line"></i>,
        path: "/admin/users",
      },

      // {
      //   title: "Logout",
      //   // onClick: () => {
      //   //   localStorage.removeItem("user");
      //   //   navigate("/login");
      //   // },
      //   navigate: "/",
      //   icon: <i class="ri-logout-box-r-line"></i>,
      //   path: "/login",
      // },
];
