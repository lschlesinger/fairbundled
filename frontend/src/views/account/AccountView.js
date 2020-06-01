import React from 'react';
import AuthService from "../../services/AuthService";
import {Button} from "antd";
import {LogoutOutlined} from '@ant-design/icons';

export class AccountView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Button type="primary"
                    icon={<LogoutOutlined/>}
                    onClick={AuthService.logout}>
                Logout
            </Button>
        );
    }
}
