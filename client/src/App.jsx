import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Subscription from "./components/User/Subscription";
import RootPage from "./pages/RootPage";
import BookListPage from "./pages/BookListPage";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Cart from "./components/User/Cart";
import AddBook from "./components/Admin/AddBook";
import EditBook from "./components/Admin/EditBook";
import ReturnBook from "./components/User/ReturnBook";
import Fine from "./components/User/Fine";
import Order from "./components/User/Order";
import PendingFines from "./components/Admin/PendingFines";
import SubscribedUsers from "./components/Admin/SubscribedUsers";
import BorrowBook from "./components/User/BorrowBook";
import BookDetails from "./components/Shared/BookDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cancel from "./components/User/Cancel";
import SuccessCart from "./components/User/SuccessCart";
import SuccessSubscription from "./components/User/SuccessSubscription";
import ProtectedRoute from "./util/ProtectedRoute";
import MainErrorPage from "./pages/MainErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement:<MainErrorPage/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "user",
    element: <ProtectedRoute role="user"/>,
    children: [
      { index: true, element: <UserPage /> },
      {
        path: "purchase",
        element: <Subscription />,
      },
      {
        path: "borrow",
        element: <BorrowBook />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "return",
        element: <ReturnBook />,
      },
      {
        path: "fine",
        element: <Fine />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      { path: "success-cart", element: <SuccessCart /> },
      {path:"success-subscribe",element:<SuccessSubscription/>},
      { path: "cancel", element: <Cancel /> },
    ],
  },
  {
    path: "admin",
    element: <ProtectedRoute role="admin"/>,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "add-book", element: <AddBook /> },
      { path: "edit/:id", element: <EditBook /> },
      { path: "pending-fines", element: <PendingFines /> },
      { path: "subscribed-users", element: <SubscribedUsers /> },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
