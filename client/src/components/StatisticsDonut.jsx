import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

// Expanded colors array for the pie chart slices
const colors = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#FF4562", // Red
  "#AA00FF", // Purple
  "#FF00AA", // Pink
  "#FFD700", // Gold
  "#ADFF2F", // Lime Green
  "#FF69B4", // Hot Pink
  "#00FA9A", // Medium Spring Green
  "#4B0082", // Indigo
  "#FF6347", // Tomato Red
  "#4682B4", // Steel Blue
  "#8A2BE2", // Blue Violet
  "#7FFF00", // Chartreuse
  "#D2691E", // Chocolate
  "#FF7F50", // Coral
  "#6A5ACD", // Slate Blue
  "#DC143C", // Crimson
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

const StatisticsDonut = ({ categories }) => {
  const [currentView, setCurrentView] = useState("categories"); // To track whether we are showing categories or habits
  const [selectedCategory, setSelectedCategory] = useState(null); // Stores the clicked category
  const [chartKey, setChartKey] = useState(0); // Key for forcing chart re-render
  const navigate = useNavigate(); // For programmatic navigation

  // Force re-render of the chart whenever the component is loaded or refreshed
  useEffect(() => {
    setChartKey(Math.random()); // Set a random key for PieChart to force re-render with animation
  }, []);

  // Prepare data for the donut chart based on current view
  const categoryData = categories.map((category, index) => ({
    name: category.name,
    value: category.habits.length, // Number of habits per category
    color: colors[index % colors.length], // Assign colors in order
    habits: category.habits,
  }));

  // When a category is clicked, switch to the habits view for that category
  const handleCategoryClick = (data) => {
    setSelectedCategory(data);
    setCurrentView("habits");
    setChartKey(Math.random()); // Reset chartKey to trigger re-animation when switching to habits view
  };

  // Handle going back to the categories view
  const handleBackClick = () => {
    setCurrentView("categories");
    setSelectedCategory(null);
    setChartKey(Math.random()); // Reset chartKey to trigger re-animation when going back to categories view
  };

  // Navigate to a habit's detailed statistics page
  const handleHabitClick = (habit, categoryName) => {
    navigate(`/app/statistics/${categoryName}/${habit.name}`);
  };

  // Render the donut chart with habits if a category is selected
  const habitData = selectedCategory
    ? selectedCategory.habits.map((habit, index) => ({
        name: habit.name,
        value: 1, // Each habit gets an equal slice
        color: colors[index % colors.length],
      }))
    : [];

  return (
    <div
      className="donut-chart-container relative flex justify-center items-center"
      style={{ width: "80%", height: "80%" }}
    >
      {currentView === "categories" ? (
        <ResponsiveContainer key={chartKey}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="70%" // Bigger size to fill the screen more
              fill="#8884d8"
              onClick={(e) => handleCategoryClick(e)}
              isAnimationActive={true} // Ensures windup animation is always active
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer key={chartKey}>
          <PieChart>
            <Pie
              data={habitData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="70%" // Bigger size to fill the screen more
              fill="#8884d8"
              isAnimationActive={true} // Windup animation for habits view
              onClick={(data, index) =>
                handleHabitClick(
                  selectedCategory.habits[index],
                  selectedCategory.name
                )
              } // Navigate to habit's page when clicked
            >
              {habitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
      {currentView === "habits" && (
        <button
          onClick={handleBackClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centering the button in the donut hole
            padding: "10px 20px",
            backgroundColor: "#4A90E2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      )}
    </div>
  );
};

export default StatisticsDonut;
