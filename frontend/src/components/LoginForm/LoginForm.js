import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "./LoginForm.less";

import React from "react";
import {Link} from "react-router-dom";


export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Form
                name="normal_login"
                className="login-form__form"
                onFinish={this.props.onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie Ihre Email Adresse ein!',
                        },
                        {
                            type: 'email',
                            message: 'Bitte geben Sie eine gültige Email Adresse ein!'}
                    ]}
                >
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
                >
                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Passwort"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form__submit-button">
                        Log in
                    </Button>
                    oder <Link to="/register">registrieren </Link>
                </Form.Item>
            </Form>
        )
    }
}
