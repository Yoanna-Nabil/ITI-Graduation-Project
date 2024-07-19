import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Cart from "./Componenets/Cart/Cart";
import Filters from "./Componenets/Filters/Filters";
import EditProfile from "./Componenets/EditProfile/EditProfile";
import Payment from "./Componenets/Payment/Payment";
import User from "./Componenets/User/User";
import Layout from "./Componenets/Layout/Layout";
import Home from "./Componenets/Home/Home";
import Orders from "./Componenets/Orders/Orders";
import NotFound from "./Componenets/NotFound/NotFound";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";
import Whislist from "./Componenets/Whislist/Whislist";
import Checkout from "./Componenets/Checkout/Checkout";
import Products from "./Componenets/products/products";
import Bestseller from "./Componenets/bestseller/Bestseller";
import Dettails from "./Componenets/details/details";
// import Slider from "react-slick";
import ImageCards from "./Componenets/ImageCards/ImageCards";
import ShoppingCartProvider from "./Componenets/context/ShoppingCartContext";
import { SearchProvider } from "./Componenets/context/SearchContext";
import HomeDashboard from "./Dashboard/HomeDashboard/HomeDashboard";
import CounterInDashboard from "./Dashboard/ComponantDashboard/CounterInDashboard";
import UserDashboard from "./Dashboard/UserDashboard/UserDashboard";
import AddUserDashboard from "./Dashboard/UserDashboard/AddUserDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateUserDashboard from "./Dashboard/UserDashboard/UpdateUserDashboard";
import CategoryDashboard from "./Dashboard/CategoryDashboard/CategoryDashboard";
import AddCategoryDashboard from "./Dashboard/CategoryDashboard/AddCategoryDashboard";
import UpdateCategoryDashboard from "./Dashboard/CategoryDashboard/UpdateCategoryDashboard";
import ProductDashboard from "./Dashboard/ProductDashboard/ProductDashboard";
import AddProduct from "./Dashboard/ProductDashboard/AddProduct";
import UpdateProduct from "./Dashboard/ProductDashboard/UpdateProduct";
import ProtectedDashboard from "./protectedRoute/ProductedDashboard";
import CategoryUser from "./Componenets/CategoryUser/CategoryUser";
import OrdersDashboard from "./Dashboard/OrdersDashboard/OrdersDashboard";
import Success from "./Componenets/success/Success";
import ForgetPassword from "./Componenets/ForgetPassword/ForgetPassword";
import ForgetPasswordThree from "./Componenets/ForgetPasswordThree/ForgetPasswordThree";
import ProtectedAuth from "./protectedRoute/ProtectedAuth";
import ProtectedCheckout from "./protectedRoute/ProtectedCheckout";
import ProtectedComponant from "./protectedRoute/ProtectedComponant";
import Exclusive from "./Componenets/exclusive/Exclusive";
import Offres from "./Componenets/offres/Offres";
import Services from "./Componenets/services/Services";
import Counter from "./Componenets/counter/Counter";
import Brands from "./Componenets/brands/Brands";
import ReviewProductDashboard from "./Dashboard/ProductDashboard/ReviewProductDashboard";
import AboutUs from "./Componenets/AboutUs/AboutUs";
import Sidebar from "./Componenets/Sidebar/Sidebar";
import DetailsOrders from "./Dashboard/OrdersDashboard/DetailsOrders";
import DetailsOrderUser from "./Componenets/Orders/DetailsOrderUser";

function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        { path: "cart", element: <Cart /> },
        { path: "filters", element: <Filters /> },
        {
          path: "editprofile",
          element: (
            <ProtectedComponant>
              <EditProfile />
            </ProtectedComponant>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedComponant>
              <Orders />
            </ProtectedComponant>
          ),
        },
        { path: "payment", element: <Payment /> },
        { path: "aboutus", element: <AboutUs /> },
        { path: "sidebar", element: <Sidebar /> },
        { path: "user", element: <User /> },
        {
          path: "whislist",
          element: (
            <ProtectedComponant>
              <Whislist />
            </ProtectedComponant>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedCheckout>
              <Checkout />
            </ProtectedCheckout>
          ),
        },
        { path: "products", element: <Products /> },
        { path: "services", element: <Services /> },
        { path: "counter", element: <Counter /> },
        { path: "offres", element: <Offres /> },
        { path: "brands", element: <Brands /> },
        { path: "exclusive", element: <Exclusive /> },
        { path: "bestesller", element: <Bestseller /> },
        { path: "details/:id", element: <Dettails /> },
        { path: "imagecards", element: <ImageCards /> },
        { path: "/category/:id", element: <CategoryUser /> },
        { path: "success", element: <Success /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetPassword/:token", element: <ForgetPasswordThree /> },
        { path: "/order/:id", element: <DetailsOrderUser /> },

        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedDashboard>
          <HomeDashboard />
        </ProtectedDashboard>
      ),
      children: [
        {
          path: "/dashboard",
          element: <CounterInDashboard />,
        },
        {
          path: "userdashboard",
          element: <UserDashboard />,
        },
        {
          path: "adduserdashboard",
          element: <AddUserDashboard />,
        },
        {
          path: "updateuserdashboard/:id",
          element: <UpdateUserDashboard />,
        },
        {
          path: "categorydashboard",
          element: <CategoryDashboard />,
        },
        {
          path: "addcategorydashboard",
          element: <AddCategoryDashboard />,
        },
        {
          path: "updatecategorydashboard/:id",
          element: <UpdateCategoryDashboard />,
        },
        {
          path: "productdashboard",
          element: <ProductDashboard />,
        },
        {
          path: "productdashboardReview/:id",
          element: <ReviewProductDashboard />,
        },
        {
          path: "addproductdashboard",
          element: <AddProduct />,
        },
        {
          path: "updateproductdashboard/:id",
          element: <UpdateProduct />,
        },
        {
          path: "ordersdashboard",
          element: <OrdersDashboard />,
        },
        {
          path: "ordersDetails/:id",
          element: <DetailsOrders />,
        },
      ],
    },
  ]);
  let queryClient = new QueryClient();
  return (
    <>
      <ToastContainer position="top-center" />
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <ShoppingCartProvider>
            <RouterProvider router={router}></RouterProvider>
          </ShoppingCartProvider>
        </SearchProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
