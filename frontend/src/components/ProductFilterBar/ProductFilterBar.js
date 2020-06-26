import React from "react";
import {Avatar, Checkbox, Form, Menu, Row, Typography} from 'antd';
import "./ProductFilterBarStyles.less"
import {withRouter} from "react-router-dom";

const {SubMenu} = Menu;
const {Paragraph} = Typography;

class FilterBar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.initState();
    }

    initState() {
        this.state = {
            openKeys: ['certificates'],
            certificates: this.props.certificates
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.certificates === prevProps.certificates) {
            return;
        }

        this.setState(prevState => ({
                ...prevState,
                certificates: this.props.certificates
            }
        ));
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
    };

    getCheckboxes(cert) {
        return (
            <Row key={cert._id} justify="start" className="margin-vertical--sm padding-left--xl">
                <Checkbox value={cert._id}>
                    <Avatar shape="square"
                            size="small"
                            src={cert.logo}/>
                    <span className="filter-bar__cert-name padding-left--sm">{cert.name?.split(" - ")[0]}</span>
                </Checkbox>
            </Row>);
    }

    getGroupedCertificates(certs) {
        if (certs == null) {
            return []
        }


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
                    <Form.Item name={key} className="margin-bottom--xs">
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
        let selectedCerts = [].concat.apply([], arrays);

        this.props.onSelectedCertsChanged(selectedCerts);
    }


    render() {
        return (
            <Form className="full-height" onValuesChange={(changedValues, values) => this.onFinish(values)}>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    className="filter-bar__menu-title full-height">
                    <SubMenu
                        className="padding--sm"
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
