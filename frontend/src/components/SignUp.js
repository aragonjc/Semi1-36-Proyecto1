import React from "react";
import './resources/signup.css'

class SignUp extends React.Component {

    render() {
        return (
            <div>
                <h2>SignUp</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Check Password" />
                    <input type="file" />
                    <button>Sign up</button>
                </form>
            </div>
        );
    }

}

export default SignUp;
