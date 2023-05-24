import { Button, Card, Input, notification } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/sessionSlice";
import { useNavigate } from "react-router-dom";
import Form, { Rule } from "antd/es/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const BASE_LOGIN_URL =
    "https://dev-api.contender-logistics.draketechdev.ca/api/auth/login";

const emailRules: Rule[] = [
    { required: true, message: "Email is required" },
    { type: "email", message: "Please enter a valid email" },
];

const passwordRules: Rule[] = [
    { required: true, message: "Password is required" },
];

interface LoginForm {
    email: string;
    password: string;
}

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const erroHandler = (message?: string) => {
        api.error({
            message: "Login Error",
            description: message || "Unknown error",
            placement: "topRight",
        });
    };

    const onFinishHandler = async (loginForm: LoginForm) => {
        try {
            //  Try to authenticate the user
            const { data: sessionState } = await axios.post(
                BASE_LOGIN_URL,
                loginForm
            );
            //  Save session information to global state
            dispatch(login(sessionState));
            //  Redirect the user to home page
            navigate("/home");
        } catch (error: any) {
            erroHandler(error?.response?.data?.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center flex-fill w-100 h-100">
            <Card
                title={<h1 className="text-center">Login</h1>}
                style={{ width: 360 }}
            >
                <Form name="login-form" onFinish={onFinishHandler}>
                    <Form.Item name="email" rules={emailRules}>
                        <Input
                            type="email"
                            prefix={<UserOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item name="password" rules={passwordRules}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {contextHolder}
        </div>
    );
}

export default LoginPage;
