import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";

function LogsPage() {
  const { habits } = useContext(MyContext);
  const { habitId } = useParams();

  const habit = habits.find((habit) => habit.id.toString() === habitId);

  return (
    <div>
      {habit ? (
        <>
          <h1>Habit: {habit.name}</h1>
        </>
      ) : (
        <h1>Habit not found</h1>
      )}
    </div>
  );
}

export default LogsPage;
