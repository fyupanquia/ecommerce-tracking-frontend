/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Tasks from "layouts/tasks";
import TasksNew from "layouts/tasks/new";
import TaskDelete from "layouts/tasks/delete";
import Modules from "layouts/modules";
import ModulesNew from "layouts/modules/new";
import ModuleDelete from "layouts/modules/delete";
import UsersNew from "layouts/users/new";
import UsersProfile from "layouts/users/profile";
import Tracking from "layouts/tracking/new";
import UserDelete from "layouts/users/delete";

import Fluxes from "layouts/fluxes";
import FluxesNew from "layouts/fluxes/new";
import FluxDelete from "layouts/fluxes/delete";

import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = {
  authenticated: {
    CLIENTE: [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
      },
      {
        type: "collapse",
        name: "Perfil",
        key: "perfil",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/perfil",
        component: <UsersProfile />,
      },{
        type: "collapse",
        name: "Tracking",
        key: "tracking",
        icon: <Icon fontSize="small">place</Icon>,
        route: "/tracking",
        component: <Tracking />,
      },
      {
        type: "collapse",
        name: "Cerrar sesión",
        key: "sign-out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/sign-out",
        component: <SignOut />,
      },
    ],
    ADMIN: [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
      },
      {
        type: "collapse",
        name: "Perfil",
        key: "perfil",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/perfil",
        component: <UsersProfile />,
      },
      {
        type: "collapse",
        name: "Usuarios",
        key: "usuarios",
        icon: <Icon fontSize="small">people</Icon>,
        route: "/usuarios",
        component: <Users />,
        collapse: [
          {
            type: "collapse",
            name: "Usuarios",
            key: "usuarios",
            icon: <Icon fontSize="small">people</Icon>,
            route: "/usuarios",
            dropdown: true,
            component: <Users />,
          },
          {
            type: "collapse",
            name: "Agregar",
            key: "users-add",
            icon: <Icon fontSize="small">people</Icon>,
            route: "/usuarios/agregar",
            component: <UsersNew />,
          },
          {
            type: "collapse",
            name: "Editar",
            key: "users-edit",
            icon: <Icon fontSize="small">people</Icon>,
            route: "/usuarios/editar/:id",
            component: <UsersNew />,
          },
          {
            type: "collapse",
            name: "Eliminar",
            key: "users-delete",
            icon: <Icon fontSize="small">people</Icon>,
            route: "/usuarios/eliminar/:id",
            component: <UserDelete />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Modulos",
        key: "modulos",
        icon: <Icon fontSize="small">all_inbox_icon</Icon>,
        route: "/modulos",
        component: <Modules />,
        collapse: [
          {
            type: "collapse",
            name: "Modulos",
            key: "modulos",
            icon: <Icon fontSize="small">all_inbox_icon</Icon>,
            route: "/modulos",
            component: <Modules />,
          },
          {
            type: "collapse",
            name: "Agregar",
            key: "modulos-add",
            icon: <Icon fontSize="small">all_inbox_icon</Icon>,
            route: "/modulos/agregar",
            component: <ModulesNew />,
          },
          {
            type: "collapse",
            name: "Editar",
            key: "modulos-edit",
            icon: <Icon fontSize="small">all_inbox_icon</Icon>,
            route: "/modulos/editar/:id",
            component: <ModulesNew />,
          },
          {
            type: "collapse",
            name: "Eliminar",
            key: "modulos-delete",
            icon: <Icon fontSize="small">all_inbox_icon</Icon>,
            route: "/modulos/eliminar/:id",
            component: <ModuleDelete />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Tareas",
        key: "tareas",
        icon: <Icon fontSize="small">inventory</Icon>,
        route: "/tareas",
        component: <Tasks />,
        collapse: [
          {
            type: "collapse",
            name: "Tareas",
            key: "tareas",
            icon: <Icon fontSize="small">inventory</Icon>,
            route: "/tareas",
            component: <Tasks />,
          },
          {
            type: "collapse",
            name: "Agregar",
            key: "tareas-add",
            icon: <Icon fontSize="small">inventory</Icon>,
            route: "/tareas/agregar",
            component: <TasksNew />,
          },
          {
            type: "collapse",
            name: "Editar",
            key: "tareas-edit",
            icon: <Icon fontSize="small">inventory</Icon>,
            route: "/tareas/editar/:id",
            component: <TasksNew />,
          },
          {
            type: "collapse",
            name: "Eliminar",
            key: "tareas-delete",
            icon: <Icon fontSize="small">inventory</Icon>,
            route: "/tareas/eliminar/:id",
            component: <TaskDelete />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Flujos",
        key: "flujos",
        icon: <Icon fontSize="small">polyline</Icon>,
        route: "/flujos",
        component: <Fluxes />,
        collapse: [
          {
            type: "collapse",
            name: "Flujos",
            key: "flujos",
            icon: <Icon fontSize="small">polyline</Icon>,
            route: "/flujos",
            component: <Fluxes />,
          },
          {
            type: "collapse",
            name: "Agregar",
            key: "flujos-add",
            icon: <Icon fontSize="small">polyline</Icon>,
            route: "/flujos/agregar",
            component: <FluxesNew />,
          },
          {
            type: "collapse",
            name: "Editar",
            key: "flujos-edit",
            icon: <Icon fontSize="small">polyline</Icon>,
            route: "/flujos/editar/:id",
            component: <FluxesNew />,
          },
          {
            type: "collapse",
            name: "Eliminar",
            key: "flujos-delete",
            icon: <Icon fontSize="small">polyline</Icon>,
            route: "/flujos/eliminar/:id",
            component: <FluxDelete />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Tracking",
        key: "tracking",
        icon: <Icon fontSize="small">place</Icon>,
        route: "/tracking",
        component: <Tracking />,
      },
      {
        type: "collapse",
        name: "Cerrar sesión",
        key: "sign-out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/sign-out",
        component: <SignOut />,
      },
    ],
  },
  auth: [
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      icon: <Icon fontSize="small">login</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      icon: <Icon fontSize="small">assignment</Icon>,
      route: "/authentication/sign-up",
      component: <SignUp />,
    },
  ],
};

export default routes;

/*
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "Tables",
      key: "tables",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables",
      component: <Tables />,
    },
    {
      type: "collapse",
      name: "Billing",
      key: "billing",
      icon: <Icon fontSize="small">receipt_long</Icon>,
      route: "/billing",
      component: <Billing />,
    },
    {
      type: "collapse",
      name: "RTL",
      key: "rtl",
      icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
      route: "/rtl",
      component: <RTL />,
    },
    {
      type: "collapse",
      name: "Notifications",
      key: "notifications",
      icon: <Icon fontSize="small">notifications</Icon>,
      route: "/notifications",
      component: <Notifications />,
    },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      icon: <Icon fontSize="small">person</Icon>,
      route: "/profile",
      component: <Profile />,
    },
    */
