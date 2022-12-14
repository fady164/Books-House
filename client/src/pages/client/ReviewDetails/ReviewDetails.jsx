import React, { useEffect, useState } from "react";
import ReviewContent from "./ReviewContent";
import ReviewHeader from "../../../components/client/ui/ReviewHeader/ReviewHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ReviewDetails() {
  const { bookReviews } = useSelector((state) => state.bookReviews);
  const dispatch = useDispatch();
  const params = useParams();
  const [items, setItems] = useState(bookReviews);

  useEffect(() => {
    const data = items.filter((item) => {
      return item._id === params.id;
    });
    setItems(data);
  }, []);
  console.log(items[0]);

  return (
    <div className="mt-5 pt-4">
      <ReviewHeader data={items[0]} className="mt-5 pt-5" />
      <ReviewContent data={items[0]} />
    </div>
  );
}
