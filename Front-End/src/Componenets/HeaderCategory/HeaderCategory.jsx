import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllCategory } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderCategory.module.css";
import ScrollReveal from "scrollreveal";
export default function HeaderCategory() {
  const navigate = useNavigate();
  const { data } = useQuery("getAllCategory", getAllCategory);
  useEffect(() => {
    const scrollRevealOption = {
      distance: "100px",
      origin: "top",
      duration: 1000,
    };
    for (let i = 0; i < data?.data?.data?.length; i++) {
      ScrollReveal().reveal(`#cat${i}`, {
        ...scrollRevealOption,
        origin: i % 2 === 0 ? "bottom" : "top",
      });
    }
  }, [data?.data?.data?.length]);
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex justify-center text-[90px] items-center w-full mt-5">
        <h2 className="text-[40px]  text-red-500 font-bold">Category</h2>
      </div>
      <div className={`${styles.imageContainer} my-5`}>
        {data?.data?.data?.map((category, index) => (
          <div
            className={`${styles.category} cursor-pointer`}
            key={category?._id}
            onClick={() =>
              navigate(`/category/${category?._id}`, {
                state: {
                  name: category?.name,
                },
              })
            }
            id={`cat${index}`}
          >
            <img
              src={category?.icon}
              alt={`${category?.name} category`}
              className={styles.largeRoundedImg}
            />
            <h6 className='text-red-500 font-semibold'>{category?.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
