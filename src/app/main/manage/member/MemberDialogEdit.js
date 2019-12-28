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
            changePwdCondition: false,
            defaultData: {
                fullname: props.data.fullname,
                username: '',
                code1: 0,
                code2: 2,
                code3: 1,
                status: false,
                pwd2: false,
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
        if (nextProps.data !== this.state.defaultData) {
            this.setState({
                defaultData: {
                    ...this.state.defaultData,
                    ...nextProps.data
                }
            }, () => {
                this.setState({
                    defaultData: {
                        ...this.state.defaultData,
                        status: (this.state.defaultData.status == 0) ? false : true
                    }
                });
            });
        }
    }

    handleClose = () => {
        this.setState({
            openMode: false,
            showPassword: false,
            showPasswordRepeat: false,
            changePwdCondition: false,
            defaultData: {
                ...this.state.defaultData,
                pwd2: false
            }
        });
    }

    handleSave = () => {
        const { defaultData } = this.state;
        
        console.log(defaultData);
    }

    handleChange = (field, value) => {
        const { defaultData } = this.state;

        defaultData[field] = value;

        this.setState({
            defaultData
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
            showPasswordRepeat,
            changePwdCondition,
            defaultData
        } = this.state;

        return (
            <div>
                <Dialog
                    open={openMode}
                    fullWidth={true}
                    maxWidth={'sm'}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Cập nhật thành viên</DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="fullname"
                                label="Tên"
                                onChange={(e) => this.handleChange('fullname', e.target.value)}
                                value={defaultData.fullname}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 10}}
                            />
                            <div>
                                <TextField
                                    disabled
                                    margin="dense"
                                    id="username"
                                    label="Tên đăng nhập"
                                    defaultValue={defaultData.username}
                                    onChange={(e) => this.handleChange('username', e.target.value)}
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="code1"
                                    select
                                    value={defaultData.code1}
                                    onChange={(e) => this.handleChange('code1', e.target.value)}
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
                                    value={defaultData.code2}
                                    onChange={(e) => this.handleChange('code2', e.target.value)}
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
                                    value={defaultData.code3}
                                    onChange={(e) => this.handleChange('code3', e.target.value)}
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
                                        checked={defaultData.status}
                                        onChange={(e) => this.handleChange('status', e.target.checked)}
                                        value={defaultData.status}
                                        color="primary"
                                    />
                                }
                                label="Trạng thái"
                            /><br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={defaultData.pwd2}
                                        onChange={(e) => this.handleChange('pwd2', e.target.checked)}
                                        value={defaultData.pwd2}
                                        color="primary"
                                    />
                                }
                                label="Khôi phục mật khẩu 2"
                            /><br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={changePwdCondition}
                                        onChange={(e) => this.setState({ changePwdCondition: !this.state.changePwdCondition })}
                                        value={changePwdCondition}
                                        color="primary"
                                    />
                                }
                                label="Chọn vào đây nếu bạn muốn đổi mật khẩu"
                            /><br />
                            {
                                defaultData.status && changePwdCondition && <div>
                                    <TextField
                                        margin="dense"
                                        label="Mật khẩu"
                                        id="password"
                                        onChange={(e) => this.handleChange('password', e.target.value)}
                                        value={defaultData.password}
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
                                        label="Nhập lại mật khẩu"
                                        id="repeat_password"
                                        onChange={(e) => this.handleChange('repeat_password', e.target.value)}
                                        value={defaultData.repeat_password}
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
                        <Button onClick={this.handleSave} color="primary">
                            Lưu
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Hủy
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default MemberDialogEdit;