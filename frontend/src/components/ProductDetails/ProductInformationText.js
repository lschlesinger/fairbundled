import React from "react";
import {Col, Divider, Row, Typography} from "antd";


const {Paragraph} = Typography;

export default class ProductInformationText extends React.Component {

    constructor(props) {
        super(props);
    }

    displayDescriptionHtml() {
        if (!this.props.product || !this.props.product.description) return {__html: ""};
        return {__html: this.props.product.description};
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
                    {<div dangerouslySetInnerHTML={this.displayDescriptionHtml()}/>}
                </Paragraph>
            </Col>
        )
    }
}
