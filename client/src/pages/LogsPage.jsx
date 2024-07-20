import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import BooleanLogForm from "../components/BooleanLogForm";
import MetricLogForm from "../components/MetricLogForm";
import "../styles/Logs.css";

function LogsPage() {
  const { habits } = useContext(MyContext);
  const { habitId } = useParams();
  const habit = habits.find((habit) => habit.id.toString() === habitId);
  const [logs, setLogs] = useState([]);
  const [habitData, setHabitData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/habits/${habitId}/logs`);
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort logs by date
          setLogs(data);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLogs();
  }, [habitId]);

  useEffect(() => {
    if (habit && habit.metric_type === "numeric") {
      const fetchHabitData = async () => {
        try {
          const response = await fetch(`/habits/${habitId}/data`);
          if (response.ok) {
            const data = await response.json();
            data.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort habit data by date
            setHabitData(data);
          } else {
            console.error("Failed to fetch habit data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchHabitData();
    }
  }, [habit, habitId]);

  const handleNewLog = (newLog) => {
    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      updatedLogs.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort logs by date
      return updatedLogs;
    });
  };

  const handleNewData = (newData) => {
    setHabitData((prevData) => {
      const updatedData = [...prevData, newData];
      updatedData.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort habit data by date
      return updatedData;
    });
  };

  return (
    <div>
      {habit ? (
        <>
          <h1>Habit: {habit.name}</h1>
          {habit.metric_type === "boolean" ? (
            <BooleanLogForm
              habitId={habitId}
              logs={logs}
              setLogs={setLogs}
              onNewLog={handleNewLog}
            />
          ) : (
            <MetricLogForm
              habitId={habitId}
              habitData={habitData}
              setHabitData={setHabitData}
              onNewLog={handleNewData}
            />
          )}
        </>
      ) : (
        <h1>Habit not found</h1>
      )}
    </div>
  );
}

export default LogsPage;
