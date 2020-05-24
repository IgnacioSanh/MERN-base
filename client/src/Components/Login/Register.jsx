import React from "react";
import Joi from "@hapi/joi";
import Form from "../Common/Form";
import { register, login } from "../../Services/authService.js";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label("First name"),
    lastname: Joi.string().min(2).required().label("Last name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Email")
      .required(),
    password: Joi.string().min(6).required().label("Password"),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = this.state.data;
    let data = await register(user);
    let { error } = data;
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Register completed successfully");
    const { email, password } = user;
    data = await login(email, password);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>New user</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "First name", "text")}
          {this.renderInput("lastname", "Last name", "text")}
          {this.renderInput("email", "E-mail", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
