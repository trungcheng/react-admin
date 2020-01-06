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
import { TextFieldFormsy, CheckboxFormsy } from '@fuse';
import Formsy from 'formsy-react';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveAccount, fetchDetail, getAccountByCompanyId } from './store/actions';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

class MemberDialogAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openMode: props.open,
            showPassword: false,
            data: {
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
        const { data } = this.state;
        
        console.log(data);
    }

    handleChange = (field, value) => {
        const { data } = this.state;

        data[field] = value;

        this.setState({
            data
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
            data,
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
                    <DialogTitle id="form-dialog-title">Thêm mới tài khoản</DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">

                            <TextField
                                fullWidth
                                margin="dense"
                                id="company"
                                label="Công ty"
                                select
                                value={data.company}
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
                                value={data.account}
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
                                value={data.sub_user}
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
                                style={{marginBottom: 10}}
                            />

                            <TextField
                                fullWidth
                                margin="dense"
                                id="safe_code"
                                label="Mã an toàn"
                                onChange={(e) => this.handleChange('safe_code', e.target.value)}
                                value={data.safe_code}
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
                                value={data.note}
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
                                value={data.status}
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

export default MemberDialogAdd;