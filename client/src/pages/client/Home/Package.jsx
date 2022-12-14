import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PackageQuery from "../../../services/PackageQuery";
// import "../../../assets/css/Package.css";
import { useGetPackageDataQuery } from "../../../features/packageApiSlice";
import { packageActions } from "../../../store/client/reducers/packageSlice";
import PackageCard from "./PackageCard";

const Package = ({ handleShow, setPackages }) => {
  const { data, isError, isLoading } = useGetPackageDataQuery();
  const dispatch = useDispatch();
  const { setDataInLocalState } = packageActions;
  const { packageData } = useSelector((state) => state.package);
  useEffect(() => {
    if (data) {
      dispatch(setDataInLocalState(data));
    }
  }, [dispatch, data]);
  return (
    <div className="container">
      <section id="pricing" className="section bg-white">
        <div className="row d-flex justify-content-center">
          <div className="menu-content pb-70 col-lg-8 mb-4">
            <div className="title text-center">
              <h1 className="fw-semibold">Choose Your Plan</h1>
              <p className="text-muted text-sm">
                When someone does something that they know that they shouldn`t
                do, did they.
              </p>
            </div>
          </div>
        </div>
        <div className="container text-sm">
          <div className="row">
            {packageData.map((item, index) => {
              return (
                <PackageCard
                  key={index}
                  item={item}
                  handleShow={handleShow}
                  setPackages={setPackages}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Package;
