import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
 
class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose = () => {
        this.setState({
            open: false
        });
    }
 
    handleSave = (files) => {
        const { handleUploadSubmit } = this.props;
        handleUploadSubmit(files);

        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files, 
            open: false
        });
    };
 
    handleOpen = () => {
        this.setState({
            open: true,
        });
    };
 
    render() {
        const { disable, filesLimit, } = this.props;
        return (
            <div>
                <Button onClick={this.handleOpen} disabled={disable}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={25000000}
                    onClose={this.handleClose}
                    filesLimit={filesLimit}
                />
            </div>
        );
    }
}

export default FileUploader;