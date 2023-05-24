import { Button, Checkbox, Form, Input, Select } from "antd";
import { Todo } from "../types/todo";
import { todoHashtags, todoPriorities } from "../constants/todo";
import { Rule } from "antd/es/form";

interface TodoFormProps {
    todo: Todo | null;
    onSave?: (todo: Todo) => any;
}
const descriptiondRules: Rule[] = [
    { required: true, message: "Description is required" },
];

const durationdRules: Rule[] = [
    { required: true, message: "Duration is required" },
    {
        type: "number",
        min: 1,
        message: "Duration must be greatter than 1",
        transform: (value) => Number(value),
    },
];

function TodoForm(props: TodoFormProps) {
    const onFinish = (todo: Todo) => {
        typeof props.onSave === "function" &&
            props.onSave({ ...todo, _id: props.todo?._id });
    };
    return (
        <Form
            name="todo-form"
            onFinish={onFinish}
            className="container"
            layout="vertical"
            initialValues={
                props.todo ? props.todo : { done: false, priority: 2 }
            }
        >
            <div className="row">
                <Form.Item
                    label="Description"
                    name="description"
                    className="col"
                    rules={descriptiondRules}
                >
                    <Input.TextArea placeholder="Description" />
                </Form.Item>
            </div>

            <div className="row">
                <Form.Item name="priority" className="col" label="Priority">
                    <Select
                        options={todoPriorities}
                        placeholder="Select Priority"
                    />
                </Form.Item>

                <Form.Item
                    name="duration"
                    className="col"
                    label="Duration"
                    rules={durationdRules}
                >
                    <Input type="number" placeholder="Duration (Minutes)" />
                </Form.Item>
            </div>
            <div className="row">
                <Form.Item name="hashtags" className="col" label="Hashtags">
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Select hashtags"
                        options={todoHashtags}
                    />
                </Form.Item>

                <Form.Item
                    name="done"
                    className="col"
                    valuePropName="checked"
                    label="is this done?"
                >
                    <Checkbox>Done</Checkbox>
                </Form.Item>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default TodoForm;
