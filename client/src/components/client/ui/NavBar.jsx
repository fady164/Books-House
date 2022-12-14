import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../../assets/css/NavBar.css";

import { motion } from "framer-motion";
import { FiHeart, FiLogIn, FiLogOut } from "react-icons/fi";

import { BsBag } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import { getTotals } from "../../../store/client/reducers/cartSlice";
import { logoutInState } from "../../../store/client/reducers/userSlice";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../../features/authApiSlice";
import Cookies from "js-cookie";
import logo2 from "../../../assets/images/logo2.png";
import userIcon from "../../../assets/images/user-icon.png";
import {
  MdOutlineAccountCircle,
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdSwitchAccount,
} from "react-icons/md";
const nav__links = [
  {
    path: "",
  },
  {
    path: "home",
    display: "Home",
  },
  {
    path: "booksshop",
    display: "Shop",
  },
  {
    path: "reviews",
    display: "Reviews",
  },
  {
    path: "authorshouse",
    display: "Authors House",
  },
  {
    path: "about",
    display: "About",
  },
];

const NavBar = ({ showModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading, isError, isSuccess, error }] =
    useLogoutUserMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutInState());
      toast.success("Logout Successfully");
      navigate("/");
    }

    if (isError) {
      toast.error(error?.data, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const logoutHandler = () => {
    logoutUser();
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const clickCart = () => {
    navigate("/cart");
  };
  // Check if the user is Authorized
  const role = useSelector((state) => state.userState.role);
  const token = useSelector((state) => state.userState.token);
  // // change nav color when scrolling
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 40) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  const headerRef = useRef(null);

  const [toggle, setToggle] = useState(false);
  const toggleNavbar = () => {
    setToggle((prevState) => !prevState);
  };
  // const stickyHeaderFunc = () => {
  //    window.addEventListener("scroll", () => {
  //       headerRef.current.classList.add("sticky__header");
  //    });
  // };
  // // }

  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0.2,
      }}
      className="fixed-top"
      ref={headerRef}
    >
      {/* Large screen */}
      <header
        className={
          color ? "header-bg header large__screen" : "header large__screen"
        }
      >
        <div className="container">
          <div className="row">
            <div className="nav__wrapper">
              <div className="logo">
                <img src={logo2} alt="logo" />
                <div>
                  <Link to="/">
                    <h1 className="mb-0">Books House</h1>
                  </Link>
                </div>
              </div>
              <div className="navigation">
                <ul className="menu">
                  {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "text-warning bold" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {token ? (
                <div className="nav__icons">
                  <span onClick={showModal} className="fav__icon">
                    <FiHeart />
                  </span>
                  <span className="cart__icon" onClick={clickCart}>
                    <BsBag />
                    {cartTotalQuantity === 0 ? (
                      false
                    ) : (
                      <span className="__badge">{cartTotalQuantity}</span>
                    )}
                  </span>
                  <span>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="transparent"
                        id="dropdown-basic"
                        className="dropDown__Toggle"
                      >
                        <motion.img
                          whileTap={{ scale: 1.2 }}
                          src={userIcon}
                          alt="user icon"
                        />
                      </Dropdown.Toggle>

                      
                        {/* <Dropdown.Menu className="dropDown__user">
                          <Link to="/admin">
                            <Dropdown.Item
                              href="#/action-1"
                              className="dropDown__item"
                            >
                              <span>
                                <MdOutlineAdminPanelSettings size={28} />
                                {"  "}
                              </span>
                              Dash board
                            </Dropdown.Item>
                          </Link>
                          <Link to="/password">
                            <Dropdown.Item
                              href="#/action-2"
                              className="dropDown__item"
                            >
                              <span>
                                <MdOutlinePassword size={28} />
                                {"  "}
                              </span>
                              Change password
                            </Dropdown.Item>
                          </Link>
                          <Dropdown.Item
                            href="#/action-3"
                            onClick={logoutHandler}
                            className="dropDown__item"
                          >
                            <span>
                              <FiLogOut size={28} />
                            </span>
                            Log out
                          </Dropdown.Item>
                        </Dropdown.Menu> */}
                      
                        <Dropdown.Menu className="dropDown__user">
                          <Link to="/mainprofile">
                            <Dropdown.Item
                              href="#/action-1"
                              className="dropDown__item"
                            >
                              <span>
                                <MdSwitchAccount size={28} />
                                {"  "}
                              </span>
                              Profile
                            </Dropdown.Item>
                          </Link>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={logoutHandler}
                            className="dropDown__item"
                          >
                            <span>
                              <FiLogOut size={28} />
                              {"  "}
                            </span>
                            Log out
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      
                    </Dropdown>
                  </span>
                </div>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    <BiUserCircle />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropDown__user" align="end">
                    <Link to="/auth/login">
                      <Dropdown.Item
                        href="#/action-1"
                        className="dropDown__item"
                      >
                        <span>
                          <FiLogIn size={28} />
                          {"  "}
                        </span>
                        Log-in
                      </Dropdown.Item>
                    </Link>
                    <Link to="/auth/register">
                      <Dropdown.Item
                        href="#/action-2"
                        className="dropDown__item"
                      >
                        <span>
                          <MdOutlineAccountCircle size={28} />
                          {"  "}
                        </span>
                        Sign-up
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </header>
      {/* Small screen */}
      <Navbar bg="light" expand="xl" className="small__screen">
        <Container fluid className="pb-3 pt-3">
          <div className="logo">
            <img src={logo2} alt="logo" />
            <div>
              <h1 className="mb-0">Books House</h1>
            </div>
          </div>
          <div className="w-50 d-flex align-items-baseline justify-content-end">
            {token && (
              <div className="nav__icons">
                <span onClick={showModal} className="fav__icon">
                  <FiHeart />
                </span>
                <span className="cart__icon" onClick={clickCart}>
                  <BsBag />
                  {cartTotalQuantity === 0 ? (
                    false
                  ) : (
                    <span className="__badge"> {cartTotalQuantity}</span>
                  )}
                </span>
                <span>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      className="dropDown__Toggle"
                    >
                      <motion.img
                        whileTap={{ scale: 1.2 }}
                        src={userIcon}
                        alt="user icon"
                      />
                    </Dropdown.Toggle>

                    
                      {/* <Dropdown.Menu className="dropDown__user">
                        <Link to="/admin">
                          <Dropdown.Item
                            href="#/action-1"
                            className="dropDown__item"
                          >
                            Dash board
                          </Dropdown.Item>
                        </Link>
                        <Link to="/password">
                          <Dropdown.Item
                            href="#/action-2"
                            className="dropDown__item"
                          >
                            Change password
                          </Dropdown.Item>
                        </Link>
                        <Link to="/">
                          <Dropdown.Item
                            href="#/action-3"
                            className="dropDown__item"
                          >
                            Log out
                          </Dropdown.Item>
                        </Link>
                      </Dropdown.Menu> */}
                   
                      <Dropdown.Menu className="dropDown__user">
                        <Link to="/mainprofile">
                          <Dropdown.Item
                            href="#/action-1"
                            className="dropDown__item"
                          >
                            Profile
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={logoutHandler}
                          className="dropDown__item"
                        >
                          <FiLogOut />
                          Log out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    
                  </Dropdown>
                </span>
              </div>
            )}

            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-lg"
              // openButton
            />

            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="end"
              className="w-50"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {nav__links.map((item, i) => (
                    <div key={i}>
                      <li className="nav__item mt-4">
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "nav__active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    </div>
                  ))}
                  {/* {!checkAuth && (
                      <Dropdown className="mt-4">
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                          <BiUserCircle />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropDown__user">
                          <Link to="/auth/login">
                            <Dropdown.Item href="#/action-1"  className="dropDown__item">
                              Log-in
                            </Dropdown.Item>
                          </Link>
                          <Link to="/auth/register">
                            <Dropdown.Item href="#/action-2" className="dropDown__item">
                              Sign-up
                            </Dropdown.Item>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    )} */}
                  {!token && (
                    <Dropdown className="mt-4">
                      <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        <BiUserCircle />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropDown__user">
                        <Link to="/auth/login">
                          <Dropdown.Item
                            href="#/action-1"
                            className="dropDown__item"
                          >
                            Log-in
                          </Dropdown.Item>
                        </Link>
                        <Link to="/auth/register">
                          <Dropdown.Item
                            href="#/action-2"
                            className="dropDown__item"
                          >
                            Sign-up
                          </Dropdown.Item>
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavBar;
