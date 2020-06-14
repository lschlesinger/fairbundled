import React from 'react';
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import './CategoryHeaderMenu.less';

const {SubMenu} = Menu;

class CategoryHeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRootCategory: this.props.currentRootCategory,
            currentSubCategory: this.props.currentSubCategory,
            selectedKeys: [this.props.currentRootCategory, this.props.currentSubCategory]
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentRootCategory !== prevProps.currentRootCategory ||
            this.props.currentSubCategory !== prevProps.currentSubCategory) {
            this.setState({
                currentRootCategory: this.props.currentRootCategory,
                currentSubCategory: this.props.currentSubCategory,
                selectedKeys: [this.props.currentRootCategory, this.props.currentSubCategory]
            });
        }
    }

    getSubMenuItem(category) {
        // sub menu item != root level categories
        return (
            this.getMenuItems(category)
        )
    }

    getSubMenu(category) {
        const navigateToCategory = ({key, domEvent}) => {
            // navigate to route with category query param (if root category is selected)
            this.props.history.push(`/product?category=${key}`);
        };

        return (
            // root level categories
            <SubMenu title={category.name}
                     key={category._id}
                     className={this.state.currentRootCategory === category._id ? `ant-menu-submenu-selected ant-menu-submenu-active` : ""}
                     onTitleClick={navigateToCategory}>
                {category.subcategories.map((subcat) => this.getSubMenuItem(subcat))}
            </SubMenu>
        )
    }

    getMenuItems(category) {
        if (category.subcategories && category.subcategories.length > 0) {
            return this.getSubMenu(category);
        }
        return (
            // navigate to route with category query param (if sub-category is selected)
            <Menu.Item key={category._id}>
                <Link to={`/product?category=${category._id}`}>
                    {category.name}
                </Link>
            </Menu.Item>
        );
    }

    render() {
        return (
            <Menu className="category-header-menu__menu"
                  selectedKeys={this.state.selectedKeys}
                  mode="horizontal">
                {this.props.categories.map((c) => this.getMenuItems(c))}
                <Menu.Item
                    className={this.state.currentRootCategory === "" ? `ant-menu-item-selected ant-menu-item-active` : ""}
                    key="">
                    <Link to={`/product`}>
                        Alle Produkte
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(CategoryHeaderMenu);
