import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Habits.css";

function Habits() {
  const { user, categories, habits, setHabits } = useContext(MyContext);
  const [newHabit, setNewHabit] = useState("");
  const [habitType, setHabitType] = useState("boolean");
  const [categoryId, setCategoryId] = useState("");
  const [editingHabit, setEditingHabit] =useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("/habits");
        if (response.ok) {
          const data = await response.json();
          setHabits(data);
        } else {
          console.error("Failed to fetch habits");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

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
          setCategoryId("");
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
          setCategoryId("");
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
    setCategoryId(habit.category_id);
    setEditingHabit(habit);
  };

  return (
    <div className="habits-container">
      <h1>Welcome to the habits page, {user ? user.username : "user"}!</h1>
      <form onSubmit={handleSubmit} className="habit-input">
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
          <option value="metric">Metric/Value</option>
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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
              setCategoryId("");
              setEditingHabit(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="table-container">
        <table className="habit-table">
          <thead>
            <tr>
              <th>Habit Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id} className="habit-item">
                <td>
                  <Link to={`/dashboard/logs/${habit.id}`} className="habit-link">{habit.name}</Link>
                </td>
                <td>{habit.metric_type}</td>
                <td>
                  {categories.find((cat) => cat.id === habit.category_id)?.name}
                </td>
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
    </div>
  );
}

export default Habits;
