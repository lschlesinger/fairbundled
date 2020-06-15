import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillTextArea.less';

export default class QuillTextArea extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            editorHtml: this.props.product.description ? this.props.product.description : null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(html) {
        this.setState({editorHtml: html});
        this.props.onChange(this.state.editorHtml);
    }

    render() {
        return (
            <ReactQuill
                theme="snow"
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={QuillTextArea.modules}
                formats={QuillTextArea.formats}
                placeholder="Fügen Sie hier die Beschreibung ein."
            />
        )
    }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillTextArea.modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video']
    ]
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillTextArea.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];
