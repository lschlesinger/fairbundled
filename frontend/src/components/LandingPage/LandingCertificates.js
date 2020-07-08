import React from "react";
import {Carousel, Col, Row} from "antd";
import './LandingCertificates.less';

export default class LandingCertificates extends React.Component {

    constructor(props) {
        super(props);
    }

    getSlide(c) {
        return (
            <Col>
                <Row justify="center" className="padding-top--md">
                    <a href={c.url} target="_blank">
                        <img src={c.logo} height="200px" alt="Logo"/>
                    </a>
                </Row>
                <Row justify="center">
                    <h3>{c.name}</h3>
                </Row>
            </Col>
        )
    }

    render() {
        return (
            <Row>
                <Carousel autoplay>
                    {this.props.certificates.map((c) => this.getSlide(c))}
                </Carousel>
            </Row>

        )
    }
}
