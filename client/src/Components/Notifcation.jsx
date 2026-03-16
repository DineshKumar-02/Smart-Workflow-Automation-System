import React from "react";

function Notification({ message }) {
  if (!message) return null;
  return <p style={{ color: "green" }}>{message}</p>;
}

export default Notification;