import React from "react";
import {Typography, Space} from "antd";
import {
    RocketOutlined
  } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

export default class JoinedFairbundle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let location = window.location.href;

        return (
            <div style={{paddingTop:50, paddingBottom:32}}>
                <Space style={{width:"100%", justifyContent:"center"}}><RocketOutlined style={{fontSize:250, color:"#686868"}}/></Space>
                <br/><br/><br/>
                <Space style={{width:"100%", justifyContent:"center"}}><Text style={{fontSize:38, color:"#454545", fontWeight:"bold"}}>{this.props.message}</Text></Space>
                <br/><br/>
                <Space style={{width:"100%", justifyContent:"center"}}><Paragraph copyable={{text: location}} style={{fontSize:30, color:"#454545", fontWeight:"bold", color:"#78A262"}}>Link kopieren</Paragraph></Space>
            </div>
        )
    }
}