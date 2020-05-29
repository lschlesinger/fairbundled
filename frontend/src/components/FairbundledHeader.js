import React from 'react';
import CategoryHeaderMenu from "./CategoryHeaderMenu";
import SearchBar from "./SearchBar";
import {Col, Divider, Row} from 'antd';
import logo from '../logo.png';
import HeaderIconMenu from "./HeaderIconMenu";
import './FairbundledHeader.less';


export default class FairbundledHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row justify="space-around" align="middle">
                    <Col span={5}>
                        <Row align="middle" justify="start">
                            <img style={{maxWidth: '100%'}} src={logo} width="210"/>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <SearchBar categories={this.props.categories}/>
                    </Col>
                    <Col span={5}>
                        <HeaderIconMenu/>
                    </Col>
                </Row>
                <Divider className="header__custom-divider"/>
                <Row justify="space-around">
                        <CategoryHeaderMenu categories={this.props.categories}/>
                </Row>
            </div>
        );
    }
}

