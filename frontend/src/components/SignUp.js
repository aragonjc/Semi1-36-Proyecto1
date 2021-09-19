import React from "react";
import './resources/signup.css';
import UploadService from '../services/upload-file';
import http from "../http/http-commons";
import { Link } from "react-router-dom";

class SignUp extends React.Component {

    constructor(props) {

        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
            pathPhoto:undefined
        };
    }

    componentDidMount() {
        if(localStorage.getItem('auth-token')) {
            const token = localStorage.getItem('auth-token');
            http.post('/auth/check',{token:token})
            .then(response=>{
                this.props.history.push('/');
            })
            .catch(err=>err);
        }
    }

    handleSubmit(event) {
        const messageSpan = document.getElementById("msg");
        const newUser = {
            nickname:this.state.username,
            email:this.state.email,
            password:this.state.password,
            photourl:this.state.pathPhoto
        }

        if(this.state.password !== this.state.passwordCheck) {
            messageSpan.textContent = "Error las constraseñas no coinciden";
        } else {
            http.post("/auth/signup",newUser)
                .then(response=>{
                    console.log(response);
                    this.props.history.push("/signin");
                })
                .catch(err=>{
                    console.log(err);
                    messageSpan.textContent = "Error usuario no registrado";
            });
        }
        event.preventDefault();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        })
        document.getElementById("msg").textContent = "";
    }

    selectFile(event) {
        this.setState({
          selectedFiles: event.target.files,
        });
    }

    async upload(event) {

        document.getElementById("upload-btn").textContent = "Archivo Seleccionado"
        await this.setState({
            selectedFiles: event.target.files,
          });
        
        console.log(this.state.selectedFiles)
        let fileStatus = document.getElementById("file"); 
        if(fileStatus.files.length !== 0) {
            //alert("FILE")
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
                console.log(response.data)
                this.setState({
                //message: response.data.message,
                selectedFiles: undefined,
                currentFile: undefined,
                pathPhoto:response.data.url,

                });
                document.getElementById("msg").textContent = "Foto cargada";
                document.getElementById("msg").className = "green";
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
    }

    render() {

        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
            pathPhoto
        } = this.state;
      
        return (
            <div className="signup-wrapper">
                <div className="signup-div">
                    <div className="signup-inner">
                        <h2>SignUp</h2>
                        <div className="signup-inner-div">
                            <form>
                                <div className="signup-user">
                                    <label htmlFor="username" >Usuario</label>
                                    <input type="text" placeholder="Username" name="username" onChange={this.handleChange} required/>
                                </div>
                                <div className="signup-email">
                                    <label htmlFor="email" >Correo Electronico</label>
                                    <input type="email" placeholder="Email" name="email" onChange={this.handleChange} required/>
                                </div>
                                <div className="signup-password">
                                    <label htmlFor="password" >Contraseña</label>
                                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange} required/>
                                </div>
                                <div className="signup-checkpassword">
                                    <label htmlFor="passwordCheck" >Confirmar Contraseña</label>
                                    <input type="password" placeholder="Password" name="passwordCheck" onChange={this.handleChange} required/>
                                </div>
                                <div className="signup-file">
                                    <input type="file" name="file" id="file"  className="inputfile" onChange={this.upload} />
                                    <label htmlFor="file" id="upload-btn">Choose a file</label>
                                </div>
                                <div className="msg-div">
                                    <span id="msg"></span>
                                </div>
                                <button disabled={!pathPhoto} onClick={this.handleSubmit} >Sign up</button>
                            </form>
                            <Link to='/signin'>Iniciar Sesion</Link>
                        </div>
                    </div>                          
                </div>
            </div>
        );
    }

}

export default SignUp;
