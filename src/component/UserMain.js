import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserSideBar from './UserSideBar'
import { IoIosArrowForward } from "react-icons/io";

const UserMain = () => {
    const [toggle, setToggle] = useState(true)

    return (
        <div className="flex">

            <UserSideBar toggle={toggle} setToggle={setToggle} />


            <div className={`flex flex-col w-full min-h-screen bg-color transition-all duration-300 
${toggle ? "ml-64" : "ml-0"}`}>
                {!toggle && <IoIosArrowForward size={50} onClick={() => setToggle(true)} />}

                <main className="flex-1 flex justify-center p-4 ">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default UserMain