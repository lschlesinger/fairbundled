import React from "react";
import { Col, Row } from "antd";
import MySupplierData from "../../../components/SupplierAccountContent/MySupplierData";

export class SupplierAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: this.props.supplier,
            user: this.props.user,
        };
    }

    componentWillMount() {}

    render() {
        return (
            <Row
                gutter={[16, 16]}
                className="padding-horizontal--lg"
                justify="space-around"
                align="middle"
            >
                <Col span={7}>
                    <MySupplierData
                        supplier={this.state.supplier}
                        user={this.state.user}
                    />
                    {/* {this.state.supplier.billingAddress} */}
                </Col>
                <Col span={10}>Supplier Col 2</Col>
                <Col span={7}>Supplier Col 3</Col>
            </Row>
        );
    }
}
