import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { addToCart , getBook } from "../../store/client/reducers/cartSlice";
import "../../assets/css/BookCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailsOfBook = () => {

    navigate(`bookdetails/${book.id}`);
  };

  const handleAddToCart = (book) => {
    dispatch(getBook(book))
    dispatch(addToCart(book));
  };

  return (
    <div className="col-lg-4 col-md-10 mb-3">
      <div className="cardItem d-flex flex-column border border-1">
        <div className="cardImg col-12">
          <img src={book.imageSrc} className="img-fluid" alt="" />
        </div>
        <div className="row d-flex flex-column p-3 justify-content-center ">
          <h3 className="col-12 bookTitle" onClick={detailsOfBook}>
            {book.title}
          </h3>
          <p className="text-secondary col-12">{book.author}</p>
          <p className="col-10">{book.desc}</p>
        </div>
        <div className="col-12 d-flex justify-content-between p-3">
          <div>
            <h4 className="text-danger">${book.price}</h4>
          </div>
          <div>
            <a href="..">
              <FontAwesomeIcon
                onClick={() => handleAddToCart(book)}
                className="text-dark fs-5"
                icon={faCartPlus}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
