import React from 'react';
import LoginForm from "../../components/LoginForm";

export class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <LoginForm/>
        );
    }
}
