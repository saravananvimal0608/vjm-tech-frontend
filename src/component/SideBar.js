import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

import vjmLogo from '../assets/vjm.avif'

const SideBar = ({ toggle, setToggle }) => {
    const navigate = useNavigate()
    const handleSignout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }


    return (
        <div className={`fixed top-0 h-screen w-64 bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 
${toggle ? "left-0" : "-left-[300px]"}`}>


            <ul className='flex flex-col p-4 space-y-2'>
                <li className='flex items-center'>
                    <img
                        src={vjmLogo}
                        alt="logo"
                        className="w-[90%] h-[60px] object-cover"
                    />
                    <IoIosArrowBack size={40} onClick={() => setToggle(false)} />
                </li>

                <li>
                    <NavLink to='/admin' end className={({ isActive }) => `block p-3 rounded hover:bg-gray-700 transition-colors ${isActive ? "active" : ""}`}>
                        DashBoard
                    </NavLink>

                </li>

                <li>
                    <NavLink to='/admin/completed-tasks' className={({ isActive }) => `block p-3 rounded hover:bg-gray-700 transition-colors ${isActive ? "active" : ""}`}>
                        Completed Tasks
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/admin/pending-tasks' className={({ isActive }) => `block p-3 rounded hover:bg-gray-700 transition-colors ${isActive ? "active" : ""}`}>
                        Pending Tasks
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/admin/launch-pending-tasks' className={({ isActive }) => `block p-3 rounded hover:bg-gray-700 transition-colors ${isActive ? "active" : ""}`}>
                        Launch Pending Tasks
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/admin/all-users' className={({ isActive }) => `block p-3 rounded hover:bg-gray-700 transition-colors ${isActive ? "active" : ""}`}>
                        All Users
                    </NavLink>
                </li>
            </ul>

            <button className='block p-3 rounded hover:bg-gray-700 transition-colors' onClick={handleSignout}>

                Sign Out

            </button>
        </div>
    )
}

export default SideBar