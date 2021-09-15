import React, { createElement } from "react";
import './resources/css-file-icons.css'
import './resources/Main.css'
import http from "../http/http-commons";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.uploadWindow = this.uploadWindow.bind(this);
        this.state = {

        }
    }

	componentDidMount() {
        if(!localStorage.getItem('auth-token')) {
            this.props.history.push('/signin')
        } else {
            const token = localStorage.getItem('auth-token');
            http.post('/auth/check',{token:token})
            .then(response=>this.setState({_id:response.data._id}))
            .catch(err=>this.props.history.push('/signin'));
            
        }
    }

    uploadWindow() {

        this.props.history.push('/upload')
    }    

    render() {
        return (
            <>
                <div className="container">
                    <div className="side">
                        <div className="side-wrap">
                            <div className="title-section">
                                <h2 className="page-name">UStorage</h2>
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
                                            <li className="active"><a>Archivos Privados</a></li>
                                            <li><a>Archivos Publicos</a></li>
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
												<tr>
		                                            <td>
		                                            	<div className="td-file">
			                                            	<div className="fi fi-doc file-icon fi-round-md fi-size-xs">
	    														<div className="fi-content fi-round-md">doc</div>
															</div>
															<div className="filename">
																File.txt
															</div>
		                                            	</div>
		                                            	
		                                                
		                                            </td>
		                                            <td>Me</td>
		                                            <td>Mar 30, 2020 Gail Forcewind</td>
		                                            <td>10 MB</td>
		                                            <td>
		                                            </td>
                                        		</tr>

                                        		<tr>
		                                            <td>
		                                                <div className="td-file">
			                                            	<div className="fi fi-xlsx file-icon fi-round-md fi-size-xs">
	    														<div className="fi-content fi-round-md">xlsx</div>
															</div>
															<div className="filename">
																File.txt
															</div>
		                                            	</div>
		                                            </td>
		                                            <td>Me</td>
		                                            <td>Mar 30, 2020 Gail Forcewind</td>
		                                            <td>10 MB</td>
		                                            <td>
		                                            </td>
                                        		</tr>

                                        		<tr>
		                                            <td>
		                                                <div className="td-file">
			                                            	<div className="fi fi-svg file-icon fi-round-md fi-size-xs">
	    														<div className="fi-content fi-round-md">svg</div>
															</div>
															<div className="filename">
																File.txt
															</div>
		                                            	</div>
		                                            </td>
		                                            <td>Me</td>
		                                            <td>Mar 30, 2020 Gail Forcewind</td>
		                                            <td>10 MB</td>
		                                            <td>
		                                            </td>
                                        		</tr>

                                        		<tr>
		                                            <td>
		                                                <div className="td-file">
			                                            	<div className="fi fi-rb file-icon fi-round-md fi-size-xs">
	    														<div className="fi-content fi-round-md">pdf</div>
															</div>
															<div className="filename">
																File.txt
															</div>
		                                            	</div>
		                                            </td>
		                                            <td>Me</td>
		                                            <td>Mar 30, 2020 Gail Forcewind</td>
		                                            <td>10 MB</td>
		                                            <td>
		                                            </td>
                                        		</tr>
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

export default Main;