const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/admin/login",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/admin/logout",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/admin/signUp",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );

   app.use(
      "/admin/forgetPassword",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/admin/sendCode",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );

   app.use(
      "/book/getall",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/book/addnewbook",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/book/remove/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/book/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // app.use(
   //    "/book/updateBook/:id",
   //    createProxyMiddleware({
   //       target: "http://localhost:3001",
   //       changeOrigin: true,
   //    })
   // );

   //---------------------BOOKS REVIEWS PROXIES----------------------
   //GET ALL
   app.use(
      "/bookreview/getall",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // ADD NEW BOOK REVIEW
   app.use(
      "/bookreview/newbookreview",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //DELETE BOOK REVIEW
   app.use(
      "/bookreview/remove/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //UPDATE BOOK REVIEW BY ID
   app.use(
      "/bookreview/updateBookReview/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/bookreview/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/user/confirmEmail/:verificationCode",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/user/sendCode",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //----------------------STRIP PACKAGES-------------------

   app.use(
      "/getallpayments/packages",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //----------------------STRIP ORDERS-------------------

   app.use(
      "/getallpayments/orders",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------USER AUTH API------------------------
   app.use(
      "/user/login",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/user/signUp",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/user/logoutMe",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------USERS Profile (Auth)------------------------

   app.use(
      "/user/profile",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------USERS Email Confirmation------------------------

   app.use(
      "/user/confirmEmail/:verificationCode",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   app.use(
      "/user/refreshEmail/:token",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------GET ALL USERS------------------------
   app.use(
      "/user/getallusers",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------GET USER------------------------
   app.use(
      "/user/getuser/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   // --------------------UPADTE USER------------------------
   app.use(
      "/user/updateProfile",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //===================================================
   //------------------------HOME-----------------------
   app.use(
      "/homeData/home",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //------------------------HOME PACKAGE-----------------------
   app.use(
      "/package/getall",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
   //----------------------UPDATE PACKAGE------------------------
   app.use(
      "/package/update/:id",
      createProxyMiddleware({
         target: "http://localhost:3001",
         changeOrigin: true,
      })
   );
};
