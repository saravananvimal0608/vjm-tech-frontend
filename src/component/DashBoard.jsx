import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails, addDetails, deleteDetails } from '../slices/detailsSlice'
import { Button, Drawer, Form, Input } from 'antd'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { datas, loading, error } = useSelector(
    (state) => state.details
  )
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate('/')
    toast.success("Logout Successfully")
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDetails(id))
      dispatch(fetchDetails())
      toast.success('Task deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete Task')
    }
  }
  const handleAdd = async (values) => {
    try {
      await dispatch(addDetails(values));

      setOpen(false);
      form.resetFields();
      dispatch(fetchDetails());
      toast.success('Task added successfully!')
    } catch (error) {
      toast.error('Failed to add Task')
    }
  }

  useEffect(() => {
    dispatch(fetchDetails())
  }, [dispatch])

  const [open, setOpen] = useState(false)

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className='logout-btn'>Logout</button>

      <div className="admin-header mt-5 mt-md-0">
        <h1> {(name && name.charAt(0).toUpperCase() + name.slice(1)) || "User"} Dashboard</h1>
      </div>

      <div className="admin-stats-centered">
        <div className="premium-stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p>{datas?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="user-filter">
        <Button className="add-link-btn" onClick={() => setOpen(true)}>
          Add Task
        </Button>
      </div>

      <Drawer
        title="Add Link"
        placement="right"
        open={open}
        destroyOnClose
        onClose={() => setOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={handleAdd}>
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: 'Please Enter Link!' }]}
          >
            <Input placeholder="Enter Link" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Enter A Date!' }]}
          >
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Drawer>

      <div className="admin-content">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error.message}</p>}

        {datas.length === 0 && !loading ? (
          <p className="loading">No data found</p>
        ) : (
          datas.map((item) => (
            <div className="data-card" key={item?._id}>
              <p>
                <b>Link:</b>{" "}
                <a
                  href={item?.link?.startsWith("http") ? item?.link : `https://${item?.link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item?.link || "No Link"}
                </a>
              </p>

              <p>
                <b>Date:</b>{" "}
                {item?.date ? new Date(item.date).toLocaleDateString("en-GB") : "No Date"}
              </p>

              <Button className="delete-btn" onClick={() => handleDelete(item?._id)}>
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DashBoard
