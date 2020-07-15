import React from 'react';
import {Divider, Row} from 'antd';
import './FairbundledFooter.less';


export default class FairbundledFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="footer__container"
                 justify="center"
                 align="middle">
                <Divider className="footer__custom-divider"/>
                Made with <span style={{color: "#4E1C1B"}}>&nbsp; &#9829; &nbsp;</span> for<span> &nbsp; 🌍 &nbsp; </span> in Munich ©2020
            </Row>
        );
    }
}
