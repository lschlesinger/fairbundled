import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import {Link} from "react-router-dom";

const {Paragraph} = Typography;


export default class ProductListCard extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getCardItem(product) {
        return (
            <Col span={8} key={product._id}>
                <Card title={product.name}
                      key={product._id}
                      bordered={true}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <img src={product.images[0]} alt="bild" width="100%"/>
                        </Col>
                        <Col span={11}>
                            <Paragraph ellipsis>
                                {product.description}
                            </Paragraph>
                            <Paragraph ellipsis>
                                {/*TODO: create a label `Fairbundle` inside the card in case hasFairbundle == true */}
                                {product.hasFairbundle ? "hat Fairbundle" : "hat kein Fairbundle"}
                            </Paragraph>
                        </Col>
                        <Col span={7}>
                            <Link to={`/product/${product._id}`}>
                                <Button shape="round" size="large" type="primary">
                                    Details
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }

    render() {
        return (
            <Row gutter={[16, 16]}
                 className="product-list-card__cards">
                {this.props.products.map((p) => this.getCardItem(p))}
            </Row>
        )
    }
}

