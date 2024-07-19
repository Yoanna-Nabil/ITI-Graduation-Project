import React from "react";
export default function Avatar({ name, width }) {
  let nameSplit = name;
  if (name) {
    nameSplit = name.split(" ");
  }

  if (nameSplit?.length > 1) {
    nameSplit = nameSplit[0][0].toUpperCase() + nameSplit[1][0].toUpperCase();
  } else if (nameSplit?.length === 1) {
    nameSplit = nameSplit[0][0].toUpperCase();
  }

  return (
    <div className="mb-3 ">
      <div
        className={`bg-slate-100 text-gray-700 flex items-center justify-center rounded-full text-center font-semibold shadow-md`}
        style={{ width: width, height: width }}
      >
        {nameSplit}
      </div>
    </div>
  );
}
