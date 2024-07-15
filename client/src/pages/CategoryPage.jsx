import React from "react";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const categoryId = useParams();
  console.log(categoryId);

  return (
    <div>
      <h1>Category ID: {categoryId.categoryId}</h1>
    </div>
  );
}

export default CategoryPage;
