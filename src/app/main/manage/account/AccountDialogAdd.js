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

class AccountDialogAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            isFormValid: false,
            showRes: false,
            defaultData: {
                AccountID: 0,
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
            accountListByCompany: [],
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
        const { defaultData } = this.state;

        if (nextProps.data !== this.state.defaultData) {
            this.handleAccountByCompany(defaultData.CompanyID);
        }
    }

    handleAccountByCompany = (companyId) => {
        this.props.getAccountByCompanyId(companyId, (res) => {
            if (res.status) {
                this.setState({
                    accountListByCompany: res.data
                });
            }
        });
    }

    handleClose = () => {
        const { onClose } = this.props;

        this.setState({
            showPassword: false,
            isFormValid: false,
            showRes: false,
            defaultData: {
                AccountID: 0,
                CompanyID: 1,
                ParentID: 0,
                AccountName: '',
                UserName: '',
                Password: '',
                SecretCode: '',
                Note: '',
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
                    this.props.showMessage({ message: 'Thêm mới thành công' });
                }
            });
        });
    }

    handleChange = (field, value) => {
        const { defaultData } = this.state;

        defaultData[field] = value;
        if (field === 'CompanyID') {
            this.handleAccountByCompany(value);
        }

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
            accountListByCompany,
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
                        <DialogTitle id="form-dialog-title">Thêm mới tài khoản</DialogTitle>
                        <DialogContent>

                            <TextField
                                className="mb-10"
                                fullWidth
                                required
                                id="CompanyID"
                                label="Công ty"
                                select
                                value={defaultData.CompanyID}
                                onChange={(e) => this.handleChange('CompanyID', e.target.value)}
                                variant="outlined"
                            >
                                {companyList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                className="mb-10"
                                fullWidth
                                required
                                id="ParentID"
                                label="Thuộc tài khoản"
                                select
                                value={defaultData.ParentID}
                                onChange={(e) => this.handleChange('ParentID', e.target.value)}
                                variant="outlined"
                            >
                                {
                                    accountListByCompany.length > 0 && accountListByCompany.map(option => (
                                        <MenuItem key={option.ID} value={option.ID}>
                                            {option.Name.toUpperCase()}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>

                            {
                                defaultData.ParentID == 0 && <div>
                                    <TextFieldFormsy
                                        className="mb-10"
                                        fullWidth
                                        required
                                        name="UserName"
                                        label="Tên đăng nhập"
                                        onChange={(e) => this.handleChange('UserName', e.target.value)}
                                        validations={{
                                            minLength: 4
                                        }}
                                        validationErrors={{
                                            minLength: 'Tên đăng nhập tối thiểu 4 kí tự'
                                        }}
                                        value={defaultData.UserName}
                                        type="text"
                                        variant="outlined"
                                    />

                                    <TextFieldFormsy
                                        className="mb-10"
                                        fullWidth
                                        required
                                        label="Mật khẩu"
                                        name="Password"
                                        onChange={(e) => this.handleChange('Password', e.target.value)}
                                        validations={{
                                            minLength: 6
                                        }}
                                        validationErrors={{
                                            minLength: 'Mật khẩu tối thiểu 6 kí tự'
                                        }}
                                        value={defaultData.Password}
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
                                    />
                                </div>
                            }

                            {
                                defaultData.ParentID > 0 && <TextFieldFormsy
                                    className="mb-10"
                                    fullWidth
                                    required
                                    name="AccountName"
                                    label="Tên tài khoản"
                                    onChange={(e) => this.handleChange('AccountName', e.target.value)}
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Tên tài khoản tối thiểu 4 kí tự'
                                    }}
                                    value={defaultData.AccountName}
                                    type="text"
                                    variant="outlined"
                                /> 
                            }

                            <TextFieldFormsy
                                className="mb-10"
                                fullWidth
                                required
                                name="SecretCode"
                                label="Mã an toàn"
                                onChange={(e) => this.handleChange('SecretCode', e.target.value)}
                                value={defaultData.SecretCode}
                                type="text"
                                variant="outlined"
                            />

                            <TextFieldFormsy
                                className="mb-10"
                                fullWidth
                                required
                                name="Note"
                                label="Chú thích"
                                onChange={(e) => this.handleChange('Note', e.target.value)}
                                value={defaultData.Note}
                                type="text"
                                variant="outlined"
                            />

                            <TextFieldFormsy
                                className="mb-10"
                                fullWidth
                                required
                                disabled
                                name="Status"
                                label="Trạng thái"
                                select
                                value={defaultData.Status}
                                onChange={(e) => this.handleChange('Status', e.target.value)}
                                variant="outlined"
                            >
                                {statusList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextFieldFormsy>

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
                                        Thêm mới thành công
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

AccountDialogAdd.contextType = AppContext;

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AccountDialogAdd));