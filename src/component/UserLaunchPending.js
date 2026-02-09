import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails, updateDetails } from '../slices/detailsSlice'
import { Button, Form, Select } from 'antd'
import { toast } from 'react-toastify'

const UserLaunchPending = () => {
    const dispatch = useDispatch()

    const { datas, loading, error } = useSelector(
        (state) => state.details
    )
    const name = localStorage.getItem("name");


    const handleUpdate = async (id, values) => {
        try {
            await dispatch(updateDetails({ id, values })).unwrap()
            toast.success("Task updated successfully")
            dispatch(fetchDetails())
        } catch (err) {
            toast.error("Failed to update task")
        }
    }


    useEffect(() => {
        dispatch(fetchDetails())
    }, [dispatch])

    console.log(datas, "launch");



    const filteredData = datas.filter((d) => d.launchPending === true)

    return (
        <div className="w-full">



            <div className="admin-header mt-5 mt-md-0">
                <h1 className='title-color'> {(name && name.charAt(0).toUpperCase() + name.slice(1)) || "User"} Launch Pending Tasks</h1>
            </div>

            <div className="admin-stats-centered">
                <div className="premium-stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <h3>Launch Pending Tasks</h3>
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
                                <b>Link : </b>{" "}
                                <a
                                    href={item?.link?.startsWith("http") ? item?.link : `https://${item?.link}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item?.link || "No Link"}
                                </a>
                            </p>

                            <p>
                                <b>Entry Date : </b>{" "}
                                {item?.date ? new Date(item.date).toLocaleDateString("en-GB") : "----"}
                            </p>
                            <p>
                                <b>Client Updation Date : </b>{" "}
                                {item?.assignedDate ? new Date(item.assignedDate).toLocaleDateString("en-GB") : "----"}
                            </p>

                            <p>
                                <b>Client Ph : {item?.clientPhNo ? item?.clientPhNo : "----"}</b>
                            </p>

                            <p>
                                <b>Task Status : {item?.completed ? "Completed" : item?.launchPending ? "Launch Pending" : "Pending Task"}</b>
                            </p>

                            <p>
                                <b>Received In : {item?.receivedIn ? item?.receivedIn : "----"}</b>
                            </p>

                            <p>
                                <b>Task Size : {item?.taskSize ? item?.taskSize : "----"}</b>
                            </p>






                            <Form className="w-[200px]"
                                layout="vertical"
                                initialValues={{
                                    receivedIn: item.completed
                                        ? "completed"
                                        : item.launchPending
                                            ? "launchPending"
                                            : "pending"
                                }}
                                onFinish={(values) => handleUpdate(item._id, values)}
                            >
                                <Form.Item
                                    label="Task Status"
                                    name="receivedIn"
                                    rules={[{ required: true, message: "Status required" }]}
                                >
                                    <Select placeholder="Select status">
                                        <Select.Option value="pending">Pending</Select.Option>
                                        <Select.Option value="completed">Completed</Select.Option>
                                        <Select.Option value="launchPending">Launch Pending</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Button type="primary" htmlType="submit">Update</Button>
                            </Form>


                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default UserLaunchPending
