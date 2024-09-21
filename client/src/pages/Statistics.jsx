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

function Statistics() {
  const { categories, fetchCategories } = useContext(MyContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="statistics-main flex items-center justify-center h-screen bg-white overflow-hidden">
      {/* Full-screen centered donut chart */}
      <StatisticsDonut categories={categories} />
    </div>
  );
}

export default Statistics;
