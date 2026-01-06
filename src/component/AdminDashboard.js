import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allData } from '../slices/detailsSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AdminDashboard = () => {
    const navigate = useNavigate();

    /* REDUX SETUP */
    const dispatch = useDispatch()

    // Get data, loading & error from Redux store
    const { datas, loading, error } = useSelector((state) => state.details)

    // Store selected user id for filtering
    const [selectedUserId, setSelectedUserId] = useState(null)

    /* FETCH ALL DATA */
    useEffect(() => {
        dispatch(allData())
    }, [dispatch])

    /* SHOW ERROR TOAST */
    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Failed to load data')
        }
    }, [error])

    /* FILTER HANDLER */
    const handleFilter = (userId) => {
        setSelectedUserId(userId)
        toast.info(userId ? 'Filter applied' : 'Showing all data')
    }

    // If user selected → show only that user's data
    // Else → show all data
    const filteredDatas = selectedUserId
        ? datas.filter(item => item?.userId?._id === selectedUserId)
        : datas

    // Remove duplicate users using Map
    const uniqueUsers = [
        ...new Map(
            datas.map(item => [item.userId._id, item.userId])
        ).values()
    ]
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate('/')
        toast.success("Logout Success")
    }
    return (
        <div className="admin-container">
            <button onClick={handleLogout} className='logout-btn'>logout</button>

            <div className="admin-header mt-5 mt-md-0">
                <h1>Admin Dashboard</h1>

            </div>

            <div className="admin-stats-centered">
                <div className="premium-stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-info">
                        <h3>Pending Tasks</h3>
                        {/* Count changes based on filter */}
                        <p>{filteredDatas?.length || 0}</p>
                    </div>
                </div>
            </div>

            {/* ---------- USER FILTER ---------- */}
            <div className="user-filter">
                <h3>Filter By Name</h3>
                {/* Show all data */}
                <p onClick={() => setSelectedUserId(null)}>
                    All
                </p>

                {/* Show unique users */}
                {uniqueUsers.map(user => (
                    <p
                        key={user._id}
                        onClick={() => handleFilter(user._id)}
                    >
                        {user.name}
                    </p>
                ))}
            </div>

            <div className="admin-content">

                {/* Loading state */}
                {loading && <p className="loading">Loading...</p>}

                {/* Error state */}
                {error && <p className="error">{error.message}</p>}

                {/* Empty state */}
                {!loading && filteredDatas.length === 0 && (
                    <p className="loading">No tasks found</p>
                )}

                {filteredDatas.map((item) => (
                    <div className="data-card" key={item?._id}>
                        <p>
                            <b>Link:</b>{" "}
                            {typeof item?.link === "string" ? (
                                <a
                                    href={
                                        item.link.startsWith("http")
                                            ? item.link
                                            : `https://${item.link}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.link}
                                </a>
                            ) : (
                                "Invalid Link"
                            )}
                        </p>


                        <p>
                            <b>Date:</b>{" "}
                            {item?.date && !isNaN(new Date(item.date))
                                ? new Date(item.date).toLocaleDateString("en-GB")
                                : "Invalid Date"}
                        </p>

                        <p>
                            <b>User:</b> {item?.userId?.name || "No User"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminDashboard
