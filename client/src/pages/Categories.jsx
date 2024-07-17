import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import "../styles/Categories.css";

function Categories() {
  const { user, categories, setCategories } = useContext(MyContext);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCategory) {
      // Update category
      try {
        const response = await fetch(`/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        });

        if (response.ok) {
          const updatedCategory = await response.json();
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
            )
          );
          setCategoryName("");
          setEditingCategory(null);
        } else {
          console.error("Failed to update the category");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Create new category
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
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/categories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      } else {
        console.error("Failed to delete the category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingCategory(category);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-container">
      <h1>Hello {user.username}</h1>
      <form onSubmit={handleSubmit} className="category-input">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder={
            editingCategory ? "Edit Category Name" : "New Category Name"
          }
        />
        <button type="submit">{editingCategory ? "Update" : "Submit"}</button>
        {editingCategory && (
          <button
            type="button"
            onClick={() => {
              setCategoryName("");
              setEditingCategory(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="category-item">
                <td>{category.name}</td>
                <td>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
