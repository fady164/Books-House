import React, { useEffect, useState } from "react";
import "../../../assets/css/Home.css";
import ClientsTestimonials from "./ClientsTestimonials";
import WallOfFames from "./WallOfFames";
import { useGetHomepageDataQuery } from "../../../features/homeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../../../store/client/reducers/homepageSlice";
import AboutUs from "./AboutUs";
import DiscoverBooks from "./DiscoverBooks";
import Service from "./Service";
import Banner from "./Banner";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "../../../features/authApiSlice";

const container = {
  show: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.5,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

export default function Home() {
   const { data, isError, isLoading } = useGetHomepageDataQuery();
   const [loginUser, { sucesslogin: isSuccess, isFetching }] =
      useLoginUserMutation();
   const dispatch = useDispatch();
   const { setDataInLocalState } = homepageActions;
   const { wallOfFamesData, clientsTestimonialsData, serviceData } =
      useSelector((state) => state.homepage);
   useEffect(() => {
      console.log(data);
      loginUser();
      if (data) {
         dispatch(setDataInLocalState(data));
      }
   }, [dispatch, data]);
   return (
      <motion.div
         variants={container}
         initial="hidden"
         animate="show"
         exit="exit"
         transition={{ staggerChildren: 0.5 }}
      >
         {isLoading && <FullScreenLoader />}
         <motion.div className="home__style" variants={item}>
            <Banner headerArray={serviceData} />

            <section className="section pb-0">
               <AboutUs />
               <DiscoverBooks variants={item} />
               <ClientsTestimonials
                  variants={item}
                  clientsTestimonialsArray={clientsTestimonialsData}
               ></ClientsTestimonials>
            </section>

            <Service variants={item} serviceArray={serviceData}></Service>
            {/* <Pricing/> */}

            <WallOfFames
               variants={item}
               wallOfFamesArray={wallOfFamesData}
            ></WallOfFames>
         </motion.div>
      </motion.div>
   );
}
