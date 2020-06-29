import {Button, Divider, Form, Input, Radio, Select} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "./RegisterForm.less";
import React from "react";
import RegisterNewMunicipality from "./RegisterNewMunicipality";
import RegisterNewSupplier from "./RegisterNewSupplier";

const {Option} = Select;

export default class RegisterForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userType: 'municipality',
            userTypeOption: 'existing',
        }
    }

    async onSelectUserType(userType) {
        await this.setState({
            userType: userType.target.value
        });
    }

    async onSelectUserTypeOption(userTypeOption) {
        await this.setState({
            userTypeOption: userTypeOption.target.value
        });
    }

    renderUserTypeOptions() {
        let typeNew;
        let typeExist;
        if (this.state.userType === 'municipality') {
            typeNew = "Neue Gemeinde";
            typeExist = "Bestehende Gemeinde";
        } else {
            typeNew = "Neuer Anbieter";
            typeExist = "Bestehender Anbieter";
        }
        return (
            <Radio.Group
                defaultValue="existing"
                onChange={this.onSelectUserTypeOption.bind(this)}>
                <Radio.Button value="new">{typeNew}</Radio.Button>
                <Radio.Button value="existing">{typeExist}</Radio.Button>
            </Radio.Group>
        )
    }

    renderUserTypeSpecificForm() {
        if (this.state.userType === 'municipality' && this.state.userTypeOption === 'new') {
            return (<RegisterNewMunicipality/>);
        } else if (this.state.userType === 'municipality' && this.state.userTypeOption === 'existing') {
            return (
                <Form.Item
                    name={["municipality", "_id"]}
                    rules={[
                        {
                            required: true,
                            message: 'Bitte wählen Sie eine der registrierten Gemeinden!',
                        }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Wählen Sie eine Gemeinde">
                        {
                            this.props.municipalities.map((m) => <Option key={m._id} value={m._id}>{m.name}</Option>)
                        }
                    </Select>
                </Form.Item>
            );
        } else if (this.state.userType === 'supplier' && this.state.userTypeOption === 'new') {
            return (<RegisterNewSupplier/>);
        } else if (this.state.userType === 'supplier' && this.state.userTypeOption === 'existing') {
            return (
                <Form.Item
                    name={["supplier", "_id"]}
                    rules={[
                        {
                            required: true,
                            message: 'Bitte wählen Sie einen der registrierten Anbieter!',
                        }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Wählen Sie einen Anbieter">
                        {
                            this.props.suppliers.map((s) => <Option key={s._id} value={s._id}>{s.name}</Option>)
                        }
                    </Select>
                </Form.Item>
            );
        }
    }

    render() {

        return (
            <Form
                name="normal_register"
                className="register-form__form"
                onFinish={this.props.onFinish}>
                <Divider orientation="left">User Daten</Divider>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie Ihre Email Adresse ein!',
                        },
                        {
                            type: 'email',
                            message: 'Bitte geben Sie eine gültige Email Adresse ein!'
                        }
                    ]}>
                    <Input prefix={<UserOutlined/>} placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie Ihr Passwort ein!',
                        },
                    ]}
                    hasFeedback>
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Passwort festlegen"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie Ihr Passwort ein!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Die Passwörter stimmen nicht überein!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Passwort bestätigen"
                    />
                </Form.Item>
                <Divider orientation="left">Zuordnung</Divider>
                <Form.Item name="user-type">
                    <Radio.Group
                        defaultValue="municipality"
                        onChange={this.onSelectUserType.bind(this)}>
                        <Radio.Button value="municipality">Gemeinde</Radio.Button>
                        <Radio.Button value="supplier">Anbieter</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="user-type-option">
                    {this.renderUserTypeOptions()}
                </Form.Item>
                {this.renderUserTypeSpecificForm()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form__submit-button">
                        Registrieren
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
