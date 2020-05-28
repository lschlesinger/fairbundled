import React from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

export default class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getSubMenuItem(category) {
        return (
            this.getMenuItems(category)
        )
    }

    getSubMenu(category) {
        return (
            <SubMenu title={category.name} key={category._id}>
                {category.subcategories.map((subcat) => this.getSubMenuItem(subcat))}
            </SubMenu>
        )
    }

    getMenuItems(category) {
        if (category.subcategories && category.subcategories.length > 0) {
            return this.getSubMenu(category);
        }
        return (
            <Menu.Item key={category._id}>
                <Link to={`/product?category=${category.name}`}>
                    {category.name}
                </Link>
            </Menu.Item>
        );
    }

    render() {
        return (
            <Menu mode="horizontal">
                {this.props.categories.map((c) => this.getMenuItems(c))}
                <Menu.Item key="Angebote" style={{fontWeight: 'bold'}}> Alle Angebote </Menu.Item>
            </Menu>
        )
    }
}
