import React, { Component } from "react";
import { getUsers } from "../../Services/authService";
import { toast } from "react-toastify";

class UserView extends Component {
  state = { users: [] };

  async componentDidMount() {
    const { error, users } = await getUsers();
    if (error) toast.error(error);
    if (users) this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Users</h1>
        <hr />
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserView;
