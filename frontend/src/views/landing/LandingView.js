import React from 'react';
import {Divider, Layout, message, Row} from "antd";
import ProductService from "../../services/ProductService";
import Banner from "../../assets/banner.png";
import CertificateService from "../../services/CertificateService";
import LandingCategories from "../../components/LandingPage/LandingCategories";
import CategoryService from "../../services/CategoryService";
import FairbundlePrinciple from "../../components/LandingPage/FairbundlePrinciple";
import LandingCertificates from "../../components/LandingPage/LandingCertificates";
import SponsoredProducts from "../../components/LandingPage/SponsoredProducts";
import FairbundleService from "../../services/FairbundleService";
import {Spinner} from "../../components/Functional/Spinner";

const LANDINGCATS = [
    "Feuerwehruniformen",
    "Computer & Endgeräte",
    "Coronakrise",
];
const EXCLUDEDLANDINGCERTS = [
    "Fair Labor Association (FLA)",
    "OEKO-TEX 100",
    "Ethical Trading Initiative (ETI)",
    "Business Social Compliance Initiative (BSCI)",
];

export class LandingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sponsoredProducts: null,
            presentedFairbundle: null,
            introducedFairbundle: null,
            certificates: null,
            topCategories: null,
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
            products = ProductService.getSmallestPrice(products);
            products = products.sort(() => Math.random() - 0.5).slice(0, 10);


            let fairbundles = await FairbundleService.getFairbundles();
            // TODO: filter somehow to select?

            let presentedFairbundle = FairbundleService.getPresentedFairbundle(
                fairbundles
            );

            //set state variables
            this.setState({
                presentedFairbundle: presentedFairbundle,
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
            //filter labels with bad quality picture
            certificates = certificates.filter(
                (c) => EXCLUDEDLANDINGCERTS.indexOf(c.name) < 0
            );
            //randomize output
            certificates.sort(() => Math.random() - 0.5);
            //set state variables
            this.setState({
                certificates: certificates,
            });
        } catch (e) {
            message.error("Error fetching certificates.");
        }
    }

    async getCategories() {
        try {
            let categories = await CategoryService.getCategories();
            const flatCategories = categories.flatMap((c) => [
                c,
                ...c.subcategories.map((s) => {
                    return { ...s, parent: c._id };
                }),
            ]);
            let topCategories = flatCategories.filter(
                (c) => LANDINGCATS.indexOf(c.name) > -1
            );
            //set state variables
            this.setState({
                topCategories: topCategories,
            });
        } catch (e) {
            message.error("Error fetching categories.");
        }
    }


    render() {

        const certificates = this.state.certificates;
        const categories = this.state.topCategories;
        const sponsoredProducts = this.state.sponsoredProducts;
        const introducedFairbundle = this.state.introducedFairbundle;
        let sponsoredProductsComponent = <Spinner/>;
        let certificateComponent = <Spinner/>;
        let categoriesComponent = <Spinner/>;

        if (certificates) {
            certificateComponent = <LandingCertificates certificates={certificates}/>
        }

        if (categories) {
            categoriesComponent = <LandingCategories topCategories={categories}/>
        }

        if (introducedFairbundle && sponsoredProducts) {
            sponsoredProductsComponent = <SponsoredProducts sponsoredProducts={sponsoredProducts}
                                                            introducedFairbundle={introducedFairbundle}/>
        }

        return (
            <Layout className="padding--md">
                <Row justify="center" className="padding--md">
                    <img alt="Fairbundled"
                         src={Banner}/>
                </Row>
                <Row justify="center" className="padding--md">
                    {sponsoredProductsComponent}
                </Row>
                <Divider><h1> Unsere Zertifikate </h1></Divider>
                    {certificateComponent}
                <Divider><h1> Unsere Top Kategorien </h1></Divider>
                <Row justify="center" className="padding--md">
                    {categoriesComponent}
                </Row>
                <Divider>
                    <h1>Unser Prinzip</h1>
                </Divider>
                <FairbundlePrinciple />
            </Layout>
        );
    }
}
