import React from "react";
import {Col, Divider, Row, Typography} from "antd";


const {Paragraph} = Typography;

export default class ProductInformationText extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Col>
                <Row>
                    <h3 className="margin-vertical--sm">
                        {this.props.product?.name}
                    </h3>
                </Row>
                <Row>
                    <p className="margin-vertical--xs">
                        <i> von {this.props.product?.supplier?.name} </i>
                    </p>
                </Row>
                <Divider className="margin-top--sm"/>
                <Paragraph>
                    {this.props.product?.description}
                </Paragraph>
            </Col>
        )
    }
}
