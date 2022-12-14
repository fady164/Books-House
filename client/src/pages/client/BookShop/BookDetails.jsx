import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../../assets/css/BookDetails.css";
import CommentSection from "../../../components/client/comments/CommentSection";
import { getBook , getBooks } from "../../../store/client/reducers/bookSlice";
import { addToCart, decreaseCart } from "../../../store/client/reducers/cartSlice";


export default function BookDetails() {
  const { id } = useParams();
  const {books} = useSelector((state) => state.books);
  const book = useSelector((state)=>state.books.bookDetails);

  const cart = useSelector((state) => state.cart);
  const cartItem = cart.cartItems;

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };


  useEffect(() => {
    dispatch(getBooks());
    dispatch(getBook());
     
 }, [dispatch , book]);
 

  // const quantity = () => {
  //   const find = cartItem.find((el) => {
  //     return el.id === book.id;
  //   });
  //   if (find) {
  //     setCount(find.cartQuantity);
  //     return count;
  //   } else {
  //     setCount(0);
  //     return count;
  //   }
  // };

  const quantity = () => {
    const find = cartItem.find((el) => {
      return el.id === book?.id;
    });
    if (find) {
      return find.cartQuantity;
    } else {
      return 0;
    }
  };





  useEffect(() => {}, [cart]);
  return (
    <div className="container">
    <div className="border border-1 mx-5 rounded">
      <div className="row p-5">
        <div className="col-5">
          <img src={book?.imageSource} className="col-12 imgs" alt="" />
        </div>
        <div className="col-6 p-5">
          <div className="row">
            <h2 className="fw-bolder text-capitalize ">{book?.title}</h2>
            <p className="mb-5 text-secondary">By {book?.author}</p>
            <h3 className="fw-bold mb-5">${book?.price}</h3>
            <p>Description : {book?.desc}</p>
          </div>
          <div className="row m-3">
            <button
              className="btn btn-warning col-2 "
              onClick={() => handleDecreaseCart(book)}
            >
              -
            </button>
            <div className="count col-1 text-center mt-2">{quantity()}</div>
            <button
              className="btn btn-primary col-2 "
              onClick={() => handleAddToCart(book)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* <CommentSection book={book}/> */}
    </div>
  );
}
