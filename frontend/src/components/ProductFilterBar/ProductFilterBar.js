import React from "react";

import {Menu, Checkbox, message} from 'antd';
import "./ProductFilterBarStyles.less"
import CertificateService from "../../services/CertificateService";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;

class FilterBar extends React.Component {

    rootSubmenuKeys = ['certificates'];

    constructor(props, context) {
        super(props, context);

        this.initState();
    }

    initState() {
        const category = this.props.location.search.includes('category') ? this.props.location.search.split('category=')[1].split("&")[0] : "";
        const searchString = this.props.location.search.includes('searchString') ? this.props.location.search.split('searchString=')[1].split("&")[0] : "";
        const selectedCerts = this.props.location.search.includes('certificate') ? this.props.location.search.split('certificate=')[1].split("&")[0].split("|") : [];
        this.state = {
            category: category,
            searchString: searchString,
            selectedCerts: selectedCerts,
            openKeys: ['certificates'],
            certificates: []
        }

        console.log(`Category: ${category}`);
        console.log(`Search: ${searchString}`);
        console.log(`Certs: ${selectedCerts.length}`);
    }

    componentWillMount() {
        this.getCertificates();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            //this.initState();
            this.getCertificates();
        }
    }

    async getCertificates() {
        try {
            this.setState({
                certificates: await CertificateService.getCertificates()
            });
        } catch (e) {
            message.error("Error fetching certificates." + " " + e.message);
        }
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    };

    onSelect = (item, key, keyPath, selectedKeys, domEvent) => {
        let certs = this.state.selectedCerts.filter(c => c !== item.key);
        this.setState({
            selectedCerts: certs.concat(item.key)
        })
    }

    getMenuItem(certificate) {
        return (
            <Menu.Item key={certificate._id} className="menuItem">
                <Link to={`/product?searchString=${this.state.searchString}&category=${this.state.category}&certificate=${this.state.selectedCerts.join("|")}`}>
                    <Checkbox>
                        {certificate.name}
                    </Checkbox>
                </Link>
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
                onSelect={this.onSelect}
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

export default withRouter(FilterBar);