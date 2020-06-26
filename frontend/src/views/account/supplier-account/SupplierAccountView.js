import React from "react";
import { Col, Row, message } from "antd";
import MySupplierData from "../../../components/SupplierAccountContent/MySupplierData";
import OrderOverview from "../../../components/SupplierAccountContent/OrderOverview";
import FeeOverview from "../../../components/SupplierAccountContent/FeeOverview";
import ProductService from "../../../services/ProductService";
import PositionService from "../../../services/PositionService";
import UserService from "../../../services/UserService";

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
            supplierInfo.user = await UserService.getUsersBySupplierId(
                supplierInfo._id
            );
            this.setState({ supplier: supplierInfo });
        } catch (e) {
            message.error("Error fetching supplier Informations.");
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
                        <MySupplierData
                            supplier={this.state.supplier}
                            user={this.state.user}
                        />
                    ) : (
                        ""
                    )}
                </Col>
                <Col span={8}>
                    {this.state.supplier ? (
                        <OrderOverview supplier={this.state.supplier} />
                    ) : (
                        ""
                    )}
                </Col>
                <Col span={7}>
                    {this.state.supplier ? (
                        <FeeOverview supplier={this.state.supplier} />
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
        );
    }
}
