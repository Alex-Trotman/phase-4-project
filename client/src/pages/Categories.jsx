import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import "../styles/Categories.css";

function Categories() {
  const { user } = useContext(MyContext);

  return (
    <div>Welcome to the categories page, {user ? user.username : "user"}!</div>
  );
}

export default Categories;
