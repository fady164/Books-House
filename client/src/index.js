import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { clientStore } from "./store/client/index";
import { adminStore } from "./store/admin/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import Admin from "./Admin";
import RequireUser from "./components/RequireAuth";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      {/* <Provider store={adminStore}> */}
      <Provider store={clientStore}>
         <BrowserRouter>
            <QueryClientProvider client={queryClient}>
               <ScrollToTop />
               <Routes>
                  <Route path="/*" element={<App />} />
                  {/* <Route element={<RequireAuth allowedRoles={["admin"]} />}> */}
                  <Route path="/admin/*" element={<Admin />} />
                  {/* </Route> */}
               </Routes>
            </QueryClientProvider>
         </BrowserRouter>
      </Provider>
      {/* </Provider> */}
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
