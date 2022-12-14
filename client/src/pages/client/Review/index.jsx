import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/client/ui/Breadcrump/BreadCrumb";
import AsideBooks from "./AsideBooks";
import BookReview from "./BookReview";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/client/ui/Pagination/Pagination";
import { useGetBookReviewsQuery } from "../../../features/bookReviewApiSlice";
import { bookReviewActions } from "../../../store/client/reducers/bookReviewSlice";

export default function Reviews() {
  // const data = bookReviews;
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { data, isError, isLoading } = useGetBookReviewsQuery();
  const dispatch = useDispatch();
  const { getDataBookReview } = bookReviewActions;
  const { bookReviews } = useSelector((state) => state.bookReviews);
  console.log(bookReviews);
  useEffect(() => {
    if (data) {
      dispatch(getDataBookReview(data));
      console.log("data from index", data);
    }
  }, [dispatch, data]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

   const filterItem = async (curcat) => {
      const newItem = await bookReviews.filter((item) => {
         return item?.category === curcat;
      });
      setItems(newItem);
   };
   useEffect(() => {
      if(bookReviews){
      setItems(bookReviews);}
   }, [bookReviews]);
   


   return (
      <div className="starting__page">
         {/* <BreadCrumb title="Reviews" breadCrumb="Reviews" /> */}
         <div className="container ">
            {/* BUTTONS */}
            <div className="px-0 mt-5 col-12 d-flex justify-content-between flex-wrap btn-group">
               <button
                  className="mx-0  btn btn-outline-dark mt-2 "
                  onClick={() => setItems(bookReviews)}
               >
                  All
               </button>
               <button
                  className="mx-0  btn btn-outline-dark mt-2 "
                  onClick={() => filterItem("Literary & General Fiction")}
               >
                  Literary & General Fiction
               </button>
               <button
                  className="btn btn-outline-dark mt-2"
                  onClick={() => filterItem("Sci-Fi & Fantasy")}
               >
                  Sci-Fi & Fantasy
               </button>
               <button
                  className="btn btn-outline-dark mt-2 "
                  onClick={() => filterItem("Mystery, Thriller, & Suspense")}
               >
                  Mystery, Thriller, & Suspense
               </button>
               <button
                  className="btn btn-outline-dark mt-2"
                  onClick={() => filterItem("Short Story Collections")}
               >
                  Short Story Collections
               </button>
               <button
                  className="btn btn-outline-dark mt-2 "
                  onClick={() => filterItem("Middle Grade & Young Adult")}
               >
                  Middle Grade & Yound Adult
               </button>
               <button
                  className="btn btn-outline-dark mt-2"
                  onClick={() => filterItem("Middle Grade & Young Adult")}
               >
                  Non-Fiction
               </button>
               <button
                  className="btn btn-outline-dark  mt-2"
                  onClick={() => filterItem("Middle Grade & Young Adult")}
               >
                  Poetry
               </button>
            </div>
            {/* REVIEWS */}
            <div className="row mt-5  px-0">
               {/* Componants */}
               <div className="col-lg-8 col-sm-12 mb-5">
                  {items &&
                     currentItems?.map((item, index) => (
                        <BookReview key={index} data={item} />
                     ))}
                  <Pagination
                     totalItems={items?.length}
                     itemsPerPage={itemsPerPage}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage}
                  />
               </div>
               {/* ASIDE */}
               <div className="col-lg-4 col-sm-12 px-0 ">
                  {/* Aside Section 1 */}
                  <div className="col-12 mb-5 border-top border-dark">
                     <img
                        className="mt-2 w-100 h-100"
                        alt=""
                        src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/books-of-the-month-1080-%C3%97-1080-px.png?w=1080&ssl=1"
                     />
                  </div>
                  {/* Aside Section 2 */}
                  <div className=" p-0 col-lg-12 mb-5 border-top border-dark">
                     <div className="row mt-4">
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/Braiding-Sweetgrass.jpeg?w=647&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/world-as-we-knew-it.jpg?w=333&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/08/My-Volcano.jpeg?resize=751%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/03/Jerks.jpeg?resize=706%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2021/12/I-Will-Die-in-a-Foreign-Land-cover.jpg?resize=751%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2021/12/Where-We-Go-When-All-We-Were-Is-Gone.jpeg?resize=663%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/07/Oyerinde-Cover-Project-front-jpg.jpg?resize=662%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/04/dream-pop-origami.jpeg?resize=663%2C1024&ssl=1" />
                        <AsideBooks src="https://i0.wp.com/independentbookreview.com/wp-content/uploads/2022/11/When-i-was-the-wind.jpeg?resize=663%2C1024&ssl=1" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
  );
}
