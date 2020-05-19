import React, { Component } from "react";
import Joi from "@hapi/joi";

class Form extends Component {
  state = { data: {}, errors: {} };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;
    const { name, value } = input;
    data[name] = value;
    let errors = { ...this.state.errors };
    delete errors[name];
    const error = this.validateInput(name, value);
    if (error) errors[name] = error;
    this.setState({ data, errors });
  };

  validateForm = () => {
    const joiSchema = Joi.object(this.schema);
    const { error } = joiSchema.validate(this.state.data);
    let isValid = true;
    if (error) isValid = false;
    return isValid;
  };

  validateInput = (name, value) => {
    const toValidate = { [name]: value };
    const joiSchema = Joi.object({ [name]: this.schema[name] });
    const { error } = joiSchema.validate(toValidate);
    if (error) return error.details[0].message;
    else return null;
  };

  inputValidClass = (name) => {
    let inputClass = "";
    const value = this.state.data[name];

    if (value !== "") {
      const error = this.state.errors[name];
      if (error) inputClass = "is-invalid";
      else inputClass = "is-valid";
    }
    return inputClass;
  };

  inputErrorMessage = (name) => {
    const { errors } = this.state;
    if (errors[name]) {
      return <div className="invalid-feedback">{errors[name]}</div>;
    } else return null;
  };

  renderInput = (name, label, type) => {
    return (
      <div className="form-group">
        <label forhtml={name}>{label}</label>
        <input
          type={type}
          className={`form-control ${this.inputValidClass(name)}`}
          id={name}
          name={name}
          autoComplete="off"
          value={this.state.data[name]}
          onChange={this.handleChange}
        />
        {this.inputErrorMessage(name)}
      </div>
    );
  };

  renderButton = (label, classType = "primary") => {
    let btnClass = this.validateForm() ? "" : "disabled";
    return (
      <button type="submit" className={`btn btn-${classType} ${btnClass}`}>
        {label}
      </button>
    );
  };
}

export default Form;
