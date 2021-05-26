import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

export default class Index extends React.Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  signOut = () => {
    this.setState({ email: '' });
    this.setState({ password: '' });
    this.setState({ isLoggedIn: false });
  }

  handleSubmit = event => {
    event.preventDefault();

    let email = this.state.email;
    let password = this.state.password;

    axios.post(`https://projeto-integrador-4.herokuapp.com/auth/login`, { email, password })
      .then(res =>
        this.setState({ isLoggedIn: (res.status === 200) })
      ).catch(err =>
        alert('Falha de Autenticação, tente novamente!')
      );
  }

  render() {
    let body = (this.state.isLoggedIn)
      ? <div>
        <p>Status: Conectado!</p>
        <button onClick={this.signOut}>Deslogar</button>
      </div>
      : <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
          <input type="email" name="email" onChange={this.handleChangeEmail} />
          </label>
          <label>
            Password:
          <input type="password" name="password" onChange={this.handleChangePassword} />
          </label>
          <button type="submit">Sign In</button>
        </form>
      </div>

    return (
      body
    )
  }
}


ReactDOM.render(
  <Index>
  </Index>,
  document.getElementById('root')
);
