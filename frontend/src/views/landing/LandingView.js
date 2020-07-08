import React from 'react';
import {Divider, Layout, message, Row, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import './LandingView.less';
import ProductService from "../../services/ProductService";
import HttpService from "../../services/HttpService";
import Banner from "../../assets/banner.png"
import CertificateService from "../../services/CertificateService";
import LandingCategories from "../../components/LandingPage/LandingCategories";
import CategoryService from "../../services/CategoryService";
import FairbundlePrinciple from "../../components/LandingPage/FairbundlePrinciple";
import LandingCertificates from "../../components/LandingPage/LandingCertificates";


export class LandingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsoredProducts: null,
            introducedFairbundle: null,
            certificates: null,
            topCategories: null
        };
    }

    componentDidMount() {
        this.getProducts();
        this.getCertificates();
        this.getCategories();
    }


    async getProducts() {
        try {
            // get all product
            let products = await ProductService.getProducts();
            // filter?

            //set state variables
            this.setState({
                sponsoredProducts: products
            });
        } catch (e) {
            message.error("Error fetching products and fairbundles.");
        }
    }

    async getCertificates() {
        try {
            let certificates = await CertificateService.getCertificates();
            //set state variables
            this.setState({
                certificates: certificates
            });
        } catch (e) {
            message.error("Error fetching certificates.");
        }
    }

    async getCategories() {
        try {
            let categories = await CategoryService.getCategories();
            let topCategories = categories.filter((c) => (c.name === "IT & Zubehör") | (c.name === "Hygiene & Haushalt") | ((c.name === "Bauhof")));
            //set state variables
            this.setState({
                topCategories: topCategories
            });
        } catch (e) {
            message.error("Error fetching categories.");
        }
    }


    renderLandingCategories() {
        if (this.state.topCategories) {
            return (<LandingCategories topCategories={this.state.topCategories}/>)
        } else {
            return (this.renderSpinner);
        }
    }

    renderLandingCertificates() {
        if (this.state.certificates) {
            return (<LandingCertificates certificates={this.state.certificates}/>)
        } else {
            return (this.renderSpinner());
        }
    }


    renderSpinner() {
        const antIcon = <LoadingOutlined style={{fontSize: 36}} spin/>;

        return (
            <Row
                justify="center"
                align="middle"
                className="app__spinner-container"
            >
                <Spin size="large" indicator={antIcon}/>
            </Row>
        );
    }


    render() {
        return (
            <Layout className="padding--md">
                <Row justify="center" className="padding--md">
                    <img className="landing__pictures"
                         src={Banner} alt="Fairtrade"/>
                </Row>
                <Row justify="center" className="padding--md">
                    Hier kommen das vorgeschlagene Fairbundle und die gesponsorten Produkte hin
                    {/*{this.renderSponsoredProducts()}*/}
                </Row>
                <Divider><h1> Unsere Zertifikate </h1></Divider>
                {this.renderLandingCertificates()}
                <Divider><h1> Unsere Top Kategorien </h1></Divider>
                <Row justify="center" className="padding--md">
                    {this.renderLandingCategories()}
                </Row>
                <Divider>
                    <h1> Unser Prinzip </h1>
                </Divider>
                <FairbundlePrinciple/>
            </Layout>
        );
    }
}
