import React from 'react';
import ProductCreateProcess from "../../components/ProductCreateProcess/ProductCreateProcess";
import CategoryService from "../../services/CategoryService";
import AuthService from "../../services/AuthService";
import ProductPreviewModal from "../../components/ProductCreateProcess/ProductPreviewModal";
import ProductService from "../../services/ProductService";
import CertificateService from "../../services/CertificateService";
import {message} from "antd";

export class ProductCreateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            categories: [],
            certificates: [],
            product: {
                "name": null,
                "description": null,
                "ean": null,
                "images": null,
                "deliveryDays": null,
                "priceLevel": [],
                "certificates": [],
                "supplier": null,
                "categories": [],
            }
        };
    }

    componentWillMount() {
        this.getCertificatesAndCategoriesAndMapping();
        this.getSupplierId();

    }

    getThumbUrls(images){
        const thumbUrls = [];
        for (const f in images.fileList){
            const file = images.fileList[f];
            const thumbUrl = file.thumbUrl;
            thumbUrls.push(thumbUrl);
        }
        return thumbUrls;
    }

    onFinish(values) {
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
        }));
        console.log(this.state.product)
        message.success("Produkt Detail gespeichert.")
    }

    async getCertificatesAndCategoriesAndMapping() {
        try {
            // get categories
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
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                supplier: AuthService.getCurrentUser().supplier._id
            }
        }))
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
                                      onFinish={this.onFinish.bind(this)}
                                      onPreview={this.showModal.bind(this)}
                                      onPublish={this.publishProduct.bind(this)}
                />
                <ProductPreviewModal onClose={this.hideModal.bind(this)} modalVisible={this.state.modalVisible}
                                     product={this.state.product}/>
            </div>
        );
    }
}
