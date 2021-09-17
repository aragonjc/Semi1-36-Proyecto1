import React from "react";
import http from "../http/http-commons";
import { Link } from "react-router-dom";
import './resources/css-file-icons.css'
import './resources/Main.css'


class PrivateFiles extends React.Component {
    constructor(props) {
        super(props);
        this.uploadWindow = this.uploadWindow.bind(this);
        this.showFile = this.showFile.bind(this);
		this.closeFileWindow = this.closeFileWindow.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            files:undefined,
            filesUsers:undefined
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
				
                
                

                http.post('/auth/getfriends',{userId:response.data._id})
                .then(res =>{
                    const amigosObj = res.data.body;
                    const amigosArray = amigosObj.map(element=>{
                        return element.amigo
                    })
                    amigosArray.push(response.data._id)
                    
                    http.post('/files/getpublicfiles',{users:amigosArray})
                    .then(result =>{
                        this.setState({
                            files:result.data.result.files,
                            filesUsers:result.data.result.usersData
                        })

                    })
                    .catch(err=>console.log(err));
                    
                })
                .catch(err=>console.log(err));

			})
            .catch(err=>this.props.history.push('/signin'));
            
        }
    }

    uploadWindow() {

        this.props.history.push('/upload')
    }

    logout() {
        localStorage.removeItem("auth-token");
        this.props.history.push("/signin");
    }

    showFile(event) {
		const index = Number(event.currentTarget.attributes['accesskey'].value)
		const url = this.state.files[index].url
		document.getElementById('embeded-file').src = url;
		console.log(url)
		document.getElementById('id-file-preview').className="file-preview"
	}

	closeFileWindow(event) {
		document.getElementById('id-file-preview').className="file-preview file-disable"
		document.getElementById('embeded-file').src ="";
	}

    render() {
        return(
            <>
                <div className="container">
                    <div className="side">
                        <div className="side-wrap">
                            <div className="title-section">
                                <h2 className="page-name"><Link to="/">UStorage</Link></h2>
                            </div>

                            <div className="nav-section">
                                <div className="upload-btn">
                                    <div className="btn-g">
                                        <label>
                                            <div className="btn-btn" onClick={this.uploadWindow}>
                                                Upload
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="files-section">
                                    <div className="files-content">
                                        <div className="files-content-main">
                                            <ul>
                                            <li><Link to='/'>Archivos Privados</Link></li>
                                            <li className="active"><Link to='/public'>Archivos Publicos</Link></li>
                                            <li><Link to='/friends'>Agregar Amigos</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="top-navbar">
                        <div className="top-bar">

                            <nav className="top-bar-nav">
                                <div className="top-bar-nav-search"> 
                                    <form>
                                        <div className="top-bar-nav-input">
                                            <div className="btn-group">
                                                <label>
                                                    <input type="text" placeholder="Seach private files..." />
                                                </label>
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="user-info">
                                    <div className="user-info-last">
                                    <a className="logout" onClick={this.logout}>Cerrar Sesion</a>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <div>
                                                        P
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            
                        </div>
                    </div>
                    
                    <div id="main-file" className="main">
						
						<div className="file-preview file-disable" id="id-file-preview">
							<div className="file-box">
								<div className="file-box-def">
									<span onClick={this.closeFileWindow}>X</span>
									<div>
									<iframe id="embeded-file" src="" width="100%" height="499"></iframe>
									</div>
								</div>
							</div>
						</div>
						
						<div className="files-view">
							<div className="file-list">
								<div className="row">
									<div className="cols">
										<div className="full-card">
											<div className="card">
												<div className="table-responsive">
													<table>
														<thead>
															<tr>
																<th>Name</th>
																<th>Owner</th>
																<th>Update Date</th>
																<th>File size</th>
																<th></th>
															</tr>
														</thead>
														<tbody>
															
															{this.state.files &&
																
																this.state.files.map((file,index) => {
																	return (<tr  key={index} >
																		<td accesskey={index} onClick={this.showFile}>
																			<div className="td-file">
																				<div className={"fi "+"fi-" + file.extension +" file-icon fi-round-md fi-size-xs"}>
																					<div className="fi-content fi-round-md">{file.extension}</div>
																				</div>
																				<div className="filename">
																					{file.nombre}
																				</div>
																			</div>
																		</td>
																		{ file.usuario == this.state._id ? (
                                                                                <td>Me</td>
                                                                            ):(
                                                                                <td>{this.state.filesUsers.find(element=>element.id == file.usuario).nickname}</td>
                                                                            )}
																		<td>{file.fecha}</td>
																		<td></td>
                                                                        {file.usuario == this.state._id &&
                                                                            
                                                                        
																		    <td ><Link class="edit-file-btn" id="id-edit-file-btn" to={'/edit/'+ file.id }>Editar</Link><Link to={'/delete/' + file.id} class="delete-file-btn" id="id-delete-file-btn">Eliminar</Link></td>
                                                                        }
                                                                    </tr>)
																})														
															}						
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
		    		
						
					</div>
	            </div>
            </>
        );
    }
}

export default PrivateFiles;