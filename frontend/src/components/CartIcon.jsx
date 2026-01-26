// CartIcon.jsx
import React from "react";

const CartIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="white"
      style={{ cursor: "pointer" }}
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
               0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
               14h9.94c.75 0 1.4-.41 1.73-1.03L21.72 7H6.21L5.27 4.5 
               3 4v2h1l3.6 7.59L6.25 17H19v-2H8.53l-.37-.76z" />
    </svg>
  );
};

export default CartIcon;