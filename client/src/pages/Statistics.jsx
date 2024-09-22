// import React, { useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { MyContext } from "../MyContext";
// import StatisticsDonut from "../components/StatisticsDonut";

// function Statistics() {
//   const { categories, fetchCategories } = useContext(MyContext);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="statistics-main h-full w-full flex bg-white">
//       {/* <div className="categories-cards h-16 w-full flex justify-evenly shadow-lg ">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className="m-3 hover:bg-gray-300 p-2 rounded-md"
//           >
//             <Link
//               to={`${category.name.split(" ").join("_")}`}
//               className="category-link"
//             >
//               {category.name + " Statistics"}
//             </Link>
//           </div>
//         ))}
//       </div> */}
//       <StatisticsDonut categories={categories} />
//     </div>
//   );
// }

// export default Statistics;

import React, { useContext, useEffect } from "react";
import { MyContext } from "../MyContext";
import StatisticsDonut from "../components/StatisticsDonut";
import { Link } from "react-router-dom";

function Statistics() {
  const { categories, habits, fetchCategories } = useContext(MyContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="statistics-main flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
      {/* Full-screen centered donut chart */}

      {habits.length > 0 ? (
        <>
          <h1>Click on a section to drill down</h1>
          <StatisticsDonut categories={categories} />
        </>
      ) : (
        <p className="text-gray-500">
          Please add{" "}
          <Link to="/app/categories" className="text-blue-500 underline">
            categories
          </Link>{" "}
          and{" "}
          <Link to="/app/habits" className="text-blue-500 underline">
            habits
          </Link>
          .
        </p>
      )}
    </div>
  );
}

export default Statistics;
