import React from "react";
import './resources/Upload.css'
import http from "../http/http-commons";
import UploadService from "../services/upload-file";
import fileExtension from "file-extension";

class Upload extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            selectedFiles:undefined,
            progress:0
        }
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {
        if(!localStorage.getItem('auth-token')) {
            this.props.history.push('/signin')
        } else {
            const token = localStorage.getItem('auth-token');
            http.post('/auth/check',{token:token})
            .then(response=>{
                this.setState({_id:response.data._id});
            })
            .catch(err=>this.props.history.push('/signin'));
        }
        
    }

    async upload() {
        //Verificar password primero
        //verificar que ningun campo este vacio

        const inputPassword = document.getElementById("password").value;
        if(!inputPassword) {
            return;
        }

        const token = localStorage.getItem('auth-token');
        const validation = await http.post('/auth/password',{token:token,id:this.state._id,password:inputPassword}).then(res=>res).catch(err=>err);
        
        if(validation.data.body) {    
            let fileStatus = document.getElementById("file"); 
            if(fileStatus.files.length !== 0) {
                let currentFile = this.state.selectedFiles[0];

                const filenameInput = document.getElementById("filename").value;
                const Private = document.getElementById("file-type").value;
                const filename = fileStatus.files[0].name;
                const extention = fileExtension(filename);

                const fileInfo = {
                    nombre:filenameInput,
                    extension:extention,
                    private:Private,
                    disable:false,
                    usuario:this.state._id,
                }

                
                UploadService.uploadFile(currentFile,localStorage.getItem('auth-token'),(event) => {
                    this.setState({
                        progress: Math.round((100 * event.loaded) / event.total),
                    });
                })
                .then((response) => {
                    
                    this.setState({
                    
                    selectedFiles: undefined,
                    currentFile: undefined,
                    

                    });

                    fileInfo.url = response.data.url
                    fileInfo.fecha = new Date();

                    http.post('/files/register',fileInfo)
                        .then(res=> {
                            
                            document.getElementById("msg").textContent = res.data.body;
                            document.getElementById("msg").className = "green";
                            document.getElementById("file").value = "";
                            document.getElementById("file-path-id").textContent = "";
                            document.getElementById("filename").value = "";
                            document.getElementById("file-type").value = "";
                            document.getElementById("password").value = "";
                            document.getElementById("upload-btn").textContent = "Subir Archivo"

                            setTimeout(() => {
                                document.getElementById("msg").textContent = "";
                                document.getElementById("msg").className = "";
                            }, 2500);
                        })
                        .catch(err=> {

                            document.getElementById("msg").textContent = err.data.error;
                            document.getElementById("msg").className = "red";
                            document.getElementById("file").value = "";
                            document.getElementById("file-path-id").textContent = "";
                            document.getElementById("filename").value = "";
                            document.getElementById("file-type").value = "";
                            document.getElementById("password").value = "";
                            document.getElementById("upload-btn").textContent = "Subir Archivo"

                            setTimeout(() => {
                                document.getElementById("msg").textContent = "";
                                document.getElementById("msg").className = "";
                            }, 2500);
                        });

                })
                .catch(() => {
                    this.setState({
                        progress: 0,
                        message: "Could not upload the file!",
                        currentFile: undefined,
                    });
                });
                
            }
        } else {
            document.getElementById("msg").textContent = "Contrase??a incorrecta";
            document.getElementById("msg").className = "red";
            setTimeout(() => {
                document.getElementById("msg").textContent = "";
                document.getElementById("msg").className = "";
            }, 2500);
        }
    }

    async selectFile(event) {
        await this.setState({
            selectedFiles:event.target.files
        })
        let fileStatus = document.getElementById("file");
        if(fileStatus.files.length !== 0) {
            document.getElementById("upload-btn").textContent = "Archivo Seleccionado"
            document.getElementById("file-path-id").textContent = fileStatus.value;
            document.getElementById("filename").value = fileStatus.files[0].name;
            
        }
    }

    render() {
        
        return(
            <div className="wrapper">
                <div className="upload-container">
                    <div className="inner-container">
                        <h2>Subir Archivo</h2>
                        <div className="inner-div">
                            <div className="file-div">
                                <input type="file" name="file" id="file" className="file" onChange={this.selectFile}/>
                                <label htmlFor="file" className="file-label" id="upload-btn">Elegir archivo</label>
                            </div>
                            <div className="file-info">
                                <span className="file-info-path">Ruta del Archivo:</span>
                                <span className="file-path" id="file-path-id"></span>
                            </div>
                            <div className="file-last-info">
                                <div className="file-name-info">
                                    <label>Nombre del archivo:</label>
                                    <input type="text" name="filename" id="filename" placeholder="nombre del archivo"/>
                                </div>
                                <div className="file-type-info">
                                    <label htmlFor="file-type" className="file-type-lbl">Tipo de Archivo:</label>
                                    <select name="type" id="file-type">
                                        <option value="">--Seleccione una opci??n--</option>
                                        <option value="0">Publico</option>
                                        <option value="1">Privado</option>
                                    </select>
                                </div>
                                <div className="file-password">
                                    <label htmlFor="password" className="password-lbl">Contrase??a</label>
                                    <input type="password" name="password" id="password" placeholder="Contrase??a" />
                                </div>
                            </div>
                            <div className="msg-div">
                                <span id="msg"></span>
                            </div>
                            <button onClick={this.upload}>Subir Archivo</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;