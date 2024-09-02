import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CalendarHeatmap from "react-calendar-heatmap";
import { MyContext } from "../MyContext";
import "../styles/heatmap.css";

function StatisticsCategoryPage() {
  const { categoryName, habitName } = useParams();
  const { habits } = useContext(MyContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formattedHabitName = habitName.replace(/_/g, " ");

  const habit = habits.find((habit) => habit.name === formattedHabitName);

  useEffect(() => {
    if (!habit) return; // Don't proceed if habit is not defined

    const fetchHabitLogs = async () => {
      try {
        setLoading(true);
        const habitId = habit.id;
        const year = new Date().getFullYear();
        const response = await fetch(`/habits/${habitId}/logs/year/${year}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const formattedData = data.map((log) => ({
          date: log.log_date,
          count: 1,
        }));
        setLogs(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitLogs();
  }, [habit]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {categoryName} / {habitName}
      </h1>
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-[800px] overflow-x-auto p-4">
          <CalendarHeatmap
            startDate={new Date("2024-01-01")}
            endDate={new Date("2024-12-31")}
            values={logs}
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticsCategoryPage;
