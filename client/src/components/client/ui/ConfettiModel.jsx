import React from "react";

import ReactConfetti from "react-confetti";

export default function ConfettiModal({ size }) {
  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      tweenDuration={1000}
    />
  );
}
