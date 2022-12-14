import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
  wishTotalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWish(state, action) {
      console.log(action.payload);
      const existingIndex = state.wishlistItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.wishlistItems[existingIndex] = {
          ...state.wishlistItems[existingIndex],
          wishQuantity: state.wishlistItems[existingIndex].wishQuantity + 1,
        };
        toast.success("Product added to WishList", {
          position: "bottom-right",
        });
      } else {
        let tempProductItem = { ...action.payload, wishQuantity: 1 };
        state.wishlistItems.push(tempProductItem);
        toast.success("Product added to WishList", {
          position: "bottom-right",
        });
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
    removeFromWish(state, action) {
      state.wishlistItems.map((wishItem) => {
        console.log(action.payload);
        if (wishItem._id === action.payload._id) {
          const nextwishlistItems = state.wishlistItems.filter(
            (item) => item._id !== wishItem._id
          );

          state.wishlistItems = nextwishlistItems;

          toast.success("Product removed from Wish List", {
            position: "bottom-right",
          });
        }
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
        return state;
      });
    },
    clearWish(state, action) {
      state.wishlistItems = [];
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
      toast.success("Wish List Cleard", { position: "bottom-right" });
    },
  },
});

export const { addToWish, removeFromWish, clearWish } = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
