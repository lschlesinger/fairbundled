import React from 'react';
import {Button, Row, Space, Tooltip, Badge} from 'antd';
import {LoginOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

export default class HeaderIconMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    renderAnonymous() {
        return (
            <Tooltip title="Login">
                <Link to="/login">
                    <Button size="large" type="link" icon={<LoginOutlined/>}/>
                </Link>
            </Tooltip>
        );
    }

    renderAuthenticated() {
        return (
            <Space>
                <i>{this.props.entityName}</i>
                {this.props.isMunicipality ?
                <Tooltip title="Mein Warenkorb">
                    <Link to="/checkout">
                        <Badge count={this.props.positions} offset={[-8, 8]}>
                            <Button size="large" type="link" icon={<ShoppingCartOutlined/>}/>
                        </Badge>
                    </Link>
                </Tooltip> : ""}
                <Tooltip title="Mein Konto">
                    <Link to="/account">
                        <Badge count={this.props.openFairbundles} offset={[-8, 8]}>
                            <Button size="large" type="link" icon={<UserOutlined/>}/>
                        </Badge>
                    </Link>
                </Tooltip>
                <Tooltip title="Logout">
                    <Button size="large"
                            onClick={this.props.onLogout}
                            type="link"
                            icon={<LogoutOutlined/>}
                    />
                </Tooltip>
            </Space>
        );
    }

    render() {
        return (
            <Row justify="end" align="middle">
                {this.props.isAuthenticated ? this.renderAuthenticated() : this.renderAnonymous()}
            </Row>
        );
    }
}
