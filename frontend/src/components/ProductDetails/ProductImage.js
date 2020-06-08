import React from 'react';
import {Col, Row} from 'antd';
import './ProductImage.less';
import placeholder from "../../assets/placeholder.png"

export default class ProductImage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentIdx: 0
        }
    }

    changeCurrentIdx(idx) {
        this.setState({currentIdx: idx});
    }

    render() {
        return (
            <Col>
                <Row>
                    <div className="product_image__current-img">
                        <img
                            src={this.props.product.images && this.props.product.images.length > this.state.currentIdx ? this.props.product.images[this.state.currentIdx] : placeholder}
                            alt="img"/>
                    </div>
                </Row>
                <Row>
                    {this.props.product.images?.map((image, idx) =>
                        <Col>
                            <div className="product-image__small-img"
                                 onClick={() => this.changeCurrentIdx(idx)}>
                                <img src={image} alt="img"/>
                            </div>
                        </Col>)}
                </Row>
            </Col>
        );
    }
}
