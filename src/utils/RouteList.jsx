import AddToCart from "../screens/BuyerScreens/AddToCart";
import Buyer from "../screens/BuyerScreens/Buyer";
import ErrorRoute from "../screens/ErrorRoute";
import Login from "../screens/Login";
import ProductDetail from "../screens/ProductDetail";
import Products from "../screens/Products";
import Seller from "../screens/SellerScreens/Seller";
import SignUp from "../screens/SignUp";
import UploadProducts from "../screens/UploadProducts";

export const RouteList = [
  {
    path: "/",
    element: <Login />,
    name: "Login"
  },
  {
    path: "/signup",
    element: <SignUp />,
    name: "Signup"
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
    path: "/addtocart",
    element: <AddToCart />,
    name: "cart"
  },
  {
    name: "Products",
    path: "/products",
    element: <Products />,
  },
  {
    path: "*",
    element: <ErrorRoute />,
  },
  {
    path: "/product-details/:productId", // id is param
    element: <ProductDetail />,
  },
];
