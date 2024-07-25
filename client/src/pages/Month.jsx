import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

const Month = () => {
  const { categories, habits, fetchHabits } = useContext(MyContext);
  const today = new Date();
  const monthDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  });

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

      habits.forEach((habit) => {
        initialStatuses[habit.id] = {};
        initialValues[habit.id] = {};
        monthDays.forEach((day) => {
          const logForDay = habit.logs?.find(
            (log) => log.log_date.split("T")[0] === day
          );
          initialStatuses[habit.id][day] = logForDay ? logForDay.status : false;

          if (habit.metric_type === "numeric" && logForDay) {
            const dataForLog = habit.data?.find(
              (data) => data.log_id === logForDay.id
            );
            initialValues[habit.id][day] = dataForLog
              ? dataForLog.metric_value
              : 0;
          } else {
            initialValues[habit.id][day] = 0;
          }
        });
      });

      setHabitStatuses(initialStatuses);
      setHabitValues(initialValues);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [habits, monthDays]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setNoData(true);
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [loading]);

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
              {monthDays.slice().map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {habits
                    .filter((habit) => habit.category_id === category.id)
                    .map((habit) => (
                      <td key={habit.id}>
                        {habit.metric_type === "boolean"
                          ? habitStatuses[habit.id]?.[day]
                            ? "✔️"
                            : "✘"
                          : habitValues[habit.id]?.[day]}
                      </td>
                    ))}
                </tr>
              ))}
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
    <div className="month-container">
      {categories.length > 0 ? (
        renderTable()
      ) : (
        <div>No categories found. Please create categories.</div>
      )}
    </div>
  );
};

export default Month;
