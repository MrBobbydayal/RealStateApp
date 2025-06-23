import React from "react";
function Loader(){
return(
<div
  class="mx-auto w-[600px]  rounded-xl overflow-hidden drop-shadow-2xl mr-28"
>
  <div class="flex  p-8 justify-center items-center h-[450px]">
    <div class="text-center space-y-6">
      <div
        class="w-24 h-24 border-4 border-t-[#00e600] border-gray-700 rounded-full animate-spin mx-auto"
      ></div>
      <div
        class="text-[#00e600] font-semibold text-4xl opacity-90 animate-fadeIn"
      >
        Almost There...
      </div>
    </div>
  </div>
</div>

)
}
export default Loader