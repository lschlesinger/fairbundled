import React from 'react';
import CategoryHeaderMenu from "./CategoryHeaderMenu";
import SearchBar from "./SearchBar";
import {Col, Divider, Row} from 'antd';
import logo from '../../assets/logo.png';
import HeaderIconMenu from "./HeaderIconMenu";
import './FairbundledHeader.less';


export default class FairbundledHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // render all child components composing the header and pass on state variables if required
            <div>
                <Row justify="space-around" align="middle">
                    <Col span={5}>
                        <Row align="middle" justify="start">
                            <a href="/">
                            <img className="header__logo"
                                 src={logo} alt="LOGO"/>
                            </a>
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
                <Divider className="header__custom-divider-bottom"/>
            </div>
        );
    }
}

