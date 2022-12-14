import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";

// const API = axios.baseUrl()

const comment = (value, id) => axios.post(`/book/${id}/commentBook`, { value } );

export const commentBook = (value, id) => async (dispatch) => {
  try {
    const { data } = await comment(value, id);

    dispatch({ type: "COMMENT", payload: data });

    return data.comments;
  } catch (error) {}
};

