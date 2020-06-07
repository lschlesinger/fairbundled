import React from "react";


export default class ProductInformationText extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {this.props.product.name}
            </div>
        )
    }
}
