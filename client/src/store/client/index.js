import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "./reducers/bookSlice";
import { cartReducer } from "./reducers/cartSlice";
import { resReducer } from "./reducers/resSlice";
// import { authReducer } from "./reducers/authSlice";
import { homepageReducer } from "./reducers/homepageSlice";
import { homepageApi } from "../../features/homeApiSlice";
import { authorReducer } from "./reducers/authorSlice";
import { packageApi } from "../../features/packageApiSlice";
import { packageReducer } from "./reducers/packageSlice";
// import { checkAuthReducer } from "./reducers/checkAuth";
import userReducer from "./reducers/userSlice";
import { userApi } from "../../services/userApi";
import { authApiSlice } from "../../features/authApiSlice";
import { bookReviewReducer } from "./reducers/bookReviewSlice";
import { stripePackagesReducer } from "./reducers/stripePackagesSlice";
import { stripeOrdersReducer } from "./reducers/stripeOrdersSlice";
import { profilePackageReducer } from "./reducers/profilePaymet";
import { userDataReducer } from "./reducers/userDataSlice";
import { wishlistReducer } from "./reducers/wishlistSlice";
import { bookApiSlice } from "../../features/bookApiSlice";
import { bookReviewApiSlice } from "../../features/bookReviewApiSlice";
import { tempEmailReducer } from "./reducers/tempEmail";
import { adminApiSlice } from "../../features/adminApiSlice";
export const clientStore = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    res: resReducer,
    author: authorReducer,
    homepage: homepageReducer,
    // checkAuth: checkAuthReducer,
    stripePackages: stripePackagesReducer,
    stripeOrders: stripeOrdersReducer,
    temporaryEmail: tempEmailReducer,
    [homepageApi.reducerPath]: homepageApi.reducer,
    package: packageReducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    [bookReviewApiSlice.reducerPath]: bookReviewApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    userState: userReducer,
    bookReviews: bookReviewReducer,
    userData: userDataReducer,
    ProfilePayment: profilePackageReducer,
    WishList: wishlistReducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      homepageApi.middleware,
      adminApiSlice.middleware,
      packageApi.middleware,
      authApiSlice.middleware,
      userApi.middleware,
      bookApiSlice.middleware,
      bookReviewApiSlice.middleware
      // authApi.middleware
    ),
});
