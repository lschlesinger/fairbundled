import React from "react";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductService from "../../services/ProductService";
import PositionService from "../../services/PositionService";
import FairbundleService from "../../services/FairbundleService";
import {Breadcrumb, Col, message, notification, Row} from "antd";
import ValidationError from "../../services/ValidationError";
import JoinFairbundleModalView from "./FairbundledJoinedModalView";
import CreateFairbundleModalView from "./FairbundleCreatedModalView";
import FairbundleSuccessView from "./FairbundleSuccessView";
import {Link} from "react-router-dom";
import {Spinner} from "../../components/Functional/Spinner";

export class ProductDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            product: null,
            fairbundles: null,
            qty: 0,
            joinModalVisible: false,
            createModalVisible: false,
            successVisible: false,
            joinedFairbundle: null,
            successMessage: "",
            successLink: false,
        };
    }

    componentDidMount() {
        this.getProductAndFairbundles();
    }

    async getProductAndFairbundles() {
        try {
            const product = await ProductService.getProduct(
                this.state.productId
            );
            // get all pending fairbundles
            let fairbundles = await FairbundleService.getFairbundlesByProductId(
                this.state.productId
            );

            if (fairbundles.length > 0) {
                fairbundles.forEach((fairbundle) => {
                    fairbundles = fairbundles.filter(
                        (fb) =>
                            fb.submission === null && fb.cancellation === null
                    );
                });
            }

            this.setState({
                product: product,
                fairbundles: fairbundles,
            });
        } catch (e) {
            message.error("Error fetching Product and associated Fairbundles.");
        }
    }

    onShowCreateFairbundle = ({qty}) => {
        this.setState({qty: qty});
        this.showModal(false);
    };

    onShowJoinFairbundle = ({fairbundleId, qty}) => {
        this.setState({
            qty: qty,
            joinedFairbundle: this.state.fairbundles.find(
                (f) => f._id === fairbundleId
            ),
        });

        this.showModal(true);
    };

    joinFairbundle = () => {
        FairbundleService.joinFairbundle(
            this.state.joinedFairbundle._id,
            this.state.qty
        )
            .then((fairbundle) => {
                this.getProductAndFairbundles();
                this.props.onUpdate();
                this.setState({
                    successVisible: true,
                    successMessage: "Fairbundle beigetreten",
                    successLink: false,
                    joinModalVisible: false,
                });
            })
            .catch((err) => {
                if (err instanceof ValidationError) {
                    Object.entries(err.errors).map((e) => {
                        this.getErrorNotification(e);
                    });
                }
            });
    };

    createFairbundle = (expirationDate, expirationAction, targetPrice) => {
        FairbundleService.createFairbundle(
            this.state.qty,
            this.state.product._id,
            expirationDate.format("x"),
            expirationAction,
            targetPrice
        )
            .then((fairbundle) => {
                this.getProductAndFairbundles();
                this.props.onUpdate();
                this.setState({
                    successVisible: true,
                    successMessage: "Fairbundle erstellt",
                    successLink: true,
                    createModalVisible: false,
                });
            })
            .catch((err) => {
                if (err instanceof ValidationError) {
                    Object.entries(err.errors).map((e) => {
                        this.getErrorNotification(e);
                    });
                }
            });
    };

    onCreateOrder = (qty) => {
        this.setState({qty: qty});

        PositionService.addPosition(qty, this.state.product._id)
            .then((product) => {
                this.props.onUpdate();
                this.setState({
                    successVisible: true,
                    successMessage: "Produkt im Warenkorb platziert",
                    successLink: false,
                    joinModalVisible: false,
                    createModalVisible: false,
                });
            })
            .catch((err) => {
                if (err instanceof ValidationError) {
                    Object.entries(err.errors).map((e) => {
                        this.getErrorNotification(e);
                    });
                }
            });
    };

    getErrorNotification = (e) => {
        const args = {
            type: "error",
            message: "Problem bei der Validierung",
            description: e[1].message,
            duration: 10,
        };
        notification.open(args);
    };

    showModal = (join) => {
        this.setState({
            joinModalVisible: join,
            createModalVisible: !join,
        });
    };

    hideModal = () => {
        this.setState({
            joinModalVisible: false,
            createModalVisible: false,
            successVisible: false,
        });
    };

    renderBreadcrumb = (parent, child, index) => {
        return (
            <Row key={parent._id + index}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item key={parent._id}>
                        <Link to={`/product?category=${parent._id}`}>
                            {parent.name}
                        </Link>
                    </Breadcrumb.Item>
                    {child ? (
                        <Breadcrumb.Item key={child._id}>
                            <Link to={`/product?category=${child._id}`}>
                                {child.name}
                            </Link>
                        </Breadcrumb.Item>
                    ) : (
                        ""
                    )}
                </Breadcrumb>
            </Row>
        );
    };

    renderBreadcrumbs = () => {
        if (this.state.product) {
            const rootCategories = this.state.product.categories.filter(
                (c) => c.root
            );
            const childCategories = this.state.product.categories.filter(
                (c) => !c.root
            );
            let breadcrumbs = [];
            let parentsWithChildren = [];
            // all child categories should be included
            for (let cc in childCategories) {
                const childC = childCategories[cc];
                const parent = rootCategories.find((rc) =>
                    rc.subcategories.find((sc) => sc._id === childC._id)
                );
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
                <Col className="padding--md">
                    {breadcrumbs.map((b, index) =>
                        this.renderBreadcrumb(b.parent, b.child, index)
                    )}
                </Col>
            );
        }
        return null;
    };

    render() {
        const product = this.state.product;
        const fairbundles = this.state.fairbundles;
        let productDetailComponent = <Spinner/>;
        if (product && fairbundles) {
            productDetailComponent = <ProductDetails
                product={this.state.product}
                fairbundles={this.state.fairbundles}
                onCreateFairbundle={this.onShowCreateFairbundle}
                onJoinFairbundle={this.onShowJoinFairbundle}
                onCreateOrder={this.onCreateOrder}
            />
        }

        return (
            <Col>
                <Row>{this.renderBreadcrumbs()}</Row>
                <Row>
                    <div style={{width: "100%"}}>
                        {productDetailComponent}
                        <JoinFairbundleModalView
                            quantity={this.state.qty}
                            fairbundle={this.state.joinedFairbundle}
                            joinFairbundle={this.joinFairbundle}
                            onClose={this.hideModal}
                            modalVisible={this.state.joinModalVisible}
                        />
                        <CreateFairbundleModalView
                            quantity={this.state.qty}
                            product={this.state.product}
                            createFairbundle={this.createFairbundle}
                            onClose={this.hideModal}
                            modalVisible={this.state.createModalVisible}
                        />
                        <FairbundleSuccessView
                            message={this.state.successMessage}
                            showLink={this.state.successLink}
                            onClose={this.hideModal}
                            modalVisible={this.state.successVisible}
                        />
                    </div>
                </Row>
            </Col>
        );
    }
}
