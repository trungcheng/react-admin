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
import { saveMember } from './store/actions';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

class MemberDialogEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            showPasswordRepeat: false,
            changePwdCondition: false,
            isFormValid: false,
            showRes: false,
            defaultData: {
                UserID: props.data.UserID,
                FullName: '',
                UserName: '',
                AuthUserName: '',
                Code1: 0,
                Code2: 0,
                Code3: 0,
                Phone: '',
                Status: false,
                Pwd2: false,
                Password: '',
                Repeat_Password: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.defaultData) {
            this.setState({
                defaultData: {
                    ...this.state.defaultData,
                    ...nextProps.data
                }
            }, () => {
                let data = this.state.defaultData;
                let stringCode = data.UserName.replace(data.AuthUserName, '');

                this.setState({
                    defaultData: {
                        ...this.state.defaultData,
                        Code1: stringCode[0],
                        Code2: stringCode[1],
                        Code3: stringCode[2]
                        // Status: (this.state.defaultData.Status === 0) ? false : true
                    }
                });
            });
        }
    }

    handleClose = () => {
        const { onClose } = this.props;

		this.setState({
            showRes: false,
            showPassword: false,
            showPasswordRepeat: false,
            changePwdCondition: false,
            defaultData: {
                ...this.state.defaultData,
                Pwd2: false
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
        
        let data;
        defaultData.Status = defaultData.Status ? 1 : 0;
        defaultData.UserName = defaultData.AuthUserName + defaultData.Code1 + defaultData.Code2 + defaultData.Code3;
        data = _.merge(data, defaultData);

        this.setState({
            showRes: true
        }, () => {
            this.props.saveMember(data, (status) => {
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

    handleClickShowPasswordRepeat = () => {
        this.setState({
            showPasswordRepeat: !this.state.showPasswordRepeat
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
            showPasswordRepeat,
            changePwdCondition,
            isFormValid,
            defaultData
        } = this.state;

        if (defaultData.Status == 0) {
            defaultData.Status = false;
        } else if (defaultData.Status == 1) {
            defaultData.Status = true;
        }

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
                        <DialogTitle id="form-dialog-title">Cập nhật thành viên</DialogTitle>
                        <DialogContent>

                            <TextFieldFormsy
                                className="mb-10"
                                fullWidth
                                autoFocus
                                required
                                name="FullName"
                                label="Tên"
                                value={defaultData.FullName}
                                onChange={(e) => this.handleChange('FullName', e.target.value)}
                                validations={{
                                    minLength: 4
                                }}
                                validationErrors={{
                                    required: 'Tên không được để trống',
                                    minLength: 'Tên tối thiểu 4 kí tự'
                                }}
                                type="text"
                                variant="outlined"
                            />

                            <div className="mb-10">
                                <TextFieldFormsy
                                    className="username-dialog"
                                    disabled
                                    required
                                    name="AuthUserName"
                                    label="Tên đăng nhập"
                                    value={defaultData.AuthUserName}
                                    onChange={(e) => this.handleChange('AuthUserName', e.target.value)}
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Tên đăng nhập tối thiểu 4 kí tự'
                                    }}
                                    type="text"
                                    variant="outlined"
                                />

                                <TextField
                                    disabled
                                    id="Code1"
                                    select
                                    value={defaultData.Code1}
                                    onChange={(e) => this.handleChange('Code1', e.target.value)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    disabled
                                    id="Code2"
                                    select
                                    value={defaultData.Code2}
                                    onChange={(e) => this.handleChange('Code2', e.target.value)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    disabled
                                    id="Code3"
                                    select
                                    value={defaultData.Code3}
                                    onChange={(e) => this.handleChange('Code3', e.target.value)}
                                    variant="outlined"
                                >
                                    {_.range(0, 10).map(value => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <TextFieldFormsy
                                className="mb-5"
                                fullWidth
                                name="Phone"
                                label="Số điện thoại"
                                value={defaultData.Phone}
                                onChange={(e) => this.handleChange('Phone', e.target.value)}
                                validations={{
                                    minLength: 10,
                                    maxLength: 11
                                }}
                                validationErrors={{
                                    minLength: 'Số điện thoại tối thiểu 10 số',
                                    maxLength: 'Số điện thoại không vượt quá 11 số'
                                }}
                                type="number"
                                variant="outlined"
                            />

                            <CheckboxFormsy
                                name="Status"
                                checked={defaultData.Status}
                                onChange={(e) => this.handleChange('Status', e.target.checked)}
                                value={defaultData.Status}
                                color="primary"
                                label="Trạng thái (Hoạt động/Khóa)"
                            /><br />

                            <CheckboxFormsy
                                name="Pwd2"
                                checked={defaultData.Pwd2}
                                onChange={(e) => this.handleChange('Pwd2', e.target.checked)}
                                value={defaultData.Pwd2}
                                color="primary"
                                label="Khôi phục mật khẩu 2"
                            /><br />

                            <CheckboxFormsy
                                className="mb-5"
                                name="Pwd_Condition"
                                checked={changePwdCondition}
                                onChange={(e) => this.setState({ changePwdCondition: !this.state.changePwdCondition })}
                                value={changePwdCondition}
                                color="primary"
                                label="Chọn vào đây nếu bạn muốn đổi mật khẩu"
                            /><br />

                            {
                                ((defaultData.Status == true || defaultData.Status == 1) && changePwdCondition) && <div>
                                    <TextFieldFormsy
                                        className="mb-10"
                                        fullWidth
                                        name="Password"
                                        label="Mật khẩu"
                                        value={defaultData.Password}
                                        onChange={(e) => this.handleChange('Password', e.target.value)}
                                        validations={{
                                            minLength: 6
                                        }}
                                        validationErrors={{
                                            minLength: 'Mật khẩu tối thiểu 6 kí tự'
                                        }}
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

                                    <TextFieldFormsy
                                        className="mb-5"
                                        fullWidth
                                        name="Repeat_Password"
                                        label="Nhập lại mật khẩu"
                                        value={defaultData.Repeat_Password}
                                        onChange={(e) => this.handleChange('Repeat_Password', e.target.value)}
                                        validations={{
                                            minLength: 6,
                                            equalsField: 'Password'
                                        }}
                                        validationErrors={{
                                            minLength: 'Nhập lại mật khẩu tối thiểu 6 kí tự',
                                            equalsField: 'Mật khẩu chưa trùng khớp'
                                        }}
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
        success: state.member.member.success,
        errorMsg: state.member.member.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveMember: bindActionCreators(saveMember, dispatch),
        showMessage: bindActionCreators(Actions.showMessage, dispatch)
    }
}

MemberDialogEdit.contextType = AppContext;

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MemberDialogEdit));