import React from 'react';
import ProductService from "../../services/ProductService";
import {Button, Card, Col, Layout, message, Row, Tag, Typography} from "antd";
import './LandingView.less';
import placeholder from "../../assets/placeholder.png";
import {Link} from "react-router-dom";
import "../../components/ProductListCard/ProductListCard.less";


// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;
const { Paragraph, Text, Title } = Typography;

export class LandingView extends React.Component {


constructor(props) {
    super(props);
    this.state = {
        productId: "5ed537556ea8f1fcd3e8ff9e",
        fairbundles: null,
        RecommendedProduct: null,
        products: this.props.products,
    };
}

    componentDidMount() {
        this.getRecommendedProduct();
    }

    async getRecommendedProduct() {
        try {
            const product = await ProductService.getProduct(this.state.productId);
            this.setState({
                RecommendedProduct: product})
        } catch (e) {
            message.error("Error fetching Product.")
        }
    }

    //function to determine the lowest price and to differentiate between one and multiple price levels (Difference: Ab)
    getLowestPrice(product) {
        return (
            <Title level={4} className="price">
                {product.priceLevel.length < 2 ? "" : "Ab "}
                {product.smallestPrice} €
            </Title>
        );
    }


//function to create every single card based on every single product
    getCardItem(product) {
        const price = this.getLowestPrice(product);
        return (
            <Col span={8} key={product._id}>
                <Card>
                    {/* title={product.name} key={product._id} bordered={true} */}
                    <Row gutter={12}>
                        <Col span={10}>
                            <Row
                                className="product-list-card__product-image"
                                align="middle"
                            >
                                <img
                                    src={
                                        product.images?.length > 0
                                            ? product.images[0]
                                            : placeholder
                                    }
                                    alt="bild"
                                    width="100%"
                                />
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row
                                className="product-list-card__fairbundle_tag"
                                justify="start"
                            >
                                <Paragraph>
                                    {product.hasFairbundle ? (
                                        <Tag color="#78A262">Fairbundle</Tag>
                                    ) : (
                                        ""
                                    )}
                                </Paragraph>
                            </Row>
                            <Row
                                className="product-list-card__product_title"
                                justify="start"
                            >
                                <Title level={4}>{product.name}</Title>
                            </Row>
                            <Row
                                className="product-list-card__product_description"
                                justify="start"
                            >
                                <Paragraph>
                                    <Text>{product.description}</Text>
                                </Paragraph>
                            </Row>
                            <Row gutter={8} align="middle">
                                <Col span={12}>{price}</Col>
                                <Col span={12}>
                                    <Link to={`/product/${product._id}`}>
                                        <Button
                                            shape="round"
                                            size="middle"
                                            type="primary"
                                            block
                                        >
                                            Details
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }

render() {
    return (
        <Layout className="landing-view__layout">
            <Sider className="landing-view__sider">

            </Sider>
            <Content
                gutter={[16, 16]} className="product-list-card__cards">
                  {this.getCardItem(this.RecommendedProduct)}
            </Content>
            <Sider className="landing-view__sider">

            </Sider>
        </Layout>
    );
}
}

