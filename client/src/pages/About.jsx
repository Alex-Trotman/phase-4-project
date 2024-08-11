import React from "react";

function About() {
  return (
    // <div>
    //   <h1>About Us</h1>
    //   <p>
    //     Welcome to our habit tracking app! Our mission is to help you build and
    //     maintain positive habits. Track your habits, analyze your progress, and
    //     achieve your goals with ease.
    //   </p>
    //   <p>
    //     Our app provides various features including habit tracking, progress
    //     visualization, and personalized recommendations. We hope you find it
    //     useful and it helps you in your journey towards self-improvement.
    //   </p>
    // </div>

    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-light text-gray-800 mb-8">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to our habit tracking app! Our mission is to help you build
          and maintain positive habits. Track your habits, analyze your
          progress, and achieve your goals with ease.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our app provides various features including habit tracking, progress
          visualization, and personalized recommendations. We hope you find it
          useful and that it helps you in your journey towards self-improvement.
        </p>
      </div>
    </div>
  );
}

export default About;
