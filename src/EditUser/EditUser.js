import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import {sha256} from "js-sha256";
import CssBaseline from "@material-ui/core/CssBaseline";




class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", email: "", username: "", password: "", confirmPassword: "", errorMessage: "" ,loading: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleconfirmPasswordSubmit = this.handleconfirmPasswordSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (localStorage.getItem("confirmPasswordStorage") === localStorage.getItem("passwordStorage")) {
            this.updateUser();
        } else {
            this.setState({ errorMessage: "The password and the confirmation do not make match" });
        }
    }
    handleNameSubmit(event) {
        this.setState({ name: event.target.value });
        localStorage.setItem('fullNameStorage', event.target.value);
    }
    handleEmailSubmit(event) {

        this.setState({ email: event.target.value });
        localStorage.setItem('emailStorage', event.target.value);
    }
    handleUserSubmit(event) {

        this.setState({ username: event.target.value });
        localStorage.setItem('userNameStorage', event.target.value);
    }
    handlePasswordSubmit(event) {

        this.setState({ password: event.target.value });
        localStorage.setItem('passwordStorage', event.target.value);
    }
    handleconfirmPasswordSubmit(event) {

        this.setState({ confirmPassword: event.target.value });
        localStorage.setItem('confirmPasswordStorage', event.target.value);
    }

    updateUser() {
        const user = {
            "username": localStorage.getItem("userNameStorage"),
            "password": localStorage.getItem("passwordStorage"),
            "name": localStorage.getItem("fullNameStorage"),
            "email": localStorage.getItem("emailStorage")
        };
        this.setState({ loading: true });
        if (user) {
            this.setState({ name: "", email: "", username: "", password: "", confirmPassword: "", doRedirect: true, loading: false });
        } else {
            console.log('error');
            this.setState({ errorMessage: "User with selected username already exists", loading: false });
        }
    }

    clear = () => {
        localStorage.clear();
        this.setState({ name: "", email: "", username: "", password: "", confirmPassword: "", errorMessage: "" ,loading: false})
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Edit User</Typography>
                    <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth value={this.state.name}
                            onChange={this.handleNameSubmit} />
                        <TextField required label="Email" fullWidth value={this.state.email}
                            onChange={this.handleEmailSubmit} />
                        <TextField required label="Username" fullWidth value={this.state.username}
                            onChange={this.handleUserSubmit} />
                        <TextField required label="Password" type="password" fullWidth value={this.state.password}
                            onChange={this.handlePasswordSubmit} />
                        <TextField required label="Confirm password" type="password" fullWidth value={this.state.confirmPassword}
                            onChange={this.handleconfirmPasswordSubmit} />
                        <br /><br />
                        <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Save
                        </Button>
                        <br /><br />
                        <Button type="button" onClick={this.clear} color="primary" variant="contained" fullWidth>
                            Clear
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}

export default EditUser;
