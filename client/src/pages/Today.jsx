import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import "../styles/Today.css"; // Import the CSS file

const Today = () => {
  const { categories, habits, fetchHabits } = useContext(MyContext);
  const today = new Date().toISOString().split("T")[0];
  const [habitStatuses, setHabitStatuses] = useState({});
  const [habitValues, setHabitValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      const initialStatuses = {};
      const initialValues = {};

      habits.forEach((habit) => {
        const logForToday = habit.logs.find(
          (log) => log.log_date.split("T")[0] === today
        );
        initialStatuses[habit.id] = logForToday ? logForToday.status : false;

        if (habit.metric_type === "numeric" && logForToday) {
          const dataForLog = habit.data.find(
            (data) => data.log_id === logForToday.id
          );
          initialValues[habit.id] = dataForLog ? dataForLog.metric_value : 0;
        } else {
          initialValues[habit.id] = 0;
        }
      });

      setHabitStatuses(initialStatuses);
      setHabitValues(initialValues);
      setLoading(false);
    }
  }, [habits, today]);

  console.log("habitStatuses", habitStatuses);
  console.log("habitValues", habitValues);

  const renderTable = () => {
    return categories.map((category) => (
      <div key={category.id} className="category-container">
        <h3>{category.name}</h3>
        <div className="table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>Day</th>
                {habits
                  .filter((habit) => habit.category_id === category.id)
                  .map((habit) => (
                    <th key={habit.id}>{habit.name}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{today}</td>
                {habits
                  .filter((habit) => habit.category_id === category.id)
                  .map((habit) => (
                    <td key={habit.id}>
                      {habit.metric_type === "boolean"
                        ? habitStatuses[habit.id]
                          ? "✔️"
                          : "✘"
                        : habitValues[habit.id]}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="today-container">
      {/* <h2>Today's Habits</h2> */}
      {renderTable()}
    </div>
  );
};

export default Today;
