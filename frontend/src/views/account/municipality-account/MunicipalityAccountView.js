import React from 'react';
import {Row, Col} from "antd";


export class MunicipalityAccountView extends React.Component {

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
                    Municipality Col 1
                </Col>
                <Col>
                    Municipality Col 2
                </Col>
                <Col>
                    Municipality Col 3
                </Col>
            </Row>
        );
    }
}
