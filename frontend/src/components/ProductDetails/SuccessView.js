import React from "react";
import {Col, Row, Typography} from "antd";
import {RocketOutlined} from '@ant-design/icons';

const {Text, Paragraph} = Typography;

export default class JoinedFairbundle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let location = window.location.href;

        return (
            <Col>
                <Row justify="center" align="middle" className="margin-vertical--lg">
                    <RocketOutlined style={{fontSize: 200}}/>
                </Row>
                <Row justify="center" align="middle" className="margin-top--lg">
                   <h2> {this.props.message} </h2>
                </Row>
                <Row justify="center" align="middle">
                    <h3>
                        {this.props.showLink ? <Paragraph copyable={{text: location}}> Link jetzt kopieren und teilen</Paragraph> : ""}
                    </h3>
                </Row>
            </Col>
        )
    }
}
