import React from 'react'
import { FaLightbulb } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
const Navbar = () => {
    return (
        <>
            <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800">
                <div className="logo">
                    <h3 className="text-[25px] font-[700] sp-text ">
                        NEX UI
                    </h3>
                </div>
                <div className="icons flex item-center gap-[15px]">
                    <div className="icon">
                        <FaLightbulb />
                    </div>
                    <div className="icon">
                        <IoSettings />
                    </div>
                    <div className="icon">
                        <FaUserLarge />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
