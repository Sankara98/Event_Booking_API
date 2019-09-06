import React, {Component} from 'react';
import './Auth.css';
class AuthPage extends Component {
    render() {
        return (
            <form className= "auth-form">
                <div className = "form-control">
                    <label htmlFor="email"> E-mail</label>
                    <input type= "email" id= "email" />
                </div>
                <div className = "form-control">
                    <label htmlFor="password">Password</label>
                    <input type= "password" id= "password" />
                </div>
            <div className = "form-actions">
                <button type="button"> Sign Up </button>
                <button type="submit"> Login </button>
            </div>
            </form>
        )
      
    }
}

export default AuthPage;