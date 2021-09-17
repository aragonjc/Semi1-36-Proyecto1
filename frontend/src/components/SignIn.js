import React from "react";
import http from "../http/http-commons";
import './resources/signup.css'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {};
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

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        })
    }

    onSubmit(event) {
        const loginInfo = {
            user:this.state.username,
            password:this.state.password
        }

        http.post('/auth/signin',loginInfo)
            .then(response => {
                localStorage.setItem("auth-token",response.data.body.token)
                this.props.history.push("/");
            })
            .catch(err => {
                document.getElementById('msg').textContent = err.response.data.error;
                document.getElementById("msg").className = "red";
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className="signup-wrapper">
                <div className="signup-div">
                    <div className="signup-inner">
                        <h2>Sign In</h2>
                        <div className="signup-inner-div">
                            <form onSubmit={this.onSubmit}>
                                <div className="signup-user">
                                    <label htmlFor="username" >Usuario</label>
                                    <input type="text" placeholder="Usuario o Correo" name="username" onChange={this.handleInputChange} required/>
                                </div>
                                <div className="signup-password">
                                    <label htmlFor="password" >Contraseña</label>
                                    <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} required/>
                                </div>
                                <div className="msg-div">
                                    <span id="msg"></span>
                                </div>
                                <input className="signin-button" type="submit" value="Sign in"/>
                            </form>
                            
                        </div>
                    </div>                          
                </div>
            </div>
        );
    }
}

export default SignIn;
