import React from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import {message, Row} from "antd";
import AuthService from "../../services/AuthService";
import {withRouter} from "react-router-dom";

class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    onFinish(values) {
        const {email, password} = values;
        AuthService.login(email, password)
            .then(() => {
                this.props.history.push('/');
                message.success('Erfolgreich eingeloggt!');
            })
            .catch((err) => {
                message.error('Login fehlgeschlagen!');
            });
    }

    render() {
        return (
            <Row className="padding--md"
                 justify="center"
                 align="middle">
                <LoginForm onFinish={this.onFinish.bind(this)}/>
            </Row>

        );
    }
}

export default withRouter(LoginView);
