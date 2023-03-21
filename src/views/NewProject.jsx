import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
    Upload,
} from 'antd';
import {useState} from 'react';
import {Modal} from 'antd';
import axios from 'axios';

const {RangePicker} = DatePicker;
const {TextArea} = Input;
const {confirm} = Modal;
const NewProject = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/project/create', values);
            console.log(response.data); // do something with the response
            form.resetFields(); // clear the form fields
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Checkbox className="mt-5"
                      checked={componentDisabled}
                      onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>
            <Form
                onFinish={handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Skills" name="disabled" valuePropName="checked" className="mt-5">
                    <div>
                        <Checkbox>Java</Checkbox>
                        <Checkbox>JavaScript</Checkbox>
                        <Checkbox>React</Checkbox>
                    </div>
                </Form.Item>
                <Form.Item label="Type">
                    <Radio.Group>
                        <Radio value="MOVIE"> MOVIE </Radio>
                        <Radio value="MUSIC"> MUSIC </Radio>
                        <Radio value="WEB DEVELOPMENT"> WEB DEVELOPMENT </Radio>
                        <Radio value="GAME DEVELOPMENT"> GAME DEVELOPMENT </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Title" name="title" rules={[{required: true, message: 'Please enter a title',},]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Theme" name="theme">
                    <Input/>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="RangePicker">
                    <RangePicker/>
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <NewProject/>;