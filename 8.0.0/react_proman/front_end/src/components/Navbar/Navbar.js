import React from "react";
import avatar from "../../data/image/avatar.jpg";

const Navbar = ({ props }) => {
  return (
    <div className="flex justify-between">
      <div className="h-[80px] ">
        <i class="fa-solid fa-bars"></i>
        <span> Admin </span>
        <i class="fa-solid fa-chevron-right"></i>
        <span> Client </span>
      </div>
      <div className="flex">
        <div className="w-[60px] h-[60px] ">
          <img src={avatar} className="rounded-full" />
        </div>
        <div>
          <h3> Dương Đỗ</h3>
          <h3> DuongnoDo@gmail.com </h3>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
