import React from "react";
import {Carousel, Col, Row, Typography} from "antd";
import './LandingCertificates.less';

const {Title} = Typography;

export default class LandingCertificates extends React.Component {

    constructor(props) {
        super(props);
    }

    getSlide(c) {
        return (
            <Col key={c._id}>
                <Row justify="center" className="padding-top--md">
                    <a href={c.url} target="_blank">
                        <img src={c.logo} height="150px" alt="Logo"/>
                    </a>
                </Row>
                <Row justify="center" className="padding-top--md">
                    <Title level={4}>{c.name}</Title>
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
