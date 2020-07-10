import React from 'react';
import {Divider, Layout, message, Row, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import './LandingView.less';
import ProductService from "../../services/ProductService";
import Banner from "../../assets/banner.png";
import CertificateService from "../../services/CertificateService";
import LandingCategories from "../../components/LandingPage/LandingCategories";
import CategoryService from "../../services/CategoryService";
import FairbundlePrinciple from "../../components/LandingPage/FairbundlePrinciple";
import LandingCertificates from "../../components/LandingPage/LandingCertificates";
import SponsoredProducts from "../../components/LandingPage/SponsoredProducts";
import FairbundleService from "../../services/FairbundleService";


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
        this.getProductsAndFairbundles();
        this.getCertificates();
        this.getCategories();
    }


    async getProductsAndFairbundles() {
        try {
            // get all product
            let products = await ProductService.getProducts();
            // TODO: filter somehow to select?

            let fairbundles = await FairbundleService.getFairbundles();
            // TODO: filter somehow to select?

            //set state variables
            this.setState({
                sponsoredProducts: products,
                introducedFairbundle: fairbundles,
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
            const flatCategories = categories
                .flatMap((c) => [c, ...(c.subcategories.map((s) => {
                    return {...s, parent: c._id}
                }))]);
            let topCategories = flatCategories.filter((c) => (c.name === "Computer & Endgeräte") | (c.name === "Coronakrise") | ((c.name === "Feuerwehruniformen")));
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

    renderSponsoredProducts() {
        if (this.state.sponsoredProducts && this.state.introducedFairbundle) {
            return (<SponsoredProducts sponsoredProducts={this.state.sponsoredProducts} introducedFairbundle={this.state.introducedFairbundle}/>)
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
                    <img className="landing__banner"
                         src={Banner} alt="Fairtrade"/>
                </Row>
                <Divider>
                    <h1> Unsere Produkte </h1>
                </Divider>
                <Row justify="center" className="padding--md">
                    {this.renderSponsoredProducts()}
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
