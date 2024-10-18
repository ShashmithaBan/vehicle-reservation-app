import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="text-4xl flex justify-center align-middle h-[100%]">
        <div className="p-12 rounded text-8xl  mt-44">
          <h1 className="font-mono font-bold text-[10rem]">Welcome</h1>
          <p>to <span className="font-mono text-green-500">VR</span> app</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
