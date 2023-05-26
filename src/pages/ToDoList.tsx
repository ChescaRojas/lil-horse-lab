import { Button, Card, Modal, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import { Todo } from "../types/todo";
import { ColumnsType } from "antd/es/table";
import { getPriorityByValue } from "../utilities/getPriorityByValue";
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    DeleteFilled,
    EditFilled,
    HomeFilled,
    PlusCircleOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/sessionSlice";

const BASE_TODO_URL =
    "https://crudcrud.com/api/e354f386c2a04441a4cc5a2e8aa7f7b3/todo";

interface TodoDataSource extends Todo {
    key: string;
}

function ToDoListPage() {
    // StatesÍ
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const columns: ColumnsType<TodoDataSource> = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (_, { _id, priority }) => {
                const color =
                    priority === 1
                        ? "geekblue"
                        : priority === 2
                        ? "yellow"
                        : "red";
                return (
                    <Tag color={color} key={`${_id}${priority}`}>
                        {getPriorityByValue(priority)?.label || ""}
                    </Tag>
                );
            },
        },
        {
            title: "Done",
            dataIndex: "done",
            key: "done",
            render: (_, { done }) => {
                return done ? (
                    <CheckCircleFilled style={{ color: "green" }} />
                ) : (
                    <CheckCircleOutlined style={{ color: "gray" }} />
                );
            },
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Hashtags",
            dataIndex: "hashtags",
            key: "hashtags",
            render: (_, { _id, hashtags }) =>
                (hashtags || []).map((hashtag) => (
                    <Tag key={`${_id}${hashtag}`}>{hashtag}</Tag>
                )),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, todo) => (
                <Space size="middle">
                    <Tooltip title="Update">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditFilled />}
                            onClick={() => openTodoModal(todo)}
                        />
                    </Tooltip>

                    <Tooltip title="Delete">
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteFilled />}
                            onClick={() => deleteTodo(todo)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    //   Modal handlers
    const openTodoModal = (todo?: Todo) => {
        if (todo) {
            setCurrentTodo(todo);
        }
        setIsModalOpen(true);
    };

    const resetModal = () => {
        setCurrentTodo(null);
        setIsModalOpen(false);
    };

    const handleError = (e: any) => {};

    /**
     * Creates new todo and add it to the list
     *
     * @param {Todo} newTodo
     */
    const createTodo = async (newTodo: Todo) => {
        // Try to create todo
        const { data: createdTodo } = await axios.post(BASE_TODO_URL, newTodo);
        // Update local list
        setTodoList((prevState) => [...prevState, createdTodo]);
    };

    /**
     * Updates todo and todo list
     *
     * @param {Todo} todo
     */
    const updateTodo = async (todo: Todo) => {
        const { _id, ...body } = todo;

        // Try to create todo
        await axios.put(`${BASE_TODO_URL}/${_id}`, body);
        // Update local list
        setTodoList((prevState) => [
            ...prevState.filter((item) => item._id !== _id),
            todo,
        ]);
    };

    /**
     * Delete specified todo
     *
     * @param {Todo} todo
     */
    const deleteTodo = async (deletedTodo: Todo) => {
        await axios.delete(`${BASE_TODO_URL}/${deletedTodo._id}`);
        setTodoList((prevState) =>
            prevState.filter((todo) => todo._id !== deletedTodo._id)
        );
    };

    /**
     *  Handle modal on save event
     *
     * @param {Todo} todo Specified todo
     */
    const onTodoModalSaveHandler = async (todo: Todo) => {
        try {
            todo._id ? await updateTodo(todo) : await createTodo(todo);
        } catch (e) {
            handleError(e);
        }
        // Reset modal to default
        resetModal();
    };

    useEffect(() => {
        let mounted = true;

        axios.get(`${BASE_TODO_URL}`).then((response) => {
            console.log(response.data);

            if (mounted) {
                setTodoList(response.data);
                setLoading(false);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const onLogoutclickHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="container flex-column justify-content-center align-items-center h-100 pt-5">
            <Card>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to="/home">
                            <Button type="primary">
                                <HomeFilled /> Home{" "}
                            </Button>
                        </Link>
                        <Button
                            danger
                            className="ml-2"
                            onClick={onLogoutclickHandler}
                        >
                            Logout
                        </Button>{" "}
                    </div>

                    <Button onClick={() => openTodoModal()}>
                        <PlusCircleOutlined />
                        New Todo
                    </Button>
                </div>
            </Card>
            <Card className="mt-3">
                <Title>Todo list page</Title>
                <Table
                    pagination={false}
                    loading={loading}
                    columns={columns}
                    bordered
                    scroll={{ x: "max-content" }}
                    dataSource={todoList.map(
                        (todo) =>
                            ({
                                ...todo,
                                key: todo._id || "",
                            } as TodoDataSource)
                    )}
                />
            </Card>

            <Modal
                title={`${currentTodo ? "Update" : "New"} Todo`}
                open={isModalOpen}
                footer={null}
                onCancel={resetModal}
                destroyOnClose={true}
            >
                <TodoForm todo={currentTodo} onSave={onTodoModalSaveHandler} />
            </Modal>
        </div>
    );
}

export default ToDoListPage;
