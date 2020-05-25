import {AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import React from 'react';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined/>}>
                    Navigation One
                </Menu.Item>
                <Menu.Item key="app" disabled icon={<AppstoreOutlined/>}>
                    Navigation Two
                </Menu.Item>
            </Menu>
        )
    }
}

