import React from 'react';
import ProductCreateProcess from "../../components/ProductCreateProcess/ProductCreateProcess";
import CategoryService from "../../services/CategoryService";
import AuthService from "../../services/AuthService";
import {message} from "antd";
import ProductService from "../../services/ProductService";

export class ProductCreateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    onChange() {

    }

    onFinish(values) {
        const {categories, name, description, ean, deliveryDays, priceLevel, certificates, images} = values;
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                "name": name,
                "description": description,
                "ean": ean,
                "images": images,
                "deliveryDays": deliveryDays,
                "priceLevel": priceLevel,
                "certificates": certificates,
                "categories": categories
            }
        }));
        console.log(this.state.product)
        // ProductService.createProduct(categories, name, description, ean, deliveryDays, priceLevel, certificates, images)
        //     .then(() => {
        //         this.props.history.push('/login');
        //         message.success(`Willkommen an Board!`);
        //     })
        //     .catch((err) => {
        //         message.error('Registrierung fehlgeschlagen!');
        //     });
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


    render() {
        return (
            <ProductCreateProcess categories={this.state.categories}
                                  product={this.state.product}
                                  onFinish={this.onFinish.bind(this)}/>
        );
    }
}
