import React from 'react';
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import './CategoryHeaderMenu.less';

const {SubMenu} = Menu;

class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        // get query param for category from route (req. export withRouter)
        const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        this.state = {
            category: category
        };
    }

    componentDidUpdate(prevProps) {
        // if category param changed update category variable
        if (this.props.location !== prevProps.location) {
            const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
            this.setState({
                category: category
            })
        }
    }

    getSelectedKeys() {
        // get currently selected category
        return [this.state.category];
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
                  mode="horizontal"
                  selectedKeys={this.getSelectedKeys()}>
                {this.props.categories.map((c) => this.getMenuItems(c))}
                <Menu.Item key="Angebote"> Alle Angebote </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(CategoryHeaderMenu);
