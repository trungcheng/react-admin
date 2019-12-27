import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import _ from 'lodash';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class MemberDialogEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openMode: props.open,
            showPassword: false,
            showPasswordRepeat: false,
            data: {
                fullname: '',
                username: 'av8883',
                code1: 0,
                code2: 2,
                code3: 1,
                status: false,
                password: '',
                repeat_password: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({
                openMode: nextProps.open
            });
        }
    }

    handleClose = () => {
        this.setState({
            openMode: false
        });
    }

    handleSave = () => {
        console.log('save');
    }

    handleChange = (field, e) => {
        const { data } = this.state;

        data[field] = (field !== 'status') ? e.target.value : e.target.checked;

        this.setState({
            data
        });
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({
            showPasswordRepeat: !this.state.showPasswordRepeat
        });
    };

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    render() {
        const { 
            openMode, 
            showPassword, 
            showPasswordRepeat
        } = this.state;
        const { data } = this.props;

        return (
            <div>
                <Dialog
                    open={openMode}
                    fullWidth={true}
                    maxWidth={'sm'}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Member</DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="fullname"
                                label="Fullname"
                                onChange={(e) => this.handleChange('fullname', e)}
                                value={data.fullname}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 10}}
                            />
                            <div>
                                <TextField
                                    disabled
                                    margin="dense"
                                    id="username"
                                    label="Username"
                                    defaultValue={data.username}
                                    onChange={(e) => this.handleChange('username', e)}
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="code1"
                                    select
                                    value={data.code1}
                                    onChange={(e) => this.handleChange('code1', e)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    margin="dense"
                                    id="code2"
                                    select
                                    value={data.code2}
                                    onChange={(e) => this.handleChange('code2', e)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    margin="dense"
                                    id="code3"
                                    select
                                    value={data.code3}
                                    onChange={(e) => this.handleChange('code3', e)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.status}
                                        onChange={(e) => this.handleChange('status', e)}
                                        value={data.status}
                                        color="primary"
                                    />
                                }
                                label="Status"
                            /><br />
                            {
                                data.status && <div>
                                    <TextField
                                        margin="dense"
                                        label="Password"
                                        id="password"
                                        onChange={(e) => this.handleChange('password', e)}
                                        value={data.password}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                        variant="outlined"
                                    /><br />
                                    <TextField
                                        margin="dense"
                                        label="Repeat password"
                                        id="repeat_password"
                                        onChange={(e) => this.handleChange('repeat_password', e)}
                                        value={data.repeat_password}
                                        type={showPasswordRepeat ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPasswordRepeat}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                            }
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default MemberDialogEdit;