import React from 'react';
import {Col, Row} from "antd";


export class SupplierAccountView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Row className="padding--md"
                 justify="space-around"
                 align="middle">
                <Col>
                    Supplier Col 1
                </Col>
                <Col>
                    Supplier Col 2
                </Col>
                <Col>
                    Supplier Col 3
                </Col>
            </Row>

        );
    }
}
