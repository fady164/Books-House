import { Box, Container, Typography } from "@mui/material";
import style from "./styleAuth.module.css";

const UnauthorizePage = () => {
  return (
    <div className="container p-5 mt-5 text-center d-flex flex-column align-items-center justify-content-evenly ">
      <div className={style.lock}></div>
      <div>
        <h1 className="restrictid__Access">Access to this page is restricted</h1>
        <p>
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizePage;
