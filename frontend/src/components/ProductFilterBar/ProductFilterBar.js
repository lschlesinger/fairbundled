import React from "react";

import {Menu, message, Avatar, Checkbox, Col, Form, Row, Typography} from 'antd';
import "./ProductFilterBarStyles.less"
import CertificateService from "../../services/CertificateService";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Paragraph } = Typography

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

    getCheckboxes(cert) {
        return (
            <Row justify="start" className="margin-vertical--md">
                <Checkbox value={cert._id}>
                    <Avatar shape="square"
                            size="small"
                            src={cert.logo}/>
                    <span className="certName">{cert.name}</span>
                </Checkbox>
            </Row>);
    }

    onFinish(values) {
        console.log(values);
        const {certificates} = values;
        // this.setState(prevState => ({
        //     product: {
        //         ...prevState.product,
        //         "name": name ? name : prevState.product.name,
        //         "description": description ? description : prevState.product.description,
        //         "ean": ean ? ean : prevState.product.ean,
        //         "images": images ? this.getThumbUrls(images) : prevState.product.imagesUrl,
        //         "deliveryDays": deliveryDays ? deliveryDays : prevState.product.deliveryDays,
        //         "priceLevel": priceLevel ? priceLevel : prevState.product.priceLevel,
        //         "certificates": certificates ? certificates : prevState.product.certificates,
        //         "categories": categories ? categories : prevState.product.categories
        //     }
        // }), () => console.log(this.state.product));
    }


    render() {
        return (
            <Form onValuesChange={(changedValues, values) => this.onFinish(values)}> 
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    className="menuTitle">
                    <SubMenu
                        key="certificates"
                        title="Produktsiegel">   
                            <Form.Item name="certificates">
                            <Checkbox.Group style={{width: '100%'}}>
                                {this.state.certificates.map((c) => this.getCheckboxes(c))}
                            </Checkbox.Group>
                            </Form.Item>    
                    </SubMenu>
                </Menu>
            </Form>
        )
    }
}

export default withRouter(FilterBar);