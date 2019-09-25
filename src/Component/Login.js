import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './Login.css'
//import {logo} from '../logo.svg';
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", loading: false };
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handlePassSubmit = this.handlePassSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        if (localStorage.getItem('userNameStorage') === this.state.email && localStorage.getItem('passwordStorage') === this.state.password) {
            console.log('entrooooo');
            localStorage.setItem('page', "Logged");
            this.props.reloadPage();
        }
        this.setState({ email: "", password: "", errorMessage: "Algo Fallo", loading: false });

    }
    handlePassSubmit(event) {
        this.setState({ password: event.target.value });
    }
    handleEmailSubmit(event) {

        this.setState({ email: event.target.value });
    }


    render() {
        return (
            <React.Fragment>

                <CssBaseline />
                <main className="layout">
                    <Paper elevation={5} className="paper">
                        <Typography variant="h4">
                            Task Planner
                        </Typography>
                        {/* <img src={logo} className="App-logo" alt="logo"/> */}
                        <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <TextField required label="Username" fullWidth value={this.state.email}
                                onChange={this.handleEmailSubmit} />
                            <TextField required label="Password" type="password" fullWidth value={this.state.password}
                                onChange={this.handlePassSubmit} />
                            <br /><br />
                            <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                                Login
                            </Button>
                        </form>
                        <br />
                        <Link to={"/NewUser"} >Create account</Link>
                        {this.state.loading && <CircularProgress style={{ marginTop: "6%" }} />}
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}
