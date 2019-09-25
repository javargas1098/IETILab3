import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//import user from "../user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
//import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

const FullNameLine = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem("fullNameStorage") || ""
    );
    React.useEffect(() => {
        localStorage.setItem("fullNameStorage", value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    return (
            <TextField required label="Full name" fullWidth value={value}
            onChange={onChange} />
      );
};
const EmailLine = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem("emailStorage") || ""
    );
    React.useEffect(() => {
        localStorage.setItem("emailStorage", value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    return (
            <TextField required label="Email" fullWidth value={value}
            onChange={onChange} />
      );
};
const UserNameLine = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem("userNameStorage") || ""
    );
    React.useEffect(() => {
        localStorage.setItem("userNameStorage", value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    return (
            <TextField required label="Username" fullWidth value={value}
            onChange={onChange}  />
      );
};
const PasswordLine = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem("passwordStorage") || ""
    );
    React.useEffect(() => {
        localStorage.setItem("passwordStorage", value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    return (
        <TextField required label="Password" type="password" fullWidth value={value}
            onChange={onChange} />
      );
};
const PasswordLine2 = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem("confirmPasswordStorage") || ""
    );
    React.useEffect(() => {
        localStorage.setItem("confirmPasswordStorage", value);
    }, [value]);

    const onChange = event => setValue(event.target.value);
    return (
        <TextField required label="Confirm password" type="password" fullWidth value={value}
                            onChange={onChange} />
      );
};

class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", email: "", username: "", password: "", confirmPassword: "", doRedirect: false, errorMessage: "", loading: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (localStorage.getItem("confirmPasswordStorage") === localStorage.getItem("passwordStorage")) {
            this.createUser();
        } else {
            this.setState({ errorMessage: "The password and the confirmation do not make match" });
        }
    }

    createUser() {
        const user = {
            "username": localStorage.getItem("userNameStorage"),
            "password": localStorage.getItem("passwordStorage"),
            "name": localStorage.getItem("fullNameStorage"),
            "email": localStorage.getItem("emailStorage")
        };
        this.setState({ loading: true });
        if (user) {
            this.setState({ name: "", email: "", password: "", confirmPassword: "", doRedirect: true, loading: false });
        }else{
            console.log('error');
            this.setState({ errorMessage: "User with selected username already exists", loading: false });
        } 
    }

    clear = () => {
        this.setState({ name: "", email: "", username: "", password: "", confirmPassword: "", errorMessage: "", loading: false })
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Registration</Typography>
                    {/* <img src={user} alt="user" className="img" /> */}
                    <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FullNameLine />
                        <EmailLine />
                        <UserNameLine/>
                        <PasswordLine />
                        <PasswordLine2/>
                        <br /><br />
                        <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Create account
                        </Button>
                        <br /><br />
                        <Button type="button" onClick={this.clear} color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Clear
                        </Button>
                        <br /><br />
                        <Button type="button" href="/admin/Dashboard" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Back
                        </Button>
                        {this.state.doRedirect && <Redirect to={"/"} />}
                    </form>
                    {this.state.loading && <CircularProgress style={{ marginTop: "4%" }} />}
                </Paper>
            </React.Fragment>
        );
    }
}

export default NewUser;
