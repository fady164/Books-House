import React from "react";
import axios from "axios";

import { useQuery } from "react-query";
export default function BooksQuery() {
  async function fetchBooks() {
    const { data } = await axios.get("http://localhost:3005/books");
    return data;
  }

  const { data, error, isError, isLoading } = useQuery("books", fetchBooks);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>books</h1>
      {data.map((post, index) => {
        return <li key={index}>{post.title}</li>;
      })}
    </div>
  );
}
