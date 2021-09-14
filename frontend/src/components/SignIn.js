import React from "react";
import http from "../http/http-commons";
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {};
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
            .catch(err => document.getElementById('msg').textContent = err.response.data.error);

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>SignIn</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="username" placeholder="usuario o correo electronico" onChange={this.handleInputChange} required />
                    <input type="password" name="password" placeholder="Contraseña" onChange={this.handleInputChange} required />
                    <input type="submit" value="Sign in"/>
                </form>
                <span id="msg"></span>
            </div>
        );
    }
}

export default SignIn;
