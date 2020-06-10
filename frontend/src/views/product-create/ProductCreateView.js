import React from 'react';
import ProductCreateProcess from "../../components/ProductCreateProcess/ProductCreateProcess";
import CategoryService from "../../services/CategoryService";
import AuthService from "../../services/AuthService";
import ProductPreviewModalView from "./ProductPreviewModalView";
import ProductService from "../../services/ProductService";
import CertificateService from "../../services/CertificateService";
import {message} from "antd";
import "../../App.less";

export class ProductCreateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // control visibility of product preview modal
            modalVisible: false,
            // initialize categories, further specified during product creation in respective components
            categories: [],
            // initialize certificates, further specified during product creation in respective components
            certificates: [],
            // initialize product with fields specified during product creation
            product: {
                // set in view (retrieved from user that is logged in)
                "supplier": null,
                // set in ProductCategorySelection Component
                "categories": [],
                // set in ProductDescriptionInput Component
                "name": null,
                "ean": null,
                "deliveryDays": null,
                "description": null,
                // set in ProductPriceLevel Component
                "priceLevel": [],
                // set in ProductCertificateSelection Component (takes categories into account)
                "certificates": [],
                // set in ProductImageUpload Component
                "images": null,
            }
        };
    }

    componentWillMount() {
        this.getCertificatesAndCategoriesAndMapping();
        this.getSupplierId();
    }

    /**
     * Get Certificates and Categories from backend using CategoryService and CertificateService
     * Includes mapping of certificates to categories
     * Sets states variables categories and certificates further used in child components
     */
    async getCertificatesAndCategoriesAndMapping() {
        try {
            // get categories (with parent nested into subcategories)
            let categories = await CategoryService.getCategories();
            // get certificates
            let certificates = await CertificateService.getCertificates();
            // map certificates to categories to enable category specific certificate display
            certificates = CertificateService.getCertificateCategoryMapping(categories, certificates);
            this.setState({
                categories: categories,
                certificates: certificates
            })
        } catch (e) {
            message.error("Error fetching certificates and categories.");
        }
    }

    getSupplierId() {
        // supplier field in state variable `product`
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                supplier: AuthService.getCurrentUser().supplier._id
            }
        }))
    }

    /**
     * in every process step, once values are changed, this method is called assigning the values to the state variable `product`
     * those values that haven't been changed will receive the value of their previous state
     * @param values
     */
    onChange(values) {
        console.log(values);
        const {categories, name, description, ean, deliveryDays, priceLevel, certificates, images} = values;
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                "name": name ? name : prevState.product.name,
                "description": description ? description : prevState.product.description,
                "ean": ean ? ean : prevState.product.ean,
                "images": images ? this.getThumbUrls(images) : prevState.product.imagesUrl,
                "deliveryDays": deliveryDays ? deliveryDays : prevState.product.deliveryDays,
                "priceLevel": priceLevel ? priceLevel : prevState.product.priceLevel,
                "certificates": certificates ? certificates : prevState.product.certificates,
                "categories": categories ? categories : prevState.product.categories
            }
        }), () => console.log(this.state.product));
    }

    getThumbUrls(images) {
        // helper function for getting the base64encoded image out of the value `images` retrieved onChange
        const thumbUrls = [];
        for (const f in images.fileList) {
            const file = images.fileList[f];
            const thumbUrl = file.thumbUrl;
            thumbUrls.push(thumbUrl);
        }
        return thumbUrls;
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    hideModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    async publishProduct() {
        try {
            await ProductService.createProduct(this.state.product);
            message.success("Produkt erfolgreich veröffentlicht")
        } catch (e) {
            message.warn("Produkt konnte nicht veröffentlicht werden.")
        }
    }

    render() {
        return (
            <div>
                <ProductCreateProcess categories={this.state.categories}
                                      certificates={this.state.certificates}
                                      product={this.state.product}
                                      onChange={this.onChange.bind(this)}
                                      onPreview={this.showModal}
                                      onPublish={this.publishProduct.bind(this)}
                />
                <ProductPreviewModalView
                    onClose={this.hideModal} modalVisible={this.state.modalVisible}
                    product={this.state.product}/>
            </div>
        );
    }
}
