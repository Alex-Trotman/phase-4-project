import React from "react";

function Home() {
  return (
    // <div>
    //   <div>
    //     <h1>Section 1</h1>
    //   </div>

    //   <div>
    //     <h1>Section 2</h1>
    //   </div>

    //   <div>
    //     <h1>Section 3</h1>
    //   </div>
    // </div>

    <div>
      {/* Section 1: Welcome */}
      <div className="bg-gray-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Welcome to Your Habit Tracker
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Take control of your habits and start building the life you’ve
            always dreamed of. Our habit tracker helps you stay motivated and on
            track, one step at a time.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mt-4">
            Whether you're aiming to improve your health, boost your
            productivity, or develop new skills, our tool is here to guide you
            every step of the way. Let's embark on this journey together.
          </p>
        </div>
      </div>

      {/* Section 2: Features */}
      <div className="bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Features to Help You Succeed
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our app is packed with features designed to make habit tracking
            effortless and effective. From progress visualization to
            personalized recommendations, we have everything you need to stay on
            track.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mt-4">
            Visualize your progress with detailed charts, set reminders to keep
            you accountable, and receive tips tailored to your goals. Our
            features are built to support your unique journey.
          </p>
        </div>
      </div>

      {/* Section 3: Get Started */}
      <div className="bg-gray-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Get Started Today
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Ready to take the first step towards a better you? Sign up now and
            start tracking your habits with ease. It's time to turn your
            aspirations into achievements.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mt-4">
            Join our community of motivated individuals and begin your journey
            of self-improvement. With our habit tracker, a better future is just
            a click away.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
