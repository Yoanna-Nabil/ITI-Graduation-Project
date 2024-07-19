import React from "react";
import { MdStarHalf } from "react-icons/md";
import { useSearch } from "../Componenets/context/SearchContext";
export default function RatingAsign(props) {
  const { signRate, setSignRate } = useSearch();
  if (signRate === 0)
    return (
      <div className="flex">
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(1)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
  if (signRate === 1)
    return (
      <div className="flex">
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
  if (signRate === 2)
    return (
      <div className="flex ">
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(1)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
  if (signRate === 3)
    return (
      <div className="flex ">
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(1)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
  if (signRate === 4)
    return (
      <div className="flex ">
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(1)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#dcdccc"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
  if (signRate === 5)
    return (
      <div className="flex ">
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(1)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(2)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(3)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(4)}
        />
        <MdStarHalf
          fill="#ffc908"
          size={props.size}
          onClick={() => setSignRate(5)}
        />
      </div>
    );
}
