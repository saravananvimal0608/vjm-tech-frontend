import React from 'react';
import { Form, Input, Button } from 'antd';
import { postApi } from '../common/common';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../common/getAdmin'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const res = await postApi("/users/login", values);
            localStorage.setItem("name", res.data.data);
            const token = res.data.token;
            localStorage.setItem("token", token);
            toast.success(res.data.message || "Login Success");

            //checking role based navigate
            const role = parseJwt(token)

            if (!role?.role) {
                navigate("/dashboard");
            }
            else {
                navigate("/admin")
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>
                <Form
                    name="login"
                    className="login-form"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input className="login-input" placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password className="login-input" placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
