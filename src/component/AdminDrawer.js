import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input, Form, DatePicker, Select } from 'antd';
import { getApi, postApi } from '../common/common'
import { toast } from 'react-toastify';
const AdminDrawer = () => {
    const dateFormat = 'YYYY/MM/DD';
    const { Option } = Select;
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [users, setUsers] = useState([])

    const [form] = Form.useForm();
    const [taskForm] = Form.useForm();


    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    const handleCreateUser = async (values) => {
        try {
            await postApi("/users/create", values);
            toast.success("user created Successfully");
            form.resetFields();
            onClose();
        } catch (error) {
            toast.error("failed to create user")
        }
    }

    const handleAddTask = async (values) => {
        try {
            await postApi("/details/create", values);
            toast.success("Task Added Successfully");
            taskForm.resetFields();
            onClose();
        } catch (error) {
            toast.error("failed to create user")
        }
    }

    const handleFetchUsers = async () => {
        try {
            const res = await getApi('/users/allUser')
            setUsers(res.data.data)
        } catch (error) {
            toast.error("failed to Fetch user")
        }

    }

    useEffect(() => {
        handleFetchUsers()
    }, [])

    const filteredData = users.filter((u) => u.role === false)


    return (
        <div className='fixed right-4 top-3'>
            <Button className='custom-btn ' onClick={showDrawer}>
                Add User
            </Button>

            <Drawer title="Add Task" size={520} closable={false} onClose={onClose} open={open}>
                <div style={{ marginBottom: 20 }}>
                    <Button type="primary" onClick={showChildrenDrawer}>
                        Add User
                    </Button>
                </div>

                <Form
                    form={taskForm}
                    layout="vertical"
                    onFinish={handleAddTask}
                >
                    <Form.Item
                        label="Link"
                        name="link"
                        rules={[{ required: true, message: "Please enter link" }]}
                    >
                        <Input placeholder="Enter link" name='link' />
                    </Form.Item>

                    <Form.Item
                        label="Client No"
                        name="clientPhNo"
                        rules={[{ required: true, message: "Please enter client no" }]}
                    >
                        <Input placeholder="Enter client phone number" name='clientPhNo' />
                    </Form.Item>


                    <Form.Item
                        label=" Entry Date"
                        name="date"
                        rules={[{ required: true, message: 'Enter A Date!' }]}
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>

                    <Form.Item
                        label="Entry By"
                        name="entryBy"
                        rules={[{ required: true, message: "entryBy Required" }]}
                    >
                        <Input placeholder="ex:kanthaia" name='entryBy' />
                    </Form.Item>

                    <Form.Item
                        label="Received In"
                        name="receivedIn"
                        rules={[{ required: true, message: "receivedIn required" }]}
                    >
                        <Select placeholder="Select receivedIn">
                            <Option value="whatsapp">whatsapp</Option>
                            <Option value="mail">mail</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Client updation Date"
                        name="assignedDate"
                        rules={[{ required: true, message: 'Select a Assigned Date!' }]}
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>

                    <Form.Item
                        label="Task Size"
                        name="taskSize"
                        rules={[{ required: true, message: "taskSize required" }]}
                    >
                        <Select placeholder="Select size">
                            <Option value="Small">small</Option>
                            <Option value="medium">medium</Option>
                            <Option value="large">large</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Developer"
                        name="developer"
                        rules={[{ required: true, message: "Developer required" }]}
                    >
                        <Select placeholder="Select developer">
                            {filteredData.map((user) => <Option value={user?._id}>{user?.name}</Option>)}
                        </Select>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add Task
                        </Button>
                    </Form.Item>
                </Form>
                <Drawer
                    title="Add User"
                    size={320}
                    closable={false}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                >

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateUser}
                    >
                        <Form.Item
                            label="Username"
                            name="name"
                            rules={[{ required: true, message: "Please enter username" }]}
                        >
                            <Input placeholder="Enter username" name='name' />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter password" }]}
                        >
                            <Input.Password placeholder="Enter password" name='password' />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Create User
                            </Button>
                        </Form.Item>
                    </Form>



                </Drawer>
            </Drawer>
        </div>
    );
};
export default AdminDrawer;