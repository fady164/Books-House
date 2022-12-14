import { React, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CreateIcon from "@mui/icons-material/Create";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BookIcon from "@mui/icons-material/Book";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FilterIcon from "@mui/icons-material/Filter";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StyleIcon from "@mui/icons-material/Style";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutInState } from "../../../store/client/reducers/userSlice";
import { toast } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { useLogoutAdminMutation } from "../../../features/adminApiSlice";
import { RiLockPasswordLine } from "react-icons/ri";

const Item = ({ title, to, icon, selected, setSelected }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const navigate = useNavigate();
   return (
      <MenuItem
         active={selected === title}
         style={{
            color: colors.grey[100],
            listStyle: "none",
         }}
         onClick={() => {
            return setSelected(title), navigate(to);
         }}
         icon={icon}
      >
         <Typography>{title}</Typography>
         <Link to={to} />
      </MenuItem>
   );
};

export default function Sidebar() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [selected, setSelected] = useState("Dashboard");
   //   const [logoutUser, { isLoading, isError, isSuccess, error }] =
   //     useLogoutUserMutation();
   const [logoutAdmin, { isLoading, isError, isSuccess, error }] =
      useLogoutAdminMutation();

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
      logoutAdmin();
   };
   const passwordHandler = () => {
      navigate("/auth/adminpassword");
   };

   return (
      <div>
         <Box
            sx={{
               "& .pro-sidebar-inner": {
                  background: `${colors.primary[400]} !important `,
               },
               "& .pro-icon-wrapper": {
                  backgroundColor: "transparent !important",
               },
               "& .pro-inner-item": {
                  padding: "5px 35px 5px 20px !important",
               },
               "& .pro-inner-item:hover": {
                  color: "#868dfb !important",
               },
               "& .pro-menu-item.active": {
                  color: "#6870fa !important",
               },
               "& .pro-sidebar.collapsed": {
                  "min-width": "100px",
               },
            }}
         >
            <ProSidebar collapsed={isCollapsed}>
               <Menu iconShape="square">
                  {/* LOGO AND MENU ICON */}
                  <MenuItem
                     onClick={() => setIsCollapsed(!isCollapsed)}
                     icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                     style={{
                        margin: "10px 0 20px 0",
                        listStyle: "none",
                        color: colors.grey[100],
                     }}
                  >
                     {!isCollapsed && (
                        <Box
                           display="flex"
                           justifyContent="space-between"
                           alignItems="center"
                           ml="15px"
                        >
                           <Typography variant="h3" color={colors.grey[100]}>
                              Admin
                           </Typography>
                           <IconButton
                              onClick={() => setIsCollapsed(!isCollapsed)}
                           >
                              <MenuOutlinedIcon />
                           </IconButton>
                        </Box>
                     )}
                  </MenuItem>

                  {/* LOGO */}
                  {!isCollapsed && (
                     <Box mb="25px">
                        <Box
                           display="flex"
                           justifyContent="center"
                           alignItems="center"
                        >
                           {/* <img
                              alt="porfile-user"
                              width="100px"
                              height="100px"
                              src="https://raw.githubusercontent.com/ed-roh/react-admin-dashboard/master/public/assets/user.png"
                              src="./logo.jpg"
                              style={{
                                 objectFit: "cover",
                                 cursor: "pointer",
                                 borderRadius: "10%",
                              } */}
                        </Box>
                     </Box>
                  )}
                  {/* HOUSES */}
                  <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                     {/* ECOMMERCE */}
                     <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                     >
                        Store
                     </Typography>
                     <Item
                        title="Users"
                        to="/admin/users"
                        icon={<GroupIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Books"
                        to="/admin/books"
                        icon={<BookIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Reviews"
                        to="/admin/reviews"
                        icon={<RateReviewIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />

                     {/* <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                     >
                        Houses
                     </Typography>
                     <Item
                        title="Authors House"
                        to="/admin/authorshouse"
                        icon={<CreateIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Books House"
                        to="/admin/bookshouse"
                        icon={<BookIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Readers House"
                        to="/admin/readershouse"
                        icon={<LocalLibraryIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     /> */}
                     {/* CONTROLLERS */}
                     <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                     >
                        Control
                     </Typography>
                     {/* <Item
                        title="Slider Control"
                        to="/admin/slidercontrol"
                        icon={<FilterIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     /> */}
                     <Item
                        title="Packages Control"
                        to="/admin/packagescontrol"
                        icon={<LocalOfferIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     {/* PAYMENTS */}
                     <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                     >
                        Payments
                     </Typography>
                     <Item
                        title="Packages Payments"
                        to="/admin/packagespayments"
                        icon={<ReceiptIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Orders Payments"
                        to="/admin/orderspayments"
                        icon={<PaymentIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />

                     {/* PAGES */}
                     <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                     >
                        Settings
                     </Typography>
                     {/* <Item
                        title="Profile Form"
                        to="/admin/form"
                        icon={<PersonOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     /> */}
                     <Item
                        title="Calendar"
                        to="/admin/calendar"
                        icon={<CalendarTodayOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Change Password"
                        // onClick={passwordHandler}
                        to="/auth/newpassword"
                        icon={<RiLockPasswordLine size={27} />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     <Item
                        title="Log out"
                        // onClick={logoutHandler}
                        to="/admin/logout"
                        icon={<BiLogOut size={27} />}
                        selected={selected}
                        setSelected={setSelected}
                     />
                     {/* <Item
                        title="FAQ Page"
                        to="/admin/faq"
                        icon={<HelpOutlineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                     /> */}
                  </Box>
               </Menu>
            </ProSidebar>
         </Box>
      </div>
   );
}
