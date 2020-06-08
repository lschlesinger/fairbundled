import React from "react";
import {Avatar, Col, Collapse, Row, Typography} from "antd";
import './CertificateInformation.less';


const {Paragraph} = Typography;
const {Panel} = Collapse;

export default class CertificateInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCert: null
        }
    }

    getAvatars(cert) {
        // show certificate logo of associated product certificates with short information text and link to page
        return (
            <Col span="4">
                <Row justify="center">
                    <div onClick={() => this.setState({selectedCert: cert})}>
                        <Avatar
                            className={`product-details__certificate-avatar${this.state.selectedCert === cert ? "-active" : ""}`}
                            shape="square"
                            size="large"
                            src={cert.logo}/>
                    </div>
                </Row>
                <Row justify="center">
                    <Paragraph ellipsis className="padding--sm product-detail__certificate-name">{cert.name}</Paragraph>
                </Row>
            </Col>);
    }

    renderCertificateInformation(cert) {
        return (cert ?
            <Row>
                <Col offset={1}>
                    <h3>{cert.name}</h3>
                    <Paragraph>
                        {cert.description}
                    </Paragraph>
                    <Paragraph>
                        <a href={cert.url} target="_blank"> Hier </a>
                        gelangen Sie zur offiziellen Seite von {cert.name}.
                    </Paragraph>
                </Col>
            </Row>
            : "");
    }

    render() {
        return (
            <Col span={24}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Informationen zur Nachhaltigkeit dieses Produkts" key="1">
                        <Row justify="start" gutter={[0, 6]}>
                            {this.props.product?.certificates?.length > 0 ? this.props.product.certificates.map((c) => this.getAvatars(c)) : "Keine Informationen verfügbar"}
                        </Row>
                        <Row>
                            {this.renderCertificateInformation(this.state.selectedCert)}
                        </Row>
                    </Panel>
                </Collapse>
            </Col>
        )
    }
}
