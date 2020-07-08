import React from 'react';
import {Badge, Button, Col, Row, Tooltip} from 'antd';
import {LogoutOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

export default class HeaderIconMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    renderAnonymous() {
        return (
            <Link to="/login">
                <Button size="large" type="link">
                    Anmelden
                </Button>
            </Link>
        );
    }

    renderAuthenticated() {
        return (
            <Row align="middle" className="padding-right--lg padding-top--sm">
                <Col className="margin--xs">
                    <h4>{'Hallo ' + this.props.entityName + '!'}</h4>
                </Col>
                <Col className="margin--xs">
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
                <Col className="margin--xs">
                    {this.props.isMunicipality ?
                        <Link to="/checkout">
                            <Badge
                                count={this.props.positions}
                                style={{backgroundColor: 'gold'}}
                                title="Bestellpositionen"
                                offset={[-7, 7]}>
                                <Tooltip title="Warenkorb">
                                    <Button size="large" type="link"
                                            icon={<ShoppingCartOutlined style={{fontSize: '24px'}}/>}/>
                                </Tooltip>
                            </Badge>
                        </Link>
                        : ""}
                </Col>
                <Col className="margin--xs">
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
            <Row justify="end" align="middle">
                {this.props.isAuthenticated ? this.renderAuthenticated() : this.renderAnonymous()}
            </Row>
        );
    }
}
