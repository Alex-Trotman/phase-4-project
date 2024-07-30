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
    <div>
      {category ? (
        <>
          <h1>Category: {category.name}</h1>
          <div className="habit-input">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                id="newHabit"
                name="newHabit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newHabit}
                placeholder="Enter new habit"
              />
              {formik.touched.newHabit && formik.errors.newHabit ? (
                <div className="error">{formik.errors.newHabit}</div>
              ) : null}

              <select
                id="habitType"
                name="habitType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.habitType}
              >
                <option value="boolean">Boolean</option>
                <option value="numeric">Metric/Value</option>
              </select>
              {formik.touched.habitType && formik.errors.habitType ? (
                <div className="error">{formik.errors.habitType}</div>
              ) : null}

              <button type="submit" disabled={formik.isSubmitting}>
                {editingHabit ? "Update Habit" : "Add Habit"}
              </button>
              {editingHabit && (
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setEditingHabit(null);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
          <div className="table-container">
            <table className="habit-table">
              <thead>
                <tr>
                  <th>Habit Name</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits
                  .filter(
                    (habit) => habit.category_id.toString() === categoryId
                  )
                  .map((habit) => (
                    <tr key={habit.id} className="habit-item">
                      <td>
                        <Link
                          to={`/dashboard/logs/${habit.id}`}
                          className="habit-link"
                        >
                          {habit.name}
                        </Link>
                      </td>
                      <td>{habit.metric_type}</td>
                      <td>
                        <button onClick={() => handleEdit(habit)}>Edit</button>
                        <button
                          onClick={() => handleDelete(habit.id)}
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
        </>
      ) : (
        <h1>Category not found</h1>
      )}
    </div>
  );
}

export default CategoryPage;
