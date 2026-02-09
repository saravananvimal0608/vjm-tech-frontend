import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import AdminDrawer from "./AdminDrawer";
import { IoIosArrowForward } from "react-icons/io";

const AdminMain = () => {
    const [toggle, setToggle] = useState(true)
    return (
        <div className="flex">

            <SideBar toggle={toggle} setToggle={setToggle} />


            <div className={`flex flex-col w-full min-h-screen bg-color transition-all duration-300 
${toggle ? "ml-64" : "ml-0"}`}>
                {!toggle && <IoIosArrowForward size={50} onClick={() => setToggle(true)} />}
                <nav className="h-14 text-center pt-6 ">
                    <h1 className="text-2xl font-bold title-color">
                        Admin Control Panel
                    </h1>


                </nav>

                <AdminDrawer />

                <main className="flex-1 flex justify-center p-4">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminMain;
