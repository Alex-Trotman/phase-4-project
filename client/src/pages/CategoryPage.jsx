import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Habits.css";

function CategoryPage() {
  const { categories, habits, setHabits, fetchHabits } = useContext(MyContext);
  const { categoryId } = useParams();

  const category = categories.find((cat) => cat.id.toString() === categoryId);

  const [newHabit, setNewHabit] = useState("");
  const [habitType, setHabitType] = useState("boolean");
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) {
      alert("Please select a category");
      return;
    }
    const habitData = {
      name: newHabit,
      type: habitType,
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
          setNewHabit("");
          setHabitType("boolean");
          setEditingHabit(null);
        } else {
          console.error("Failed to update habit");
        }
      } catch (error) {
        console.error("Error:", error);
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
          setNewHabit("");
          setHabitType("boolean");
        } else {
          console.error("Failed to create habit");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

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
    setNewHabit(habit.name);
    setHabitType(habit.metric_type);
    setEditingHabit(habit);
  };

  return (
    <div>
      {category ? (
        <>
          <h1>Category: {category.name}</h1>
          <div className="habit-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter new habit"
              />
              <select
                value={habitType}
                onChange={(e) => setHabitType(e.target.value)}
              >
                <option value="boolean">Boolean</option>
                <option value="numeric">Metric/Value</option>
              </select>
              <button type="submit">
                {editingHabit ? "Update Habit" : "Add Habit"}
              </button>
              {editingHabit && (
                <button
                  type="button"
                  onClick={() => {
                    setNewHabit("");
                    setHabitType("boolean");
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
