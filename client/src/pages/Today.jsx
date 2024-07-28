import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import "../styles/Today.css"; // Import the CSS file

const Today = () => {
  const { categories, habits, fetchHabits } = useContext(MyContext);
  const today = new Date().toISOString().split("T")[0];
  const [habitStatuses, setHabitStatuses] = useState({});
  const [habitValues, setHabitValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      const initialStatuses = {};
      const initialValues = {};

      console.log("Habits:", habits);
      console.log("Today:", today);

      habits.forEach((habit) => {
        console.log(`Processing habit ${habit.id}:`, habit);

        const logForToday = habit.logs.find(
          (log) => log.log_date.split("T")[0] === today
        );
        console.log(`Log for today for habit ${habit.id}:`, logForToday);

        initialStatuses[habit.id] = logForToday ? logForToday.status : false;

        if (habit.metric_type === "numeric" && logForToday) {
          const dataForLog = habit.data.find(
            (data) => data.log_id === logForToday.id
          );
          console.log(`Data for log ${logForToday.id}:`, dataForLog);
          initialValues[habit.id] = dataForLog ? dataForLog.metric_value : 0;
        } else {
          initialValues[habit.id] = 0;
        }
      });

      console.log("Initial Statuses:", initialStatuses);
      console.log("Initial Values:", initialValues);

      setHabitStatuses(initialStatuses);
      setHabitValues(initialValues);
      setLoading(false);
    } else {
      console.log("No habits found");
      setLoading(false);
    }
  }, [habits, today]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setNoData(true);
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [loading]);

  console.log("habitStatuses", habitStatuses);
  console.log("habitValues", habitValues);
  console.log("habits inside today", habits);

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

  if (loading && !noData) {
    return <div>Loading...</div>;
  }

  if (noData) {
    if (categories.length === 0) {
      return <div>No categories or habits. Please create them.</div>;
    } else if (habits.length === 0) {
      return <div>No habits found. Please add habits.</div>;
    }
  }

  return (
    <div className="today-container">
      {categories.length > 0 ? (
        renderTable()
      ) : (
        <div>No categories found. Please create categories.</div>
      )}
    </div>
  );
};

export default Today;
