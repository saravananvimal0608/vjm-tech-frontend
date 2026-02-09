import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails, updateDetails } from '../slices/detailsSlice'
import { Button, Form, Select } from 'antd'
import { toast } from 'react-toastify'

const UserCompletedTask = () => {

    const dispatch = useDispatch()

    const { datas, loading, error } = useSelector(
        (state) => state.details
    )

    const name = localStorage.getItem("name");

    useEffect(() => {
        dispatch(fetchDetails())
    }, [dispatch])

    const handleUpdate = async (id, values) => {
        try {
            await dispatch(updateDetails({ id, values })).unwrap()
            toast.success("Task updated successfully")
            dispatch(fetchDetails())
        } catch (err) {
            toast.error("Failed to update task")
        }
    }

    const filteredData = datas.filter((d) => d.completed === true)

    return (
        <div className="w-full">

            <div className="admin-header mt-5">
                <h1 className='title-color'>
                    {(name && name.charAt(0).toUpperCase() + name.slice(1)) || "User"} Completed Tasks
                </h1>
            </div>

            <div className="admin-stats-centered">
                <div className="premium-stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <h3>Completed Tasks</h3>
                        <p>{filteredData?.length || 0}</p>
                    </div>
                </div>
            </div>

            <div className="admin-content">

                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error.message}</p>}

                {filteredData.length === 0 && !loading ? (
                    <p className="loading title-color">No data found</p>
                ) : (
                    filteredData.map((item) => (
                        <div className="data-card" key={item?._id}>

                            <p>
                                <b>Link : </b>
                                <a
                                    href={item?.link?.startsWith("http")
                                        ? item?.link
                                        : `https://${item?.link}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item?.link || "No Link"}
                                </a>
                            </p>

                            <p>
                                <b>Entry Date : </b>
                                {item?.date
                                    ? new Date(item.date).toLocaleDateString("en-GB")
                                    : "----"}
                            </p>

                            <p>
                                <b>Client Updation Date : </b>
                                {item?.assignedDate
                                    ? new Date(item.assignedDate).toLocaleDateString("en-GB")
                                    : "----"}
                            </p>

                            <p>
                                <b>Client Ph : </b>
                                {item?.clientPhNo || "----"}
                            </p>

                            <p>
                                <b>Task Status : </b>
                                {item.completed
                                    ? "Completed"
                                    : item.launchPending
                                        ? "Launch Pending"
                                        : "Pending"}
                            </p>

                            <p>
                                <b>Received In : </b>
                                {item?.receivedIn || "----"}
                            </p>

                            <p>
                                <b>Task Size : </b>
                                {item?.taskSize || "----"}
                            </p>

                            {/* ✅ Update Form */}
                            <Form
                                className="w-[220px] mt-3"
                                layout="vertical"
                                initialValues={{
                                    receivedIn: item.completed
                                        ? "completed"
                                        : item.launchPending
                                            ? "launchPending"
                                            : "pending"
                                }}
                                onFinish={(values) =>
                                    handleUpdate(item._id, values)
                                }
                            >
                                <Form.Item
                                    label="Update Status"
                                    name="receivedIn"
                                    rules={[
                                        { required: true, message: "Status required" }
                                    ]}
                                >
                                    <Select>
                                        <Select.Option value="pending">
                                            Pending
                                        </Select.Option>
                                        <Select.Option value="completed">
                                            Completed
                                        </Select.Option>
                                        <Select.Option value="launchPending">
                                            Launch Pending
                                        </Select.Option>
                                    </Select>
                                </Form.Item>

                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form>

                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default UserCompletedTask
