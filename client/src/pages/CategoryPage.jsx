import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Habits.css";
import { useFormik } from "formik";
import * as yup from "yup";

function CategoryPage() {
  const { categories, habits, setHabits, fetchHabits } = useContext(MyContext);
  const { categoryId } = useParams();

  const category = categories.find((cat) => cat.id.toString() === categoryId);

  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const validationSchema = yup.object().shape({
    newHabit: yup.string().required("Habit name is required"),
    habitType: yup.string().required("Habit type is required"),
  });

  const formik = useFormik({
    initialValues: {
      newHabit: "",
      habitType: "boolean",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!categoryId) {
        alert("Please select a category");
        return;
      }
      const habitData = {
        name: values.newHabit,
        type: values.habitType,
        category_id: categoryId,
      };

      if (editingHabit) {
        // Update habit
        try {
          const response = await fetch(`/habits/${editingHabit.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(habitData),
          });

          if (response.ok) {
            const updatedHabit = await response.json();
            setHabits((prevHabits) =>
              prevHabits.map((habit) =>
                habit.id === updatedHabit.id ? updatedHabit : habit
              )
            );
            resetForm();
            setEditingHabit(null);
          } else {
            console.error("Failed to update habit");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      } else {
        // Create new habit
        try {
          const response = await fetch("/habits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(habitData),
          });

          if (response.ok) {
            const newHabitData = await response.json();
            setHabits((prevHabits) => [...prevHabits, newHabitData]);
            resetForm();
          } else {
            console.error("Failed to create habit");
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
      const response = await fetch(`/habits/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHabits((prevHabits) =>
          prevHabits.filter((habit) => habit.id !== id)
        );
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (habit) => {
    formik.setFieldValue("newHabit", habit.name);
    formik.setFieldValue("habitType", habit.metric_type);
    setEditingHabit(habit);
  };

  return (
    <div className="bg-gray-100 p-6 shadow-lg flex flex-col items-center">
      {category ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Category: {category.name}
          </h1>
          <div className="habit-input w-full max-w-md">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                type="text"
                id="newHabit"
                name="newHabit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newHabit}
                placeholder="Enter new habit"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.newHabit && formik.errors.newHabit ? (
                <div className="error text-red-500 text-sm">
                  {formik.errors.newHabit}
                </div>
              ) : null}

              <select
                id="habitType"
                name="habitType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.habitType}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="boolean">Boolean</option>
                <option value="numeric">Metric/Value</option>
              </select>
              {formik.touched.habitType && formik.errors.habitType ? (
                <div className="error text-red-500 text-sm">
                  {formik.errors.habitType}
                </div>
              ) : null}

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editingHabit ? "Update Habit" : "Add Habit"}
                </button>
                {editingHabit && (
                  <button
                    type="button"
                    onClick={() => {
                      formik.resetForm();
                      setEditingHabit(null);
                    }}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="table-container mt-6 w-full max-w-4xl">
            <table className="habit-table w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2">Habit Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits
                  .filter(
                    (habit) => habit.category_id.toString() === categoryId
                  )
                  .map((habit) => (
                    <tr key={habit.id} className="habit-item text-gray-700">
                      <td className="p-2">
                        <Link
                          to={`/app/logs/${habit.id}`}
                          className="habit-link text-blue-500 hover:underline"
                        >
                          {habit.name}
                        </Link>
                      </td>
                      <td className="p-2">{habit.metric_type}</td>
                      <td className="p-2 flex space-x-4">
                        <button
                          onClick={() => handleEdit(habit)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(habit.id)}
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
        </>
      ) : (
        <h1 className="text-xl font-bold text-center">Category not found</h1>
      )}
    </div>
  );
}

export default CategoryPage;
