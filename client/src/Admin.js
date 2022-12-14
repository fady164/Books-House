import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/admin/global/Topbar";
import Sidebar from "./pages/admin/global/Sidebar";
import AuthorsHouse from "./pages/admin/authorshouse";
import ReadersHouse from "./pages/admin/readershouse";
import Form from "./pages/admin/userform";
import Calender from "./pages/admin/calender";
import FAQ from "./pages/admin/faq";
import BooksHouse from "./pages/admin/bookshouse";
import Books from "./pages/admin/books";
import SliderControl from "./pages/admin/sliderControl";
import PackagesControl from "./pages/admin/packagesControl";
import UsersStore from "./pages/admin/usersStore";
import "./admin.css";
import BookForm from "./pages/admin/bookform/BookForm";
import Reviews from "./pages/admin/Reviews";
import ReviewsForm from "./pages/admin/reviewsForm";
import StripePackages from "./pages/admin/stripePackages";
import OrderPayment from "./pages/admin/orderPayment";
import Logout from "./components/admin/Logout";

function Admin() {
   const [theme, colorMode] = useMode();

   return (
      <ColorModeContext.Provider value={colorMode}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
               <Sidebar />
               <main className="content">
                  <Topbar />
                  <Routes>
                     <Route path="/" element={<UsersStore />} />
                     {/* <Route path="/admin" element={<AuthorsHouse />} /> */}
                     <Route path="/authorshouse" element={<AuthorsHouse />} />
                     <Route path="/bookshouse" element={<BooksHouse />} />
                     <Route path="/readershouse" element={<ReadersHouse />} />
                     <Route path="/slidercontrol" element={<SliderControl />} />
                     <Route
                        path="/packagescontrol"
                        element={<PackagesControl />}
                     />
                     <Route path="/books" element={<Books />} />
                     <Route path="/users" element={<UsersStore />} />
                     <Route path="/booksform" element={<BookForm />} />
                     <Route path="/bookform/:id" element={<BookForm />} />
                     <Route path="/form" element={<Form />} />
                     <Route path="/calendar" element={<Calender />} />
                     <Route path="/faq" element={<FAQ />} />
                     <Route path="/reviews" element={<Reviews />} />
                     <Route path="/reviewsform" element={<ReviewsForm />} />
                     <Route path="/reviewsform/:id" element={<ReviewsForm />} />
                     <Route
                        path="/packagespayments"
                        element={<StripePackages />}
                     />
                     <Route path="/orderspayments" element={<OrderPayment />} />
                     <Route path="/logout" element={<Logout />} />
                  </Routes>
               </main>
            </div>
         </ThemeProvider>
      </ColorModeContext.Provider>
   );
}

export default Admin;
