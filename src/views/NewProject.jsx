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
import {useState, useEffect} from 'react';
import axios from 'axios';

const {TextArea} = Input;
;
const NewProject = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [skill, setSkill] = useState([]);
    const [form] = Form.useForm();
    const [showCreateSkillForm, setShowCreateSkillForm] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleCreateSkill = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/skill/create', values);
            const newSkill = { name: values.name, skill_id: response.data.skill_id };
            console.log(response.data);
            form.resetFields();
            setSkill([...skill, newSkill]);
            setShowCreateSkillForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchSkillNames() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/skill');
                const skill = response.data;
                setSkill(skill);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSkillNames();
    }, []);
    const handleSubmit = async (values) => {

        try {
            const formData = { ...values, skills: selectedSkills };
            console.log(values)
            const response = await axios.post('http://localhost:8080/api/v1/project/create', formData);
            console.log(response.data);
            form.resetFields();
            setIsModalVisible(true);
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

    return (
        <>
            <Checkbox className="mt-5"
                      checked={componentDisabled}
                      onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>
            <Form
                disabled={componentDisabled}>
                <Form.Item
                    label="Skills"
                    name="skills"
                    valuePropName="checked"
                    className="mt-3"
                >
                    <Checkbox.Group style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}
                                    onChange={handleCheckboxChange}>
                        {skill.map((skill) => (
                            <Checkbox key={skill.id} value={skill.name} className="mb-2">
                                {skill.name}
                            </Checkbox>
                        ))}

                    </Checkbox.Group>
                </Form.Item>
            </Form>

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
                    disabled={componentDisabled}
                >
                    <Form.Item label="Name" name="name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
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

                    <Button type="dashed" onClick={() => setShowCreateSkillForm(true)} className="mb-5 ml-10">Add new
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

                <Form.Item label="Type" name="project_type">
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

