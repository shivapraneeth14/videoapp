import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { store } from "./components/Store/Store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Header/> ,
  },
  {
    path:"/",
    element:<Login/>
  },
 {
  path:"/Signup",
    element:<Signup/>
 },
 {
   path:"/Profile",
   element:<Profile/>
 },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);