import React from "react";
import {Col, message, Row} from "antd";
import OrderOverview from "../../../components/AccountComponent/SupplierAccountContent/OrderOverview";
import FeeOverview from "../../../components/AccountComponent/SupplierAccountContent/FeeOverview";
import ProductService from "../../../services/ProductService";
import PositionService from "../../../services/PositionService";
import UserService from "../../../services/UserService";
import MyEntityData from "../../../components/AccountComponent/MyEntityData";

export class SupplierAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: null,
            user: this.props.user,
        };
    }

    componentDidMount() {
        this.getSupplierInfo();
    }

    async getSupplierInfo() {
        try {
            let supplierInfo = this.props.supplier;
            supplierInfo = await ProductService.getActiveSupplierProducts(
                supplierInfo
            );
            supplierInfo = await PositionService.getSalesInfo(supplierInfo);
            supplierInfo.user = await UserService.getEntityUsers();
            this.setState({supplier: supplierInfo});
        } catch (e) {
            message.error("Error fetching supplier Information.");
        }
    }

    render() {
        return (
            <Row
                gutter={[24, 24]}
                className="padding-horizontal--lg"
                justify="space-around"
            >
                <Col span={9}>
                    {this.state.supplier ? (
                        <MyEntityData
                            entity={this.state.supplier}
                            user={this.state.user}
                        />
                    ) : ("")}
                </Col>
                <Col span={9}>
                    {this.state.supplier ? (
                        <OrderOverview supplier={this.state.supplier}/>
                    ) : ("")}
                </Col>
                <Col span={6}>
                    {this.state.supplier ? (
                        <FeeOverview supplier={this.state.supplier}/>
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
        );
    }
}
