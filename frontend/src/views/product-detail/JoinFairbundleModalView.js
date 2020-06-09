import React from "react";
import FairbundleService from "../../services/FairbundleService";


export default class JoinFairbundleModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fairbundle: null
        };
    }

    //TODO: get fairbundle by Id from Backened and set state

    //TODO: create ModalView to confirm fairbundleOptions of selected fairbundle

    // TODO: trigger backend with button click (use FairbundleService.joinFairbundle(...))
    onClick = async () => {
        await FairbundleService.joinFairbundle(this.props.qty, this.props.productId, this.state.fairbundle.expiration, this.state.fairbundle.expirationAction, this.state.fairbundle.targetPrice)
    }

}
