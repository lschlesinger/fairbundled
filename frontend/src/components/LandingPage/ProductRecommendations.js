import React from "react";
import { Card, Row, Carousel, Col, Typography, Button, Layout} from "antd";
import {Link} from "react-router-dom";
import "./ProductRecommendations.less";
import placeholder from "../../assets/placeholder.png";
import {InfoCircleOutlined} from '@ant-design/icons';

const {Title, Paragraph, Tag, Text} = Typography;

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    getLowestPrice(product) {
        return (
            <Title level={4} className="price">
                {product.priceLevel.length < 2 ? "" : "Ab "}
                {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                }).format(product.smallestPrice)}
            </Title>
        );
    }

    getProductCard = (product) => {
        const price = this.getLowestPrice(product);
        return (
            <Layout>
                <Row align="stretch" className="product-row">
                    <Col span={12}>
                        <img
                            src={
                                product.images?.length > 0
                                    ? product.images[0]
                                    : placeholder
                            }
                            alt="bild"
                            width="90%"
                        />
                    </Col>
                    <Col span={12} align="start" style={{display:"flex", flexDirection:"column"}}>
                        <Row justify="end" align="middle" style={{flexGrow:1, alignItems:"flex-start"}}>
                            <Text className="sponsored-text">Gesponsert</Text>
                            <InfoCircleOutlined />
                        </Row>
                        <Row className="product-title" style={{flex:0}}>
                            <Title level={3}>{product.name}</Title>
                        </Row>
                        <Row align="middle" style={{flex:0}}>
                            <Col span={12} align="start">{price}</Col>
                            <Col span={12} align="end">
                                <Link to={`/product/${product._id}`}>
                                    <Button
                                        size="medium"
                                        type="primary"
                                    >
                                        Details
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Layout>
        );
    }

    getProductCards = (productGroup) => {
        return (
            <div>
                <Row className="presented-product-row" style={{height:"50%"}}>
                    <Card style={{width:"99%"}}>
                        {this.getProductCard(productGroup[0])}
                    </Card>
                </Row>
                <Row style={{height:"50%"}}>
                    <Card style={{width:"99%"}}>
                        {this.getProductCard(productGroup[1])}
                    </Card>
                </Row>
            </div>
        );
    }

    render() {
        let groups = new Array(this.props.products.length / 2);
        let products = this.props.products;
        for (let i = 0; i < groups.length; i++){
            groups[i] = [products[2*i], products[2*i+1]];
        }

        console.log(groups);
        return (
            <Carousel autoplay>
                {groups.map(g => this.getProductCards(g))}
            </Carousel>
        );
    }
}
