import React from "react";
import FairbundleService from "../../services/FairbundleService";

const DEFAULT_EXPIRATION_PERIOD_IN_WEEKS = 2;

export default class CreateFairbundleModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expiration: new Date(new Date().setDate(new Date().getDate() + (DEFAULT_EXPIRATION_PERIOD_IN_WEEKS * 7))),
            expirationAction: "force",
            targetPrice: this.props.product.priceLevel[0]
        };
    }

    //TODO: create ModalView to select fairbundle options and set state variable accordingly

    //TODO: trigger backend with button click (use FairbundleService.createFairbundle(...))
    onClick = async () => {
        await FairbundleService.createFairbundle(this.props.qty, this.props.productId, this.state.expiration, this.state.expirationAction, this.state.targetPrice)
    }

}
