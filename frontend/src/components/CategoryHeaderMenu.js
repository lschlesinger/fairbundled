import React from 'react';
import {Menu} from "antd";

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
                {category.name}
            </Menu.Item>
        );
    }

    render() {
        return (
            <Menu mode="horizontal">
                {this.props.categories.map((c) => this.getMenuItems(c))}
            </Menu>
        )
    }
}
