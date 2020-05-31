import React from 'react';
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import './CategoryHeaderMenu.less';

const {SubMenu} = Menu;

class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        this.state = {
            category: category
        };
        console.log(this.state);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
            this.setState({
                category: category
            })
        }
    }

    getSubMenuItem(category) {
        return (
            this.getMenuItems(category)
        )
    }

    getSubMenu(category) {
        const navigateToCategory = ({ key, domEvent }) => {
            this.props.history.push(`/product?category=${key}`);
        };

        return (
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
            <Menu.Item key={category._id}>
                <Link to={`/product?category=${category._id}`}>
                    {category.name}
                </Link>
            </Menu.Item>
        );
    }

    getSelectedKeys() {
        return [this.state.category];
    }

    render() {
        return (
            <Menu mode="horizontal"
                  selectedKeys={this.getSelectedKeys()}>
                {this.props.categories.map((c) => this.getMenuItems(c))}
                <Menu.Item key="Angebote" style={{fontWeight: 'bold'}}> Alle Angebote </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(CategoryHeaderMenu);
