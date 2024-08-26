import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../MyContext";

function StatisticsCategoryPage() {
  const { categoryName, habitName } = useParams();

  return (
    <div className="">
      <h1>
        {categoryName}/{habitName}
      </h1>
    </div>
  );
}

export default StatisticsCategoryPage;
