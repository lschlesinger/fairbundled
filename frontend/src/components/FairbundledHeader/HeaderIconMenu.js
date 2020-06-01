import React from 'react';
import {Button, Row, Space, Tooltip} from 'antd';
import {SettingOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

export default class HeaderIconMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <Row justify="end" align="middle">
                <Space>
                    <Tooltip title="Mein Konto">
                        <Link to="/account">
                            <Button size="large" type="link" icon={<UserOutlined/>}/>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Mein Warenkorb">
                        <Button size="large" type="link" icon={<ShoppingCartOutlined/>}/>
                    </Tooltip>
                    <Tooltip title="Einstellungen">
                        <Button size="large" type="link" icon={<SettingOutlined/>}/>
                    </Tooltip>
                </Space>
            </Row>
        );
    }
}
