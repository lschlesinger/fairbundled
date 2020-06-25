import React from 'react';
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductService from "../../services/ProductService";
import FairbundleService from "../../services/FairbundleService";
import {Breadcrumb, Col, message, Row} from "antd";
import {Link} from "react-router-dom";


export class ProductDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            product: null,
            fairbundles: null,
            qty: 0
        };
        console.log(this.props);
    }

    componentDidMount() {
        this.getProductAndFairbundles();
    }

    async getProductAndFairbundles() {
        try {
            const product = await ProductService.getProduct(this.state.productId);
            const fairbundles = await FairbundleService.getFairbundlesByProductId(this.state.productId);
            this.setState({
                product: product,
                fairbundles: fairbundles
            })
        } catch (e) {
            message.error("Error fetching Product and associated Fairbundles.")
        }
    }

    onCreateFairbundle = ({qty}) => {
        this.setState({qty: qty});
        //TODO: open createFairbundleModal with state variables productId and quantity
        console.log("Create fairbundle", qty);
    };

    onJoinFairbundle = ({fairbundleId, qty}) => {
        this.setState({qty: qty});
        //TODO: open joinFairbundleModal with fairbundleId and state variables productId and quantity
        console.log("Join fairbundle", qty);
    };

    onCreateOrder = (qty) => {
        this.setState({qty: qty});
        //TODO: open createOrderModal with state variables productId and quantity
        console.log("Create order", qty);
    };

    renderBreadcrumb = (parent, child) => {
        return (
            <Row>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item
                        key={parent._id}>
                        <Link to={`/product?category=${parent._id}`}>
                            {parent.name}
                        </Link>
                    </Breadcrumb.Item>
                    {child ? <Breadcrumb.Item
                        key={child._id}>
                        <Link to={`/product?category=${child._id}`}>
                            {child.name}
                        </Link>
                    </Breadcrumb.Item> : ""}
                </Breadcrumb>
            </Row>
        );
    };

    renderBreadcrumbs = () => {
        if (this.state.product) {
            const rootCategories = this.state.product.categories.filter((c) => c.root);
            const childCategories = this.state.product.categories.filter((c) => !c.root);
            let breadcrumbs = [];
            let parentsWithChildren = [];
            // all child categories should be included
            for (let cc in childCategories) {
                const childC = childCategories[cc];
                const parent = rootCategories.find((rc) => rc.subcategories.find((sc) => sc._id === childC._id));
                parentsWithChildren.push(parent);
                breadcrumbs.push({parent: parent, child: childC});
            }
            for (let rc in rootCategories) {
                const rootC = rootCategories[rc];
                if (!parentsWithChildren.find((c) => c._id === rootC._id)) {
                    breadcrumbs.push({parent: rootC});
                }
            }
            return (
                <Col className="padding--md">{
                    breadcrumbs.map((b) => this.renderBreadcrumb(b.parent, b.child))
                }</Col>
            );
        }
        return null;
    };


    render() {
        return (
            <Col>
                <Row>
                    {this.renderBreadcrumbs()}
                </Row>
                <Row>
                    <ProductDetails product={this.state.product}
                                    fairbundles={this.state.fairbundles}
                                    onCreateFairbundle={this.onCreateFairbundle}
                                    onJoinFairbundle={this.onJoinFairbundle}
                                    onCreateOrder={this.onCreateOrder}/>
                </Row>
            </Col>
        )
    }
}
