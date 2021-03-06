import React from "react";
import { Col, Row } from "antd";
import ProductImage from "./ProductImage";
import CertificateInformation from "./CertificateInformation";
import OrderOptions from "./OrderOptions";
import ProductInformationText from "./ProductInformationText";

/**
 * props: {
 *     product
 *     fairbundles
 *     onCreateFairbundle
 *     onJoinFairbundle
 *     onCreateOrder
 * }
 */
export default class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minQty: this.getMinQuantity()
        }
    }

    componentDidMount() {
        let minQty = this.getMinQuantity();
        this.setState({
            minQty: minQty
        });
    }

    getMinQuantity() {
        let priceLevel = this.props.product.priceLevel;
        return Math.min(...priceLevel.map(p => p.minQty));
    };

    render() {
        return (
            <Row>
                <Col span={17}>
                    <Row className="padding--md">
                        <Col span={7}>
                            <ProductImage product={this.props.product} />
                        </Col>
                        <Col span={17} className="padding--md">
                            <ProductInformationText
                                // if detailView is rendered for preview, supplierName is given via props.entityName, otherwise it is contained in product object from backenend
                                supplierName={
                                    this.props.entityName
                                        ? this.props.entityName
                                        : this.props.product?.supplier?.name
                                }
                                product={this.props.product}
                            />
                        </Col>
                    </Row>
                    <Row className="padding--md">
                        <CertificateInformation product={this.props.product} />
                    </Row>
                </Col>
                <Col span={7} className="padding--md">
                    <OrderOptions
                        {...this.props}
                        minQty={this.state.minQty}
                    />
                </Col>
            </Row>
        );
    }
}
