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

class AccountDialogEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openMode: props.open,
            showPassword: false,
            defaultData: {
                company: 1,
                account: 0,
                sub_user: '',
                password: '',
                safe_code: '',
                note: '',
                status: true
            },
            statusList: [
                { value: true, label: 'True' },
                { value: false, label: 'False' }
            ],
            accountList: [
                { value: 0, label: 'Tài khoản gốc' },
                { value: 1, label: 'dtf35b118' },
                { value: 2, label: 'dtf3630' },
                { value: 3, label: 'dtf39' }
            ],
            companyList: [
                { value: 1, label: 'bong88' },
                { value: 2, label: 'sbobet' },
                { value: 3, label: '3in1bet' }
            ]
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
            });
        }
    }

    handleClose = () => {
        this.setState({
            openMode: false,
            showPassword: false,
            data: {
                ...this.state.data,
                status: true
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

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    render() {
        const { 
            openMode, 
            showPassword, 
            defaultData,
            statusList,
            accountList,
            companyList
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
                    <DialogTitle id="form-dialog-title">Cập nhật tài khoản</DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">

                            <TextField
                                fullWidth
                                margin="dense"
                                id="company"
                                label="Công ty"
                                select
                                value={defaultData.company}
                                onChange={(e) => this.handleChange('company', e.target.value)}
                                variant="outlined"
                                style={{marginBottom: 10}}
                            >
                                {companyList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                margin="dense"
                                id="account"
                                label="Thuộc tài khoản"
                                select
                                value={defaultData.account}
                                onChange={(e) => this.handleChange('account', e.target.value)}
                                variant="outlined"
                                style={{marginBottom: 10}}
                            >
                                {accountList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                required
                                margin="dense"
                                id="sub_user"
                                label="Tên đăng nhập"
                                onChange={(e) => this.handleChange('sub_user', e.target.value)}
                                value={defaultData.sub_user}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 10}}
                            />

                            <TextField
                                fullWidth
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
                                style={{marginBottom: 10}}
                            />

                            <TextField
                                fullWidth
                                margin="dense"
                                id="safe_code"
                                label="Mã an toàn"
                                onChange={(e) => this.handleChange('safe_code', e.target.value)}
                                value={defaultData.safe_code}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 10}}
                            />

                            <TextField
                                fullWidth
                                margin="dense"
                                id="note"
                                label="Chú thích"
                                onChange={(e) => this.handleChange('note', e.target.value)}
                                value={defaultData.note}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 10}}
                            />

                            <TextField
                                fullWidth
                                disabled
                                margin="dense"
                                id="status"
                                label="Trạng thái"
                                select
                                value={defaultData.status}
                                onChange={(e) => this.handleChange('status', e.target.value)}
                                variant="outlined"
                                style={{marginBottom: 10}}
                            >
                                {statusList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                                    
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

export default AccountDialogEdit;