import React from 'react';
import {Button, Card, Col, Layout, message, Row, Tag, Typography, Divider, Anchor} from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import './LandingView.less';


import "../../components/ProductListCard/ProductListCard.less";

import ProductService from "../../services/ProductService";
import HttpService from "../../services/HttpService";
import placeholder from "../../assets/placeholder.png";
import {Link} from "react-router-dom";

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;
const { Paragraph, Text, Title } = Typography;
//const {Link} = Anchor;
export class LandingView extends React.Component {


//constructor(props) {

    constructor(props) {
        super(props);
        this.state = {
            productId: "5ed537556ea8f1fcd3e8ff9e",
            products: null,
            product: null,

        };
    }

    static async getProduct(productId) {
        return HttpService.get(`${this.BASE_URL}/${productId}`);
    }

    componentDidMount() {
        this.getProductsAndFairbundles();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getProductsAndFairbundles();
        }
    }

    displayDescriptionText(product) {
        if (!product || !product.description) return "";
        let tmp = document.createElement("div");
        tmp.innerHTML = product.description;
        return (tmp.textContent || tmp.innerText || "").substring(0, 50);
    }

    getCardItem(product) {
        if (product == null) return ("");
        const price = this.getLowestPrice(product);
        return (
            <Col span={12} key={product._id}>
                <Card className="product-list-card__card">
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
                                className="landing-view__fairbundle_tag"
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
                                className="landing-view__product_title"
                                justify="start"
                            >
                                <Title level={4}>{product.name}</Title>
                            </Row>
                            <Row
                                className="landing-view__product_description"
                                justify="start"
                            >
                                <Paragraph ellipsis>
                                    {this.displayDescriptionText(product)}
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

    //function to determine the lowest price and to differentiate between one and multiple price levels (Difference: Ab)
    getLowestPrice(product) {
        let smallestPrice = Math.min(...product.priceLevel.map(p => p.unitPrice));
        return (
            <Title level={4} className="price">
                {product.priceLevel.length < 2 ? "" : "Ab "}
                {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                }).format(smallestPrice)}
            </Title>
        );
    }

    async getProductsAndFairbundles(certificates = null) {
        try {
            // get product
            let product = await ProductService.getProduct(this.state.productId);
            // update products with flagged (hasFairbundle) products
            //set state variables
            this.setState(prevState => ({
                ...prevState,
                product: product
            }));
        } catch (e) {
            message.error("Error fetching products and fairbundles.");
        }
    }

    render() {
        return (
            <Layout className="landing-view__layout">
                <Row gutter={[8, 48]}>
                   <Col span={24} align="middle">
                       <Divider>Das Produkt der Woche</Divider>
                       {this.getCardItem(this.state.product)}
                   </Col>
                </Row>
                <Row gutter={[8, 48]}>
                    <Col span={8} />
                    <Content className="landing-view__content">

                        <Button
                            shape="round"
                            size="middle"
                            type="primary"
                            block
                        >
                            Über Fairbundled
                        </Button>
                    </Content>
                    <Col span={8} align="middle">
                    </Col>
                </Row>
                <Row gutter={[8, 48]}>
                    <Col span={8} align = "middle">
                    </Col>

                    <Col span={8} />
                    <Col span={8} />
                </Row>
                <Row>

                            <Divider>
                                Das Fairbundle Prinzip
                            </Divider>


                </Row>
                <Row>
                    <Col span={8} align = "middle">
                        <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
                    </Col>
                    <Col span={8} align = "middle">
                        <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
                    </Col>
                    <Col span={8} align = "middle">
                        <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
                    </Col>

                </Row>

                <Row  className="landing-view__content_headline">
                    <Col span={8} align = "middle">
                        Faire Preise..
                    </Col>
                    <Col span={8} align = "middle">
                        ..für Kommunen..
                    </Col>
                    <Col span={8} align = "middle">
                       ..nachhaltig
                    </Col>

                </Row>
                <Row>
                    <Col span={8} align = "middle">
                        Aufgrund unseres Fairbundle-Prinzips können Anbieter in größeren Mengen produzieren.
                        Dadurch können wir die Produkte zu den Preisen anbieten, bei denen jeder profitiert.
                        Treten Sie einem Fairbunndle bei oder erstellen Sie Ihr eigenes Fairbundle
                        von den günstigsten Preisen zu profitieren
                    </Col>
                    <Col span={8} align = "middle">
                        Der Prozess
                    </Col>
                    <Col span={8} align = "middle">
                        Nachhaltigkeit ist uns ein großes Anliegen. Wir arbeiten daher nur mit
                        zertifizierten Unternehmen, die unsere hohen Standards erfüllen.
                    </Col>

                </Row>
            </Layout>
        );
    }
}
