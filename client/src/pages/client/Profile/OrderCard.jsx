import React from "react";

export default function OrderCard({ data }) {
  console.log(data);
  return (
    <div className="card border-primary mb-3">
      <div className="card-body">
        <header className="d-lg-flex">
          <div className="flex-grow-1">
            <h6 className="mb-0">
              Order ID: {data._id}
              <i className="dot"></i>
              <span className="text-muted ps-3">
                Delivery Status :{data.delivery_status}{" "}
              </span>
              <br />
              <span className="text-success">
                payment Status :{data.payment_status}{" "}
              </span>
            </h6>
            <span className="text-muted">Date:{data.createdAt} </span>
          </div>
        </header>
        <hr />
        <div className="row">
          <div className="col-lg-4">
            <p className="mb-0 text-muted">Contact</p>
            <p className="m-0">
              Name: {data.shipping.name}
              <br />
              Phone: {data.customerPhone} <br /> Email:
              {data.customerEmail}{" "}
            </p>
          </div>
          <div className="col-lg-4 border-start">
            <p className="mb-0 text-muted">Shipping</p>
            <p className="m-0">
              {" "}
              State: {data.shipping.address.state} <br />
              City: {data.shipping.address.city}
            </p>
          </div>
          <div className="col-lg-4 border-start">
            <p className="mb-0 text-muted">Payment</p>
            <p className="m-0">
              SubTotal: ${data.subtotal} <br />
              Total paid: ${data.total}
            </p>
          </div>
        </div>
        <hr />
        <ul className="row">
          {data.products?.map((item, index) => (
            <li key={index} className="col-xl-4  col-lg-6">
              <figure className="itemside mb-3">
                <div className="aside ml-2 ">
                  <img
                    width="100"
                    height="100"
                    src={item.imageSource}
                    alt=""
                    className="img-sm rounded border"
                  />
                </div>
                <figcaption className="info">
                  <strong className="title">{item.title}</strong>
                  <br />
                  <strong> Quantity: {item.quantity} </strong>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>{" "}
    </div>
  );
}
