import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../MyContext";

function StatisticsCategoryPage() {
  const { categoryName } = useParams();
  const { categories } = useContext(MyContext);

  // Replace underscores with spaces in the categoryName
  const formattedCategoryName = categoryName.replace(/_/g, " ");

  // Find the category that matches the formatted categoryName
  const category = categories.find(
    (category) => category.name === formattedCategoryName
  );

  return (
    <div className="">
      <div className="h-20 w-full flex items-center">
        {category &&
          category.habits.map((habit) => (
            <div
              key={habit.id}
              className="m-3 hover:bg-gray-300 p-2 rounded-md"
            >
              {habit.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default StatisticsCategoryPage;
