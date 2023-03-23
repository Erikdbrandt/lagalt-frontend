import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Switch,
    Upload,
    Space,
    Modal
} from 'antd';
import {useState, useEffect } from 'react';
import axios from 'axios';

const {TextArea} = Input;
;
const NewProject = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [skill, setSkill] = useState([]);
    const [form] = Form.useForm();
    const [showCreateSkillForm, setShowCreateSkillForm] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateSkill = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/skill/create', values);
            console.log(response.data);
            form.resetFields();
            setSkill([...skill, values.name]);
            setShowCreateSkillForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchSkillNames() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/skill');
                const skillNames = response.data.map(skill => skill.name);
                setSkill(skillNames);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSkillNames();
    }, []);
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/project/create', values);
            console.log(response.data);
            form.resetFields();
            setIsModalVisible(true);

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

            <div className="mt-3">
                <Form.Item
                    label="Skills"
                    name="skills"
                    valuePropName="checked"
                >

                    <Checkbox.Group style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {skill.map(skillName => (
                            <Checkbox key={skillName} value={skillName} className="mb-2">
                                {skillName}
                            </Checkbox>
                        ))}

                    </Checkbox.Group>

                    <div className="mt-5">
                        {showCreateSkillForm ? (
                            <Form
                                onFinish={handleCreateSkill}
                                name="wrap"
                                labelCol={{flex: '110px'}}
                                labelAlign="left"
                                labelWrap
                                wrapperCol={{flex: 1}}
                                colon={false}
                                style={{maxWidth: 600}}
                            >
                                <Form.Item label="Name" name="name" rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <Input/>
                                </Form.Item>

                                <Form.Item label=" ">
                                    <Button htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <Space wrap className="mt-3">

                                <Button type="dashed" onClick={() => setShowCreateSkillForm(true)}>Add new
                                    skill</Button>
                            </Space>
                        )}
                    </div>
                </Form.Item>
            </div>
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
                <Form.Item label="Description" name="description">
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item label="Status" valuePropName="checked">
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
                <Modal
                    title="Project Created"
                    visible={isModalVisible}
                    onOk={() => {
                        setIsModalVisible(false);
                    }}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <p>The project has been successfully created.</p>
                </Modal>
            </Form>
        </>
    );
};
export default () => <NewProject/>;