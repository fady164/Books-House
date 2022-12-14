import React from "react";
import { Button } from "react-bootstrap";

export default function MyButton({ children, variant }) {
  return <Button className="btn btn-war">{children}</Button>;
}

