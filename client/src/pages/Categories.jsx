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
            body: JSON.stringify({
              name: values.categoryName,
              user_id: user.id,
            }),
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
    <div className="categories-container bg-gray-100 p-6 shadow-lg flex flex-col items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="category-input space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryName}
          placeholder={
            editingCategory ? "Edit Category Name" : "New Category Name"
          }
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div className="error text-red-500 text-sm">
            {formik.errors.categoryName}
          </div>
        ) : null}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editingCategory ? "Update" : "Submit"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setEditingCategory(null);
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="table-container mt-6 w-full max-w-4xl">
        <table className="category-table w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2">Category Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="category-item text-gray-700">
                <td className="p-2">
                  <Link
                    to={`/app/category/${category.id}`}
                    className="category-link text-blue-500 hover:underline"
                  >
                    {category.name}
                  </Link>
                </td>
                <td className="p-2 flex space-x-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:underline"
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
