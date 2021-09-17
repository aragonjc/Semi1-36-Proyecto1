import React from "react";
import http from "../http/http-commons";
import './resources/Main.css'
import { Link } from "react-router-dom";

class Amigos extends React.Component {
    constructor(props) {
        super(props);
        this.uploadWindow = this.uploadWindow.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            usuarios:undefined
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

                http.post('/auth/getpic',{userId:response.data._id})
                .then(res=>{
                    this.setState({
                        photourl:res.data.url
                    });
                })
                .catch(err => console.log(err));

				http.post('/auth/all',{id:response.data._id})
                .then(res => {
                    let users = res.data.body;
                    http.post('/files/getFilesCount',{userId:response.data._id})
                    .then(result => {
                        
                        let finalUsers = users.map(user => {
                            
                            let finalResult = result.data.result.filter(r => {
                                
                                if(user.id == r.usuario) {
                                    return r.count
                                }
                            })
                        
                            if(finalResult.length > 0) {
                                user["count"] = finalResult[0].count;
                                return user;
                            } else {
                                user["count"] = 0;
                                return user;
                            }

                        })
                        this.setState({
                            usuarios:finalUsers
                        })
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => error);

                http.post('/auth/getfriends',{userId:response.data._id})
                .then(result => {
                    const amigosObj = result.data.body;
                    const amigosArray = amigosObj.map(element=>{
                        return element.amigo
                    })
                    this.setState({
                        amigos:amigosArray
                    })
                    console.log(amigosArray)
                })
                .catch(error=> console.log(error));

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

    addFriend(friendID) {
        
        const userId = this.state._id;
        
        http.post('/auth/addfriend',{userId:userId,friendId:friendID})
        .then(response => {
            
            window.location.reload();
        })
        .catch(err=> console.log(err));

    }

    render() {
        return (

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
                                            <li><Link to='/public'>Archivos Publicos</Link></li>
                                            <li className="active"><Link to='/friends'>Agregar Amigos</Link></li>
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
                                                    <input type="text" placeholder="Buscar usuario..." />
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
                                                        {
                                                            <a className="link-photo" href={this.state.photourl}><img className="profile-pic" src={this.state.photourl} width="25" height="25" href="/public" /></a>
                                                        }
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
																<th>Usuario</th>
																<th>Correo</th>
																<th>Archivos Publicos</th>
																<th></th>
															</tr>
														</thead>
														<tbody>
                                                            {this.state.usuarios &&
																this.state.usuarios.map((user,index) => {
																	return (<tr  key={index} >
																		<td>
																			{user.nickname}
																		</td>
																		<td>{user.email}</td>
																		<td>{user.count} archivos</td>
																		<td >
                                                                            {!this.state.amigos.find(e=>e==user.id) && 
                                                                                <a className="edit-file-btn" onClick={()=>this.addFriend(user.id)} >
                                                                                    Agregar
                                                                                </a>
                                                                            }
                                                                            
                                                                        </td>
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

export default Amigos;