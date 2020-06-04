import React from 'react';
import {Col} from "antd";


export class MunicipalityAccountView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Col span={8}>
                    Municipality Col 1
                </Col>
                <Col span={8}>
                    Municipality Col 2
                </Col>
                <Col span={8}>
                    Municipality Col 3
                </Col>
            </div>
        );
    }
}
