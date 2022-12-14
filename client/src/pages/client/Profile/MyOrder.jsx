import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoProducts from "../../../components/client/ui/NoProducts/NoProducts";
import { getprofileOrder } from "../../../store/client/reducers/profilePaymet";
import OrderCard from "./OrderCard";

export default function MyOrder() {
  const dispatch = useDispatch();
  const { profileOrder } = useSelector((state) => state.ProfilePayment);
  const { user } = useSelector((state) => state.userState);
  const email = user.email;

  useEffect(() => {
    dispatch(getprofileOrder({ email }));
  }, []);

  return (
    <div>
      {profileOrder ? (
        profileOrder?.map((item, index) => (
          <OrderCard key={index} data={item} />
        ))
      ) : (
        <NoProducts />
      )}
    </div>
  );
}
