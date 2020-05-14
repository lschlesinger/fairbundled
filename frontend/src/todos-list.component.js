import React, {Component} from "react";
import { DatePicker } from 'antd';


export default class TodosList extends Component{
    render() {
        return (
            <div>
                <p>Welcome to Todos List Component!!</p>
                <DatePicker/>
            </div>
        )
    }
}
