import React from "react";

export default function ItemCounterInDashboard( { name, counter, color } ) {
 
  return (
    <div
      className={`bg-white px-3 py-3 pb-4 rounded-lg shadow-sm`}
      style={{ border: `3px solid ${color}` }}
    >
      <div className="flex justify-start items-center">
        <p className="text-2xl font-semibold">{name}</p>
      </div>
      <div className="flex justify-end items-center">
        <p className="text-slate-500 text-[35px]">{counter}</p>
      </div>
    </div>
  );
}
