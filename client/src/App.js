import { Route, Routes } from "react-router-dom";

import "./App.css";
import Cart from "./components/client/Cart/Cart";
// import MyNav from "./components/client/MyNav";
import NavBar from "./components/client/ui/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/client/Home";
import BooksShop from "./pages/client/BookShop/index";
import Service from "./pages/client/Service/Service";
import AuthorsHouse from "./pages/client/AuthorsHouse";
import BookDetails from "./pages/client/BookDetails";
import WishlistSideBar from "./pages/client/WishlistSideBar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MyProfile from "./pages/client/Profile/MyProfile";
import Footer from "./components/client/ui/Footer";

import Contactus from "./pages/client/Contactus/Contactus";
import About from "./pages/client/About";
import AuthRoutes from "./routes/AuthRoutes";
import VerifyPass from "./pages/client/authPages/passwordPage/VerifyPass";
import Reviews from "./pages/client/Review";
import ReviewDetails from "./pages/client/ReviewDetails/ReviewDetails";
import UnauthorizePage from "./pages/client/Unauthorized/UnauthorizedPage";
// import RequireAuth from "./components/RequireAuth";
// import AlreadyUser from "./components/AlreadyUser";
import Completion from "./components/client/ui/Completion/Completion";
// import LoginAdmin from "./pages/client/authPages/login/LoginAdmin";
import LoginAdmin from "./pages/admin/AuthPages/LoginAdmin/AdminLogin";

import Login2 from "./pages/client/authPages/login/log";
import RegisterPage from "./pages/client/authPages/register/regist";
import ErrorNotFound from "./pages/client/errorNotFound";
import MainProfile from "./pages/client/Profile/MainProfile";
import EmailVerificationPage from "./pages/client/authPages/verification/EmailVerificationPage";
import AuthMiddleware from "./features/authMiddleware";
import SendCodeToEmail from "./pages/client/authPages/SendCodeToEmail/sendCodeToEmail";

function App() {
   const [showWishlist, setShowWishlist] = useState(false);
   const hideModal = () => {
      setShowWishlist(false);
   };
   const showModal = () => {
      setShowWishlist(true);
   };
   return (
      <div>
         {/* <MyNav /> */}
         <NavBar showModal={showModal} />
         {showWishlist && (
            <WishlistSideBar hideModal={hideModal} showModal={showModal} />
         )}
         <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => setShowWishlist(false)}
         >
            <ToastContainer />
            <Routes>
               {/* Public Routes */}
               <Route element={<AuthMiddleware />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/sidebar" element={<WishlistSideBar />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/bookdetails/:id" element={<BookDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/contactus" element={<Contactus />} />
                  <Route path="/profile/settings" element={<MyProfile />} />
                  <Route path="/booksshop" element={<BooksShop />} />
                  <Route path="/authorshouse" element={<AuthorsHouse />} />
                  <Route path="/unauthorized" element={<UnauthorizePage />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route
                     path="/reviewdetails/:id"
                     element={<ReviewDetails />}
                  />
                  <Route path="/completion" element={<Completion />} />
                  <Route path="/mainprofile" element={<MainProfile />} />
                  <Route path="/cart2" element={<Cart />} />
               </Route>

               <Route path="/@admin" element={<LoginAdmin />} />

               <Route
                  path="/user/confirmEmail"
                  element={<EmailVerificationPage />}
               >
                  <Route
                     path=":verificationCode"
                     element={<EmailVerificationPage />}
                  />
               </Route>
               {/* <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}> */}
               {/* </Route> */}
               <Route path="auth" element={<AuthRoutes />}>
                  <Route path="forgetpass" element={<SendCodeToEmail />} />
                  <Route path="password" element={<VerifyPass />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="login" element={<Login2 />} />
                  <Route path="newpassword" element={<VerifyPass />} />
               </Route>
               {/* Catch All */}
               <Route path="*" element={<ErrorNotFound />} />
            </Routes>
            {/* <Counter /> */}
            <Footer />
         </AnimatePresence>
      </div>
   );
}

export default App;
