import React from 'react';
import {Badge, Button, Col, Row, Tooltip, Typography} from 'antd';
import {LogoutOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Paragraph} = Typography;

export default class HeaderIconMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    renderAnonymous() {
        return (
            <Row align="middle" justify="end">
                <Link to="/login">
                    <Button size="large" type="link">
                        Anmelden
                    </Button>
                </Link>
            </Row>
        );
    }

    renderAuthenticated() {
        return (
            <Row align="middle" justify="end" className="header__icon-menu padding-left--md padding-top--md">
                <Col span={12} flex>
                    <Paragraph strong ellipsis> {'Hallo ' + this.props.entityName + '!'}</Paragraph>
                </Col>
                <Col span={4}>
                    <Link to="/account">
                        <Badge count={this.props.openFairbundles}
                               style={{backgroundColor: 'gold'}}
                               title="Offene Fairbundle"
                               offset={[-7, 7]}>
                            <Tooltip title="Kontoübersicht">
                                <Button size="large" type="link" icon={<UserOutlined style={{fontSize: '24px'}}/>}/>
                            </Tooltip>
                        </Badge>
                    </Link>
                </Col>
                {this.props.isMunicipality ?
                    <Col span={4}>
                        <Link to="/checkout">
                            <Badge
                                count={this.props.positions}
                                style={{backgroundColor: 'gold'}}
                                title="Bestellpositionen"
                                offset={[-7, 7]}>
                                <Tooltip title="Warenkorb">
                                    <Button type="link"
                                            size="large"
                                            icon={<ShoppingCartOutlined style={{fontSize: '27px'}}/>}/>
                                </Tooltip>
                            </Badge>
                        </Link>
                    </Col>
                    : ""}
                <Col span={4}>
                    <Tooltip title="Abmelden">
                        <Button size="large"
                                onClick={this.props.onLogout}
                                type="link"
                                icon={<LogoutOutlined style={{fontSize: '24px'}}/>}
                        />
                    </Tooltip>
                </Col>
            </Row>

        );
    }

    render() {
        return (
            <Row className="margin-horizontal--lg" align="end">
                {this.props.isAuthenticated ? this.renderAuthenticated() : this.renderAnonymous()}
            </Row>


        );
    }
}
