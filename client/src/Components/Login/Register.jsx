import React from "react";
import Joi from "@hapi/joi";
import Form from "../Common/Form";

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

  render() {
    return (
      <div>
        <h1>New user</h1>
        <hr />
        <form>
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
