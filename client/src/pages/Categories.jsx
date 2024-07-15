import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import "../styles/Categories.css";

function Categories() {
  const { user, categories, setCategories } = useContext(MyContext);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName, user_id: user.id }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setCategoryName(""); // Clear the input field
      } else {
        console.error("Failed to create a new category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Hello {user.username} </h1>
      <form onSubmit={handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">New Category name</label>
        <input
          name="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Your Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
