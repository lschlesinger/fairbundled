import React from "react";

import {Menu} from 'antd';
import "./ProductFilterBarStyles.less"

const { SubMenu } = Menu;

export default class FilterBar extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    rootSubmenuKeys = ['certificates'];

    state = {
        openKeys: ['certificates'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                multiple="true"
                className="menuTitle"
            >
                <SubMenu
                key="certificates"
                title="Produktsiegel">                
                <Menu.Item key="1" className="menuItem">Option 1</Menu.Item>
                <Menu.Item key="2" className="menuItem">Option 2</Menu.Item>
                <Menu.Item key="3" className="menuItem">Option 3</Menu.Item>
                <Menu.Item key="4" className="menuItem">Option 4</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}