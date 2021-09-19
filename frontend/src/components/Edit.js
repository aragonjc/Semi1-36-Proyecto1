import React from "react";
import http from "../http/http-commons";

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.editFile = this.editFile.bind(this);
        this.state = {
            
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('auth-token')) {
            this.props.history.push('/signin')
        } else {
            const token = localStorage.getItem('auth-token');
            http.post('/auth/check',{token:token})
            .then(response=> {
				this.setState({_id:response.data._id});
				const fileID = this.props.match.params.id;
                http.post('/files/getfile',{fileId:fileID})
                    .then(result =>{
                        this.setState({
                            fileId:result.data.body.id
                        })
                        const filename= result.data.body.nombre;
                        const fileType = Number(result.data.body.private);

                        document.getElementById("file-path-id").textContent = filename;
                        document.getElementById("file-type").value = fileType;

                    })
                    .catch(err => console.log(err));
			})
            .catch(err=>this.props.history.push('/signin'));
            
        }
    }

    async editFile() {
        const password = document.getElementById("password").value;
        if(!password) {
            return;
        }

        const token = localStorage.getItem('auth-token');
        const validation = await http.post('/auth/password',{token:token,id:this.state._id,password:password}).then(res=>res).catch(err=>err);

        if(validation.data.body) {
            const Private = document.getElementById("file-type").value;
            const updateValues = {private:Private}

            http.post('/files/modify',{updateValues:updateValues, fileId:this.state.fileId})
                .then(response =>{
                    document.getElementById("msg").textContent = "El archivo se actualizó";
                    document.getElementById("msg").className = "green";
                    document.getElementById("password").value = "";
                    document.getElementById("file-type").value = Private;
                })
                .catch(err => {
                    document.getElementById("msg").textContent = "El archivo no se pudo actualizar";
                    document.getElementById("msg").className = "red";
                    document.getElementById("password").value = "";
                    document.getElementById("file-type").value = Private;
                });



                setTimeout(() => {
                    document.getElementById("msg").textContent = "";
                    document.getElementById("msg").className = "";
                }, 2500);

        } else {
            document.getElementById("msg").textContent = "Contraseña incorrecta";
            document.getElementById("msg").className = "red";
            setTimeout(() => {
                document.getElementById("msg").textContent = "";
                document.getElementById("msg").className = "";
            }, 2500);
        }
    }

    render() {
        return(
            <div className="wrapper">
                <div className="upload-container">
                    <div className="inner-container">
                        <h2>Editar Archivo</h2>
                        <div className="inner-div">
                            <div className="file-info">
                                <span className="file-info-path">Archivo:</span>
                                <span className="file-path" id="file-path-id"></span>
                            </div>
                            
                            <div className="file-last-info">
                                <div className="file-type-info">
                                    <label htmlFor="file-type" className="file-type-lbl">Tipo de Archivo:</label>
                                    <select name="type" id="file-type">
                                        <option value="0">Publico</option>
                                        <option value="1">Privado</option>
                                    </select>
                                </div>
                                <div className="file-password">
                                    <label htmlFor="password" className="password-lbl">Contraseña</label>
                                    <input type="password" name="password" id="password" placeholder="Contraseña" />
                                </div>
                            </div>
                            <div className="msg-div">
                                <span id="msg"></span>
                            </div>
                            <button onClick={this.editFile}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;