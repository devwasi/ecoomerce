import About from "../screens/About";
import Buyer from "../screens/BuyerScreens/Buyer";
import DashboardScreen from "../screens/DashboardScreen";
import ErrorRoute from "../screens/ErrorRoute";
import Home from "../screens/Home";
import Login from "../screens/Login";
import ProductDetail from "../screens/ProductDetail";
import Products from "../screens/Products";
import SearchBar from "../screens/SearchBar";
import Seller from "../screens/SellerScreens/Seller";
import SignUp from "../screens/SignUp";
import UploadProducts from "../screens/UploadProducts";

export const RouteList = [
  {
    path: "/",
    element: <Home />,
    name: "Home"
  },
  {
    path: "/about",
    element: <About />,
    name: "ABout"
  },
  {
    path: "/product-details/:productId", // id is param
    element: <ProductDetail />,
  },
  {
    path: "/dashboard/*",
    element: <DashboardScreen />,
    name: "Dashboard"
  },
  {
    path: "/signup",
    element: <SignUp />,
    name: "Signup"
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login"
  },
  {
    path: "/addProducts",
    element: <UploadProducts />,
    name: "add products"
  },
  {
    path: "/buyer",
    element: <Buyer />,
    name: "Buyer"
  },
  {
    path: "/seller",
    element: <Seller />,
    name: "Seller"
  },
 
  {
    path: "*",
    element: <ErrorRoute />,
  },
];
