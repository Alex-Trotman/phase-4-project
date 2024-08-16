import React from "react";
import backgroundImage from "../assets/background.jpg"; // Adjust the path as needed

function Home() {
  return (
    <div>
      {/* Section 1: Welcome */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white bg-opacity-75 max-w-8xl text-center p-8 rounded-lg shadow-lg">
          <h1 className="text-7xl font-bold text-gray-800">
            Design Your Life, One Habit at a Time
          </h1>
          {/* <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Take control of your habits and start building the life you’ve
            always dreamed of. Our habit tracker helps you stay motivated and on
            track, one step at a time.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Whether you're aiming to improve your health, boost your
            productivity, or develop new skills, our tool is here to guide you
            every step of the way. Let's embark on this journey together.
          </p> */}
        </div>
      </div>

      {/* Other Sections */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl text-center p-8">
          <h2 className="text-4xl font-bold text-gray-800">Another Section</h2>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            This is another section that doesn't have the background image.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
