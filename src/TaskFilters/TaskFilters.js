import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import FormLabel from "@material-ui/core/FormLabel"
import Modal from "@material-ui/core/Modal";
import { CardTask } from "../Card/Card";
import DialogContent from "@material-ui/core/DialogContent";

class TaskFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dueDate: null,
            name: "",
            email: "",
            status: "",
            tasks: this.props.tasks,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handlestatusSubmit = this.handlestatusSubmit.bind(this);
    }

    static dateC(datea, dateb) {
        return datea.getDate() === dateb.getDate() && datea.getFullYear() === dateb.getFullYear() && datea.getMonth() === dateb.getMonth();
    }

    handleSubmit(e) {
        e.preventDefault();
        let fil = this.props.tasks.slice();
        console.log(fil);
        for (const k in fil) {
            if (this.state.dueDate !== null) {
                const date1 = new Date(fil[k].dueDate);
                const date2 = this.state.dueDate;
                if (!TaskFilters.dateC(date1, date2)) {
                    fil[k] = null;
                    continue;
                }
            }
            if (this.state.email !== "") {
                if (!fil[k].responsible.email.startsWith(this.state.email)) {
                    fil[k] = null;
                    continue;
                }
            }
            if (this.state.name !== "") {
                if (!fil[k].responsible.name.startsWith(this.state.name)) {
                    fil[k] = null;
                    continue;
                }
            }
            if (this.state.status !== "") {
                if (this.state.status !== fil[k].state) {
                    fil[k] = null;
                }
            }
        }
        fil = fil.filter(task => task !== null);
        this.setState({ tasks: fil });
        this.handleOpen()
    }

    handleClear() {
        this.setState({ dueDate: null, name: "", email: "", status: "" });
    }
    handleNameSubmit(event) {
        this.setState({ name: event.target.value });
    }
    handleEmailSubmit(event) {

        this.setState({ email: event.target.value });
    }
    handlestatusSubmit(event) {

        this.setState({ status: event.target.value });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Task filters</Typography>
                    <br /><br />
                    
                    <DialogContent>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    margin="normal"
                                    label="Due Date"
                                    clearable
                                    value={this.state.dueDate}
                                    onChange={date => this.setState({ dueDate: date })}
                                />
                            </MuiPickersUtilsProvider>
                            <br /><br />
                            <FormLabel component="legend">Responsible</FormLabel>
                            <TextField value={this.state.name} label="Name"
                                onChange={this.handleNameSubmit} />
                            <TextField value={this.state.email} label="Email"
                                onChange={this.handleEmailSubmit} />
                            <br /><br />
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Status
                                </InputLabel>
                                <Select
                                    native
                                    value={this.state.status}
                                    onChange={this.handlestatusSubmit}
                                >
                                    <option value="" disabled hidden />
                                    <option value={"Ready"}>Ready</option>
                                    <option value={"In_Progress"}>In Progress</option>
                                    <option value={"Completed"}>Completed</option>
                                </Select>
                            </FormControl>
                            <br /><br />
                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                Apply
                            </Button>
                            <br /><br />
                            <Button color="primary" variant="contained" fullWidth onClick={this.handleClear}>
                                Clear All
                            </Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <>
                                {this.state.tasks.map((task, id) => {
                                return (<CardTask info={task} key={id} />);
                            })}
                                </>
                            </Modal>
                        </form>
                    </DialogContent>
                </Paper>
            </>
        );
    }
}

export default TaskFilters;