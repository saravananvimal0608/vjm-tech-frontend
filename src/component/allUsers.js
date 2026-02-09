import React, { useEffect, useState } from 'react'
import { deleteApi, getApi } from '../common/common.js'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";

const TableComponent = () => {
    const [users, setUsers] = useState([])
    const [deleteToggle, setDeleteToggle] = useState(false)
    const [selectDeleteId, setSelectDeleteId] = useState(null)

    const handleFetch = async () => {
        try {
            const res = await getApi('/users/allUser')
            setUsers(res.data.data)
        } catch (error) {
            toast.error("User not found")
        }
    }


    const handleDelete = async () => {
        try {
            await deleteApi(`/users/delete/${selectDeleteId._id}`)
            setDeleteToggle(false)
            setSelectDeleteId(null)
            handleFetch()
            toast.success("user deleted successfully")

        } catch (error) {
            toast.error("user not deleted")
        }


    }

    useEffect(() => {
        handleFetch()
    }, [])

    const filteredData = users.filter((u) => u.role === false)

    return (
        <div className="w-full">

            {deleteToggle && <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                <div className="bg-popup w-[320px] p-6 rounded-2xl shadow-xl flex flex-col items-center text-center gap-4">

                    <h1 className="text-xl font-semibold text-gray-800">
                        Delete User
                    </h1>

                    <p className="-500">
                        Are you sure you want to delete {selectDeleteId?.name}?
                    </p>

                    <div className="flex gap-4 mt-3 w-full">

                        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={handleDelete}>
                            Yes
                        </button>

                        <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-200" onClick={() => setDeleteToggle(false)}>
                            No
                        </button>

                    </div>

                </div>

            </div>
            }

            <div className="admin-stats-centered">
                <div className="premium-stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <h3>Total Users</h3>
                        <p>{filteredData?.length || 0}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.length === 0 ? (
                    <p className="loading title-color">No data found</p>
                ) : (
                    filteredData.map((item) => (
                        <div className="data-card" key={item?._id}>
                            <p>
                                <b>Name : {item?.name}</b>{" "}

                            </p>

                            <p>
                                <b>Role : Developer</b>
                            </p>
                            <p className='flex'><b>Action :</b> <MdDelete size={25} onClick={() => {
                                setSelectDeleteId(item)
                                setDeleteToggle(true)
                            }} /></p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default TableComponent
