import React from 'react';
import CategoryHeaderMenu from "./CategoryHeaderMenu";
import SearchBar from "./SearchBar";
import {Col, Divider, Row} from 'antd';
import logo from '../../assets/logo.png';
import HeaderIconMenu from "./HeaderIconMenu";
import './FairbundledHeader.less';
import {withRouter} from "react-router-dom";

class FairbundledHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateObject();
    }

    getStateObject() {
        const categoryId = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        const searchString = this.props.location.search.includes('searchString') ? this.props.location.search.split('searchString=')[1].split("&")[0] : "";
        let currentRootCategory = "";
        let currentSubCategory = "";
        if (this.props.categories) {
            // flatten category object
            const flatCategories = this.props.categories
                .flatMap((c) => [c, ...(c.subcategories.map((s) => {
                    return {...s, parent: c._id}
                }))]);
            // get current category
            const category = flatCategories.find((c) => c._id === categoryId);
            if (category) {
                currentRootCategory = category.parent ? category.parent : category._id;
                currentSubCategory = category.parent ? category._id : "";
            }
        }
        return {
            currentRootCategory: currentRootCategory,
            currentSubCategory: currentSubCategory,
            currentSearchString: searchString
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            const state = this.getStateObject();
            this.setState(state);
        }
    }

    render() {
        return (
            // render all child components composing the header and pass on state variables if required
            <div>
                <Row justify="space-around" align="middle">
                    <Col span={7}>
                        <Row align="middle" justify="start">
                            <a href="/">
                                <img className="header__logo"
                                     src={logo} alt="LOGO"/>
                            </a>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <SearchBar
                            categories={this.props.categories}
                            currentSearchString={this.state.currentSearchString}
                            currentRootCategory={this.state.currentRootCategory}
                            currentSubCategory={this.state.currentSubCategory}
                        />
                    </Col>
                    <Col span={7}>
                        <HeaderIconMenu
                            openFairbundles={this.props.openFairbundles}
                            positions={this.props.positions}
                            isAuthenticated={this.props.isAuthenticated}
                            isMunicipality={this.props.isMunicipality}
                            isSupplier={this.props.isSupplier}
                            onLogout={this.props.onLogout}
                            entityName={this.props.entityName}
                        />
                    </Col>
                </Row>
                <Divider className="header__custom-divider"/>
                <Row justify="space-around">
                    <CategoryHeaderMenu
                        categories={this.props.categories}
                        currentRootCategory={this.state.currentRootCategory}
                        currentSubCategory={this.state.currentSubCategory}
                    />
                </Row>
                <Divider className="header__custom-divider-bottom"/>
            </div>
        );
    }
}

export default withRouter(FairbundledHeader);
