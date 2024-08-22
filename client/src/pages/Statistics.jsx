import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";

function Statistics() {
  const { user, categories } = useContext(MyContext);

  return (
    <div className="statistics-main">
      <div className="categories-ribbon h-20 w-full flex items-center">
      {categories.map((category) => (
        <div className="m-3 hover:bg-gray-300 p-2 rounded-md">
          <Link
          to={`/app/statistics/${category.name}`}
          className="category-link"
        >
          {category.name}
        </Link>
        </div>
            ))}
      </div>
    </div>
  );
}

export default Statistics;
