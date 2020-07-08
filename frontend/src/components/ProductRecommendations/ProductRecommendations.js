import React from 'react';
import {Button, Card, Col, Layout, message, Row, Tag, Typography, Divider, Anchor, Carousel, Avatar} from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import './LandingView.less';


import "../../components/ProductListCard/ProductListCard.less";

import ProductService from "../../services/ProductService";
import HttpService from "../../services/HttpService";
import placeholder from "../../assets/placeholder.png";
import {Link} from "react-router-dom";
import Corona from "../../assets/Corona.png";
import Feuerwehr from "../../assets/Feuerwehr.png";
import Computer from "../../assets/Computer.png";
import Fairbundled from "../../assets/Fairbundled.png";
import BlauerEngel from "../../assets/BlauerEngel.png";
import EcoLabel from "../../assets/EcoLabel.png";
import FairStone from "../../assets/FairStone.jpg";
import TCO from "../../assets/TCO.jpg";
import Fairtrade from "../../assets/Fairtrade.jpg";

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;
const { Paragraph, Text, Title } = Typography;
//const {Link} = Anchor;
export default class ProductRecommendations extends React.Component {


//constructor(props) {

    constructor(props) {
        super(props);
        this.state = {
            productId: "5ed537556ea8f1fcd3e8ff9e",
            products: null,
            product: null,

        };
    }


    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getProducts();
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
            <Col span={24} key={product._id}>
                <Card className="landing-view__card">
                    <Row gutter={4}>
                        <Col span={10}>
                            <Row
                                className="landing-view__product-image"
                                align="left"
                            >
                                <img
                                    src={
                                        product.images?.length > 0
                                            ? product.images[0]
                                            : placeholder
                                    }
                                    alt="bild"
                                    //width="50%"
                                />
                            </Row>
                        </Col>
                        <Col span={4}>
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
                                //justify="start"
                                align="right"
                            >
                                <Title level={4}>{product.name}</Title>
                            </Row>
                            <Row
                                className="landing-view__product_description"
                                justify="start"
                                align="right"
                            >
                                <Paragraph ellipsis>
                                    {this.displayDescriptionText(product)}
                                </Paragraph>
                            </Row>
                            <Row gutter={8} align="right">
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

    async getProducts(certificates = null) {
        try {
            // get product
            let product = await ProductService.getProduct(this.state.productId);
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
                <Row gutter={[8]}>
                    <Col span={24} align="middle">
                        <Divider>Das Produkt der Woche</Divider>
                    </Col>
                </Row>
                <Row gutter={[24, 24]}>
                    <Col span={20} align="left">
                        {this.getCardItem(this.state.product)}
                    </Col>
                    <Col span={4} align="right">
                        <Carousel autoplay>
                            <div>
                                <h1>
                                    {this.getCardItem(this.state.product)}
                                </h1>
                            </div>
                            <div>
                                <h1>
                                    {this.getCardItem(this.state.product)}
                                </h1>
                            </div>
                            <div>
                                <h1>
                                    {this.getCardItem(this.state.product)}
                                </h1>
                            </div>
                            <div>
                                <h1>
                                    {this.getCardItem(this.state.product)}
                                </h1>
                            </div>
                        </Carousel>
                    </Col>
                </Row>

                <Row gutter={[8,48]}>
                    <Col span={24} align="middle">
                        <Divider>Unsere Zertifikate</Divider>
                    </Col>
                </Row>
                <Row gutter={[8,48]}>
                    <Col span={5} align="middle">
                        <Avatar shape="square"
                                size={100}
                                src={BlauerEngel}/>
                    </Col>
                    <Col span={5} align="middle">
                        <Avatar shape="square"
                                size={100}
                                src={EcoLabel}/>
                    </Col>
                    <Col span={4} align="middle">
                        <img className="landing__picture_cert"
                             src={FairStone} alt="FairStone"/>
                    </Col>
                    <Col span={5} align="middle">
                        <img className="landing__picture_cert"
                             src={TCO} alt="TCO"/>

                    </Col>
                    <Col span={5} align="middle">
                        <img className="landing__picture_cert"
                             src={Fairtrade} alt="Fairtrade"/>
                    </Col>
                </Row>
                <Row gutter={[8, 48]}>
                    <Col span={24} align="middle">
                        Durch eine sorgfältige Auswahl der Zertifikate und unseren hohen Anspruch an Qualität, können Sie sich
                        sicher sein, dass Produkte auf Fairbundled.de nachhaltig und hochwertig sind.
                    </Col>
                </Row>

                <Row gutter={[8,48]}>
                    <Col span={24} align="middle">
                        <Divider>Interessante Kategorien</Divider>
                    </Col>
                </Row>

                <Row gutter={[8,48]}>
                    <Col span={8} align="middle">
                        <Link to={`/product?category=5ed537556ea8f1fcd3e8ff0c`}>
                            <img className="landing__pictures"
                                 src={Corona} alt="Corona"/>
                        </Link>
                    </Col>
                    <Col span={8} align="middle">
                        <Link to={`/product?category=5ed537556ea8f1fcd3e8fe72`}>
                            <img className="landing__pictures"
                                 src={Feuerwehr} alt="Feuerwehr"/>
                        </Link>
                    </Col>
                    <Col span={8} align="middle">
                        <Link to={`/product?category=5ed537556ea8f1fcd3e8fee4`}>
                            <img className="landing__pictures"
                                 src={Computer} alt="Computer"/>
                        </Link>
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
                <Row gutter={[8, 48]}>
                    <Divider>Das Fairbundle Prinzip</Divider>
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
                <Row gutter={[8,48]}>
                    <Col span={8} align = "middle">
                        Aufgrund unseres Fairbundle-Prinzips können Anbieter in größeren Mengen produzieren.
                        Dadurch können wir die Produkte zu den Preisen anbieten, bei denen jeder profitiert.
                        Treten Sie einem Fairbunndle bei oder erstellen Sie Ihr eigenes Fairbundle
                        von den günstigsten Preisen zu profitieren
                    </Col>
                    <Col span={8} align = "middle">
                        Der Prozess der kommunalen Beschaffung ist kompliziert und häufig umständlich - das
                        wissen wir. Mit Hilfe von fairbundled.de gibt es nun endlich die Möglichkeit
                        alles über einen zentralen Marktplatz einzukaufen.
                    </Col>
                    <Col span={8} align = "middle">
                        Nachhaltigkeit ist uns ein großes Anliegen. Wir arbeiten daher nur mit
                        zertifizierten Unternehmen, die unsere hohen Standards erfüllen. Filtern Sie gerne nach
                        den Nachhaltigkeits-Zertifikaten in der Produktübersicht, um den Vorgaben Ihrer Kommune gerecht
                        zu werden und nachhaltig einzukaufen.
                    </Col>

                </Row>
                <Row gutter={[8, 48]}>
                    <Col span={24} align="middle">
                        <img className="landing__picture_big"
                             src={Fairbundled} alt="Fairbundled"/>
                    </Col>

                </Row>
            </Layout>
        );
    }
}