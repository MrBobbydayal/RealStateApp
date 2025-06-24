import React from "react";

function Loader() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10">
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[450px]">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-t-[#00e600] border-gray-700 rounded-full animate-spin mx-auto"></div>
          <div className="text-[#00e600] font-semibold text-2xl sm:text-3xl md:text-4xl opacity-90 animate-fadeIn">
            Almost There...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
