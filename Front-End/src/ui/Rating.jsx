import React from "react";
import { MdStarHalf } from "react-icons/md";
export default function Rating(props) {

    if ( props.rating === "0" )
   
    return (
      <div className="flex ">
        <MdStarHalf fill="#dcdccc" size={props.size} />
        <MdStarHalf fill="#dcdccc" size={props.size} />
        <MdStarHalf fill="#dcdccc" size={props.size} />
        <MdStarHalf fill="#dcdccc" size={props.size} />
        <MdStarHalf fill="#dcdccc" size={props.size} />
      </div>
    );
    if (props.rating === "1")
      return (
        <div className="flex ">
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
        </div>
      );
    if (props.rating === "2")
      return (
        <div className="flex ">
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
        </div>
      );
    if (props.rating === "3")
      return (
        <div className="flex ">
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size}/>
        </div>
      );
    if (props.rating === "4")
      return (
        <div className="flex ">
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#dcdccc" size={props.size} />
        </div>
      );
    if (props.rating === "5")
      return (
        <div className="flex ">
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
          <MdStarHalf fill="#ffc908" size={props.size} />
        </div>
      );
}
