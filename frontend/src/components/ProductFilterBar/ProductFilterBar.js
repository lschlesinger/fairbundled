import React from "react";

import {Menu, message, Avatar, Checkbox, Col, Form, Row, Typography} from 'antd';
import "./ProductFilterBarStyles.less"
import CertificateService from "../../services/CertificateService";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Paragraph } = Typography

class FilterBar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.initState();
    }

    initState() {
        this.state = {
            openKeys: ['certificates'],
            certificates: []
        }
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
            openKeys: openKeys,
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

    getGroupedCertificates(certs) {

        let groupedCerts = certs.reduce(function (r, a) {
            r[a.sector] = r[a.sector] || [];
            r[a.sector].push(a);
            return r;
        }, Object.create(null));

        let code = [];

        for (let [key, value] of Object.entries(groupedCerts)) {
            code.push(
            <SubMenu
                key={key}
                title={key}>   
                <Form.Item name={key}>
                <Checkbox.Group style={{width: '100%'}}>
                    {value.map((c) => this.getCheckboxes(c))}
                </Checkbox.Group>
                </Form.Item>
            </SubMenu>);
        }

        return code;
    }

    onFinish(values) {
        let entries = Object.entries(values);
        let arrays = entries.map(e => e[1]);
        var selectedCerts = [].concat.apply([], arrays);

        console.log(selectedCerts);

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
                            {this.getGroupedCertificates(this.state.certificates)}
                        </SubMenu>
                    </Menu> 
            </Form>
        )
    }
}

export default withRouter(FilterBar);

//{this.state.certificates.map(c => this.getCheckboxes(c))}