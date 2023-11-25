import ProductDetail from "../screens/ProductDetail";
import Products from "../screens/Products";
import Messages from "../screens/dashboardScreens/Messages";
import Notifications from "../screens/dashboardScreens/Notifications";

export const DashboardRouteList = [
  {
    name: "Messages",
    path: "messages",
    element: <Messages />,
  },
  {
    name: "Notifications",
    path: "notifications",
    element: <Notifications />,
  },
  // {
  //   name: "Products",
  //   path: "products",
  //   element: <Products />,
  // },
  
  {
    name: "Products",
    path: "products",
    element: <Products />,
  },
 
];
