import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/sessionSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

function HomePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get user's FirtName from global store
    const userFirtName = useAppSelector(
        (state) => state.session.user?.firstName
    );

    const onLogoutclickHandler = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center flex-fill w-100 h-100">
            <div className="container">
                <Title>Welcome {userFirtName}!</Title>
                <div className="row">
                    <div className="col">
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla sodales sit amet nibh sit amet
                            malesuada. Phasellus eget aliquet tortor. Aliquam eu
                            dignissim odio. Suspendisse vel arcu ante. Sed
                            efficitur quam et sem sodales, non eleifend urna
                            ullamcorper. Sed ac tortor semper, viverra leo eget,
                            tempor est. Ut eget dapibus mauris. Nullam
                            consectetur varius bibendum. Suspendisse non felis
                            dolor. Duis tempor eget nisi sed sollicitudin. Orci
                            varius natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus. Integer ut lectus at
                            lacus sodales sodales a hendrerit lacus. Suspendisse
                            arcu ante, iaculis non egestas eu, iaculis eu eros.
                            Maecenas suscipit tellus id ex pharetra, non
                            vulputate mi vestibulum. Curabitur ut pellentesque
                            arcu. Quisque auctor dolor et faucibus venenatis.
                        </Paragraph>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <Link to="/todo-list">
                            <Button type="primary"><UnorderedListOutlined /> Go to Todo list</Button>
                        </Link>
                        <Button
                            danger
                            className="ml-2"
                            onClick={onLogoutclickHandler}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
