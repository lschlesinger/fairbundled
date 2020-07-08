import React from 'react';
import {Button, Card, Col, Layout, message, Row, Tag, Typography, Divider, Anchor, Carousel, Avatar} from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import './LandingView.less';


import "../../components/ProductListCard/ProductListCard.less";

import ProductRecommendations from "../../components/ProductRecommendations/ProductRecommendations";
import ProductService from "../../services/ProductService";
import HttpService from "../../services/HttpService";
import placeholder from "../../assets/placeholder.png";
import {Link} from "react-router-dom";
import Corona from "../../assets/Corona.png";
import Feuerwehr from "../../assets/Feuerwehr.png";
import Computer from "../../assets/Computer.png";
import Fairbundled from "../../assets/Fairbundled.png";
import BlauerEngel from "../../assets/BlauerEngel.png";
import EcoLabel from "../../assets/EcoLabel.png";
import FairStone from "../../assets/FairStone.jpg";
import TCO from "../../assets/TCO.jpg";
import Fairtrade from "../../assets/Fairtrade.jpg";

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;
const { Paragraph, Text, Title } = Typography;
//const {Link} = Anchor;
class FairbundlePrinciple extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {
        return (
       <Layout className="landing-view__layout">
           <Row gutter={[8, 48]}>
                       <Divider>Das Fairbundle Prinzip</Divider>
           </Row>

           <Row>
               <Col span={8} align = "middle">
                   <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
               </Col>
               <Col span={8} align = "middle">
                   <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
               </Col>
               <Col span={8} align = "middle">
                   <SmileTwoTone twoToneColor="#78A262" style={{ fontSize: '32px'}}/>
               </Col>

           </Row>

           <Row  className="landing-view__content_headline">
               <Col span={8} align = "middle">
                   Faire Preise..
               </Col>
               <Col span={8} align = "middle">
                   ..für Kommunen..
               </Col>
               <Col span={8} align = "middle">
                  ..nachhaltig
               </Col>

           </Row>
           <Row gutter={[8,48]}>
               <Col span={8} align = "middle">
                   Aufgrund unseres Fairbundle-Prinzips können Anbieter in größeren Mengen produzieren.
                   Dadurch können wir die Produkte zu den Preisen anbieten, bei denen jeder profitiert.
                   Treten Sie einem Fairbunndle bei oder erstellen Sie Ihr eigenes Fairbundle
                   von den günstigsten Preisen zu profitieren
               </Col>
               <Col span={8} align = "middle">
                   Der Prozess der kommunalen Beschaffung ist kompliziert und häufig umständlich - das
                   wissen wir. Mit Hilfe von fairbundled.de gibt es nun endlich die Möglichkeit
                   alles über einen zentralen Marktplatz einzukaufen.
               </Col>
               <Col span={8} align = "middle">
                   Nachhaltigkeit ist uns ein großes Anliegen. Wir arbeiten daher nur mit
                   zertifizierten Unternehmen, die unsere hohen Standards erfüllen. Filtern Sie gerne nach
                   den Nachhaltigkeits-Zertifikaten in der Produktübersicht, um den Vorgaben Ihrer Kommune gerecht
                   zu werden und nachhaltig einzukaufen.
               </Col>

           </Row>
           <Row gutter={[8, 48]}>
               <Col span={24} align="middle">
                   <img className="landing__picture_big"
                        src={Fairbundled} alt="Fairbundled"/>
               </Col>

           </Row>
       </Layout>
   );
}
}

