import React from "react";
import Home from "./pages/home";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-6 bg-blue-600 text-white text-center text-3xl font-bold">
        News App
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
};

export default App;
