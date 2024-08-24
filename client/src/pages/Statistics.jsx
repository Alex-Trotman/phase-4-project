import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";

function Statistics() {
  const { categories, fetchCategories } = useContext(MyContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="statistics-main w-full flex">
      <div className="categories-cards h-auto w-full flex justify-evenly shadow-lg ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="m-3 hover:bg-gray-300 p-2 rounded-md"
          >
            <Link
              to={`${category.name.split(" ").join("_")}`}
              className="category-link"
            >
              {category.name + " Statistics"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
