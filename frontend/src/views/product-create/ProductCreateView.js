import React from 'react';
import ProductCreateProcess from "../../components/ProductCreateProcess/ProductCreateProcess";
import CategoryService from "../../services/CategoryService";
import AuthService from "../../services/AuthService";
import ProductPreviewModal from "../../components/ProductCreateProcess/ProductPreviewModal";
import ProductService from "../../services/ProductService";

export class ProductCreateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            categories: [],
            product: {
                "name": null,
                "description": null,
                "ean": null,
                "images": null,
                "deliveryDays": null,
                "priceLevel": [],
                "certificates": [],
                "supplier": null,
                "categories": []
            }
        };
    }

    componentWillMount() {
        this.getCategories();
        this.getSupplierId();
    }

    onFinish(values) {
        const {categories, name, description, ean, deliveryDays, priceLevel, certificates, images} = values;
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                "name": name ? name : prevState.product.name,
                "description": description ? description : prevState.product.description,
                "ean": ean ? ean : prevState.product.ean,
                "images": images ? images : prevState.product.images ,
                "deliveryDays": deliveryDays ? deliveryDays : prevState.product.deliveryDays,
                "priceLevel": priceLevel ? priceLevel : prevState.product.priceLevel,
                "certificates": certificates ? certificates : prevState.product.certificates,
                "categories": categories ? categories : prevState.product.categories
            }
        }));
        console.log(this.state.product)
    }

    async getCategories() {
        this.setState({
            categories: await CategoryService.getCategories()
        })
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
        await ProductService.createProduct(this.state.product)
    }


    render() {
        return (
            <div>
                <ProductCreateProcess categories={this.state.categories}
                                      product={this.state.product}
                                      onFinish={this.onFinish.bind(this)}
                                      onPreview={this.showModal.bind(this)}
                                      onPublish={this.publishProduct.bind(this)}
                />
                <ProductPreviewModal onClose={this.hideModal.bind(this)} modalVisible={this.state.modalVisible} product={this.state.product}/>
            </div>
        );
    }
}
