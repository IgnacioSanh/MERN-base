import React from "react";
import Joi from "@hapi/joi";
import Form from "../Common/Form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, auth } from "../../Services/authService";
import "./login.css";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("email"),
    password: Joi.string().min(3).label("password"),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.data;
    const { error } = await login(email, password);
    if (error) {
      toast.error(error);
      return;
    }
    this.props.history.push("/");
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form className="col-6 offset-3" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <hr />

          {this.renderInput("email", "Email adress", "text")}
          {this.renderInput("password", "Password", "password")}
          <div className="row">
            <div className="col-12 align-text-bottom">
              {this.renderButton("Submit")}
              <Link
                className="float-right"
                style={{ marginTop: 7 }}
                to="/register"
              >
                Not a member yet? Register.
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
