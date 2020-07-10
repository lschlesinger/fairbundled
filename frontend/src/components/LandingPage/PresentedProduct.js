import React from "react";
import { Card, Col, Row } from "antd";
import placeholder from "../../assets/placeholder.png";

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Col span={12}>
                    {console.log(this.props.fairbundle)}
                    <img
                        src={
                            this.props.fairbundle?.product.images?.length > 0
                                ? this.props.fairbundle.product.images[0]
                                : placeholder
                        }
                        alt="bild"
                        width="100%"
                    />
                </Col>
                <Col span={12}></Col>
            </Card>
        );
    }
}
