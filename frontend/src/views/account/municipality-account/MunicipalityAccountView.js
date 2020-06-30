import React from "react";
import {Col, message, Row} from "antd";
import UserService from "../../../services/UserService";
import MyEntityData from "../../../components/AccountComponent/MyEntityData";
import ActivityOverview from "../../../components/AccountComponent/MunicipalityAccountContent/ActivityOverview";
import FairbundledAdvantage from "../../../components/AccountComponent/MunicipalityAccountContent/FairbundledAdvantage";
import PositionService from "../../../services/PositionService";

export class MunicipalityAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            municipality: null,
            user: this.props.user,
        };
    }

    componentDidMount() {
        this.getMunicipalityInfo();
    }

    async getMunicipalityInfo() {
        try {
            let municipalityInfo = this.props.municipality;
            municipalityInfo = await PositionService.getPositionsInfo(municipalityInfo);
            municipalityInfo.user = await UserService.getEntityUsers();
            this.setState({municipality: municipalityInfo});
        } catch (e) {
            message.error("Error fetching municipality Information.");
        }
    }

    render() {
        return (
            <Row
                gutter={[24, 24]}
                className="padding-horizontal--lg"
                justify="space-around"
            >
                <Col span={9}>
                    {this.state.municipality ? (
                        <MyEntityData
                            entity={this.state.municipality}
                            user={this.state.user}
                        />
                    ) : ("")}
                </Col>
                <Col span={9}>
                    {this.state.municipality ? (
                        <ActivityOverview municipality={this.state.municipality}/>
                    ) : ("")}
                </Col>
                <Col span={6}>
                    {this.state.municipality ? (
                        <FairbundledAdvantage municipality={this.state.municipality}/>
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
        );
    }
}
