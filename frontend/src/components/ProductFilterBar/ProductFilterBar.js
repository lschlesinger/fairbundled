import React from "react";

import {Menu, Checkbox, message} from 'antd';
import "./ProductFilterBarStyles.less"
import CertificateService from "../../services/CertificateService";

const { SubMenu } = Menu;

export default class FilterBar extends React.Component {

    rootSubmenuKeys = ['certificates'];

    state = {
        openKeys: ['certificates'],
        certificates: []
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.getCertificates();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getCertificates();
        }
    }

    async getCertificates() {
        try {
            this.setState({
                certificates: await CertificateService.getCertificates()
            });
        } catch (e) {
            message.error("Error fetching certificates.");
        }
    }

    onChange = e => {
        console.log(`checked = ${e.target.checked}`);
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    };

    getMenuItem(certificate) {
        return (
            <Menu.Item key={certificate.name} className="menuItem">
                <Checkbox onChange={this.onChange}>{certificate.name}</Checkbox>
            </Menu.Item>
        );
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className="menuTitle"
            >
                <SubMenu
                key="certificates"
                title="Produktsiegel">    
                    {this.state.certificates.map((c) => this.getMenuItem(c))}            
                </SubMenu>
            </Menu>
        )
    }
}