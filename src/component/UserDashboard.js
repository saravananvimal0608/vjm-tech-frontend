import React, { useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { AiFillCheckCircle, AiFillClockCircle } from "react-icons/ai";
import { RiRocketLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../slices/detailsSlice";


const UserDashboard = () => {
    // const role = loca
    const { datas } = useSelector(
        (state) => state.details
    )
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchDetails())
    }, [dispatch])


    const completedTask = datas?.filter((d) => d.completed === true)
    const pendingTask = datas?.filter((d) => d.completed === false && d.launchPending === false)
    const LaunchPendingTask = datas?.filter((d) => d.launchPending === true)


    return (
        <div className="flex w-full gap-4 flex-wrap  ">

            <div className="total-task-wrapper flex-1">
                <div className="content">
                    <p>Total Tasks</p>
                    <p>Count : {datas.length}</p>
                </div>
                <FaTasks className="icons" />
            </div>

            <div className="total-task-wrapper pending-task flex-1">
                <div className="content">
                    <p>Completed Tasks</p>
                    <p>Count : {completedTask.length}</p>
                </div>
                <AiFillCheckCircle className="icons" />
            </div>

            <div className="total-task-wrapper completed-task flex-1">
                <div className="content">
                    <p>Pending Tasks</p>
                    <p>Count : {pendingTask.length}</p>
                </div>
                <AiFillClockCircle className="icons" />
            </div>

            <div className="total-task-wrapper launch-task flex-1">
                <div className="content">
                    <p>Launch Pending Tasks</p>
                    <p>Count : {LaunchPendingTask.length}</p>
                </div>
                <RiRocketLine className="icons" />
            </div>

        </div>

    );
};

export default UserDashboard;
