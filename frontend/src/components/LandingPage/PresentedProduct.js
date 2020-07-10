import React from "react";
import { Card, Col, Row } from "antd";

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Card>
        );
    }
}
