import React from "react";
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>SignIn</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="username" placeholder="usuario o correo electronico" required />
                    <input type="password" name="password" placeholder="Contraseña" required />
                    <input type="submit" value="Sign in"/>
                </form>
            </div>
        );
    }
}

export default SignIn;
