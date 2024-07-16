import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Habits.css";

function CategoryPage() {
  const { categories } = useContext(MyContext);
  const { categoryId } = useParams();

  const category = categories.find(cat => cat.id.toString() === categoryId);

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [habitType, setHabitType] = useState("boolean");

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        { id: Date.now(), name: newHabit, type: habitType },
      ]);
      setNewHabit("");
      setHabitType("boolean");
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const updateHabit = (id, newName, newType) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, name: newName, type: newType } : habit
      )
    );
  };

  return (
    <div>
      {category ? (
        <>
          <h1>Category: {category.name}</h1>
          <h1>Category ID: {categoryId}</h1>
          <div className="habit-input">
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
            <button onClick={addHabit}>Add Habit</button>
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
                {habits.map((habit) => (
                  <tr key={habit.id} className="habit-item">
                    <td>
                      <input
                        type="text"
                        value={habit.name}
                        onChange={(e) =>
                          updateHabit(habit.id, e.target.value, habit.type)
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={habit.type}
                        onChange={(e) =>
                          updateHabit(habit.id, habit.name, e.target.value)
                        }
                      >
                        <option value="boolean">Boolean</option>
                        <option value="metric">Metric/Value</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteHabit(habit.id)}>Delete</button>
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
