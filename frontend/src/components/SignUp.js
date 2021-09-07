import React from "react";
import './resources/signup.css'
import UploadService from '../services/upload-photo'

class SignUp extends React.Component {

    constructor(props) {

        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
        };
    }

    selectFile(event) {
        this.setState({
          selectedFiles: event.target.files,
        });
    }

    upload() {

        let currentFile = this.state.selectedFiles[0];
    
        this.setState({
            progress: 0,
            currentFile: currentFile,
        });
    
        UploadService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
        .then((response) => {
            console.log(response)
            this.setState({
              //message: response.data.message,
              selectedFiles: undefined,
              currentFile: undefined,

            });
        })
        .catch(() => {
            this.setState({
                progress: 0,
                message: "Could not upload the file!",
                currentFile: undefined,
            });
        });
    
        this.setState({
          selectedFiles: undefined,
        });
    }

    render() {

        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
        } = this.state;
      
        return (
            <div>
                <h2>SignUp</h2>
                
                    <input id="photoUploader" type="file" onChange={this.selectFile} />
                    <button disabled={!selectedFiles} onClick={this.upload}>Sign up</button>
                    
            </div>
        );
    }

}

export default SignUp;
