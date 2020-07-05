import React from "react";
import {CloseCircleOutlined, SendOutlined} from '@ant-design/icons';
import {Row} from "antd";
import {Link} from "react-router-dom";

export default class AccountService {

    constructor() {
    }

    static getOrderTableColumns() {
        return [
            {
                title: 'Typ',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {
                        text: 'Fairbundle',
                        value: 'Fairbundle'
                    },
                    {
                        text: 'Direktbestellung',
                        value: 'Direktbestellung'
                    }
                ],
                onFilter: (value, record) => record.type.indexOf(value) === 0,
            },
            {
                title: 'Bestellnummer',
                dataIndex: 'order',
                key: 'order'
            },
            {
                title: 'Gesamtpreis',
                dataIndex: 'price',
                key: 'price',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawPrice - b.rawPrice
            },
            {
                title: 'Datum',
                dataIndex: 'submission',
                key: 'submission',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawSubmission - b.rawSubmission
            }
        ];
    }

    static getFairbundleTableColumns() {
        return [
            {
                title: 'Produkt',
                dataIndex: 'product',
                key: 'product',
                render: (product, record) => (
                    <Link to={`/product/${record.key}`}> {product}
                    </Link>
                ),
            },
            {
                title: 'Menge',
                dataIndex: 'qty',
                key: 'qty'
            },
            {
                title: 'Laufzeitende',
                dataIndex: 'expiration',
                key: 'expiration',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.rawExpiration - b.rawExpiration
            },
            {
                title: 'Zielpreis | Aktueller Preis',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Alternative',
                dataIndex: 'expirationAction',
                key: 'expirationAction',
                render: (expirationAction) => (
                    <Row justify="left">
                        {expirationAction === 'force' ? <SendOutlined/> : <CloseCircleOutlined/>}
                    </Row>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            }
        ];
    }

    static getPositionSubTableColumns() {
        return [
            {
                title: 'Produkt',
                dataIndex: 'product',
                key: 'product'
            },
            {
                title: 'Menge',
                dataIndex: 'qty',
                key: 'qty'
            },
            {
                title: 'Preis',
                dataIndex: 'price',
                key: 'price'
            }
        ];
    }


}
