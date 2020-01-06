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

class AccountDialogEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            isFormValid: false,
            showRes: false,
            defaultData: {
                AccountID: props.data.AccountID,
                CompanyID: 1,
                ParentID: 0,
                AccountName: '',
                UserName: '',
                Password: '',
                SecretCode: '',
                Note: '',
                Status: 1
            },
            statusList: [
                { value: 1, label: 'True' },
                { value: 0, label: 'False' }
            ],
            accountList: [
                { value: 0, label: 'Tài khoản gốc' },
                { value: 1, label: 'dtf35b118' },
                { value: 2, label: 'dtf3630' },
                { value: 3, label: 'dtf39' }
            ],
            companyList: [
                { value: 1, label: '3In' },
                { value: 2, label: 'LD' },
                { value: 3, label: 'New789' },
                { value: 4, label: 'Sbobet' },
                { value: 5, label: 'Viet88' },
                { value: 6, label: 'Bong88' }
            ]
        }
    }

    componentWillReceiveProps(nextProps) {
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
        const { onClose } = this.props;

        this.setState({
            showPassword: false,
            defaultData: {
                ...this.state.defaultData,
                Status: 1
            }
        });

        onClose();
    }

    handleRefresh = () => {
        const { onRefresh } = this.props;

        onRefresh();
    }

    handleSave = () => {
        const { defaultData } = this.state;
        
        this.setState({
            showRes: true
        }, () => {
            this.props.saveAccount(defaultData, (status) => {
                if (status) {
                    this.handleRefresh();
                    this.handleClose();
                    this.props.showMessage({ message: 'Cập nhật thành công' });
                }
            });
        });
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

    disableButton = () => {
        this.setState({
            isFormValid: false
        });
    }

    enableButton = () => {
        this.setState({
            isFormValid: true
        });
    }

    render() {
        const { open, success, errorMsg } = this.props;
        const { 
            showRes,
            showPassword,
            isFormValid, 
            defaultData,
            statusList,
            accountList,
            companyList
        } = this.state;

        return (
            <div>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth={'sm'}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <Formsy
                        onValidSubmit={this.handleSave}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        ref={c => this.refForm = c}
                        className="flex flex-col justify-center w-full"
                    >
                        <DialogTitle id="form-dialog-title">Cập nhật tài khoản</DialogTitle>
                        <DialogContent>

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
                                        
                            {
                                !success && showRes && <FormControl error>
                                    <FormHelperText 
                                        style={{fontSize: '1.4rem'}} 
                                        id="component-error-text"
                                    >
                                        { errorMsg }
                                    </FormHelperText>
                                </FormControl>
                            }

                            {
                                success && showRes && <FormControl>
                                    <FormHelperText 
                                        style={{
                                            fontSize: '1.4rem',
                                            color: 'green'
                                        }} 
                                        id="component-success-text"
                                    >
                                        Cập nhật thành công
                                    </FormHelperText>
                                </FormControl>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" disabled={!isFormValid} type="submit">
                                Lưu
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Hủy
                            </Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.account.account.success,
        errorMsg: state.account.account.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAccount: bindActionCreators(saveAccount, dispatch),
        fetchDetail: bindActionCreators(fetchDetail, dispatch),
        showMessage: bindActionCreators(Actions.showMessage, dispatch),
        getAccountByCompanyId: bindActionCreators(getAccountByCompanyId, dispatch)
    }
}

AccountDialogEdit.contextType = AppContext;

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AccountDialogEdit));