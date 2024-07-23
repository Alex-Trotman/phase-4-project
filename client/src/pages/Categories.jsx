import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Categories.css";
import { useFormik } from "formik";
import * as yup from "yup";

function Categories() {
  const { user, categories, setCategories } = useContext(MyContext);
  const [editingCategory, setEditingCategory] = useState(null);

  const validationSchema = yup.object().shape({
    categoryName: yup.string().required("Category name is required"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (editingCategory) {
        // Update category
        try {
          const response = await fetch(`/categories/${editingCategory.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: values.categoryName }),
          });

          if (response.ok) {
            const updatedCategory = await response.json();
            setCategories((prevCategories) =>
              prevCategories.map((category) =>
                category.id === updatedCategory.id ? updatedCategory : category
              )
            );
            resetForm();
            setEditingCategory(null);
          } else {
            console.error("Failed to update the category");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      } else {
        // Create new category
        try {
          const response = await fetch("/categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: values.categoryName, user_id: user.id }),
          });

          if (response.ok) {
            const newCategory = await response.json();
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            resetForm();
          } else {
            console.error("Failed to create a new category");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

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
    formik.setFieldValue("categoryName", category.name);
    setEditingCategory(category);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-container">
      <h1>Hello {user.username}</h1>
      <form onSubmit={formik.handleSubmit} className="category-input">
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryName}
          placeholder={editingCategory ? "Edit Category Name" : "New Category Name"}
        />
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div className="error">{formik.errors.categoryName}</div>
        ) : null}
        <button type="submit" disabled={formik.isSubmitting}>
          {editingCategory ? "Update" : "Submit"}
        </button>
        {editingCategory && (
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
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
                <td>
                  <Link to={`/dashboard/category/${category.id}`} className="category-link">
                    {category.name}
                  </Link>
                </td>
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
