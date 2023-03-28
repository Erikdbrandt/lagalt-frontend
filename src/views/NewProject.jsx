import {CheckSquareFilled, PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Switch,
    Upload,
    Space,
    Select
} from 'antd';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useUser} from "../components/context/UserContext";
import {useNavigate} from 'react-router-dom';
import '../index.css';

const {TextArea} = Input;

const NewProject = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [form] = Form.useForm();
    const [showCreateSkillForm, setShowCreateSkillForm] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const {user} = useUser();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [skill, setSkill] = useState([]);

    const createSkillInForm = async (values) => {

        try {
            const response = await axios.post('http://localhost:8080/api/v1/skill/create', values);
            const newSkill = {
                name: values.name,
                skill_id: response.data.skill_id,
            };
            console.log(response.data);
            form.resetFields();
            setSkill([...skill, newSkill]);
            setShowCreateSkillForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchSkill() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/skill');
                const skill = response.data;
                setSkill(skill);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSkill();
    }, []);
    const handleSubmit = async (values) => {

        try {
            console.log(user)
            const formData = {...values, skills: selectedSkills, owner: user.user_id, participants: [user.user_id]};
            console.log(formData)
            const response = await axios.post('http://localhost:8080/api/v1/project/create', formData);
            console.log(response.data);
            form.resetFields();

            setTimeout(function () {
                navigate(`/project/${response.data.project_id}`);
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (checkedValues) => {
        const selectedSkillIds = checkedValues.map((skillName) => {
            const selectedSkill = skill.find((s) => s.name === skillName);
            return selectedSkill ? selectedSkill.skill_id : null;
        });
        setSelectedSkills(selectedSkillIds);
    };
    const handleCancel = () => {
        setShowCreateSkillForm(false);
    };

    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showPopup, navigate]);

    function handleCreate() {
        setShowPopup(true);
    }

    return (
        <>
            <h1 className="text-page my-8">Create a project</h1>
            <Checkbox className="mt-5"
                      checked={componentDisabled}
                      onChange={(e) => setComponentDisabled(e.target.checked)}
                      className="text2 mt-3"
            >
                Form disabled
            </Checkbox>
            <Form
                disabled={componentDisabled}
           >
                <Form.Item
                    label={
                        <span className="text">Skills</span>
                    }
                    name="skills"
                    valuePropName="checked"
                    className="text2 mt-3"
                >
                    <Checkbox.Group style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}
                                    onChange={handleCheckboxChange}>
                        {skill.map((skill) => (
                            <Checkbox className="text2" key={skill.id} value={skill.name} className="mb-2">
                                {skill.name}
                            </Checkbox>
                        ))}

                    </Checkbox.Group>
                </Form.Item>
            </Form>

            {showCreateSkillForm ? (
                <Form
                    onFinish={createSkillInForm}
                    name="wrap"
                    labelCol={{flex: '110px'}}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{flex: 1}}
                    colon={false}
                    style={{maxWidth: 600}}
                    disabled={componentDisabled}
                >
                    <Form.Item label="Name" className="text2" name="name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Description" className="text2" name="description">
                        <Input/>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button htmlType="submit" className="mr-4">
                            Submit
                        </Button>
                        <Button htmlType="submit" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Space wrap className="mt-1">

                    <Button type="dashed" onClick={() => setShowCreateSkillForm(true)} className="text2 mb-5 ml-10">Add new
                        skill</Button>
                </Space>
            )}

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

                <Form.Item label={
                    <span className="text">Type</span>
                } name="project_type">
                    <Radio.Group>
                        <Radio  className="text2" value="MOVIE"> MOVIE </Radio>
                        <Radio  className="text2" value="MUSIC"> MUSIC </Radio>
                        <Radio  className="text2" value="WEB DEVELOPMENT"> WEB DEVELOPMENT </Radio>
                        <Radio  className="text2" value="GAME DEVELOPMENT"> GAME DEVELOPMENT </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={
                    <span className="text">Title</span>
                } name="title" rules={[{required: true, message: 'Please enter a title',},]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={
                    <span className="text">Theme</span>
                } name="theme">
                    <Input/>
                </Form.Item>
                <Form.Item label={
                    <span className="text">Description</span>
                } name="description">
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item label={
                    <span className="text">Status</span>
                } name="project_status">
                    <Select>
                        <Select.Option value="FOUNDING">FOUNDING</Select.Option>
                        <Select.Option value="IN_PROGRESS">IN_PROGRESS</Select.Option>
                        <Select.Option value="STALLED">STALLED</Select.Option>
                        <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={
                    <span className="text">Upload</span>
                } valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div
                                className="text2 mt-8"
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" onClick={handleCreate} className="btn">Create</Button>
                </Form.Item>

                {showPopup ? (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5">
                        <div className="bg-white w-1/3 h-1/3 rounded-md flex flex-col justify-center items-center p-1">
                            <p className="text-2xl p-5">Project is created!</p>

                            <CheckSquareFilled style={{color: '#8fbc8f', fontSize: '50px'}}/>

                        </div>
                    </div>
                ) : null}
            </Form>
        </>
    );
};
export default () => <NewProject/>;