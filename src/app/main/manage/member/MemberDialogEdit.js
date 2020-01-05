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
import AppContext from 'app/AppContext';

class MemberDialogEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openMode: props.open,
            showPassword: false,
            showPasswordRepeat: false,
            changePwdCondition: false,
            isFormValid: false,
            defaultData: {
                UserID: 2,
                FullName: '',
                UserName: '',
                Phone: '',
                Status: true,
                // Pwd2: false,
                Password: '',
                Repeat_Password: ''
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
                        Status: (this.state.defaultData.Status === 0) ? false : true
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
            changePwdCondition: false
            // defaultData: {
            //     ...this.state.defaultData,
            //     Pwd2: false
            // }
        });
    }

    handleSave = () => {
        const { defaultData } = this.state;
        
        delete defaultData['Repeat_Password'];
        delete defaultData['StatusName'];
        delete defaultData['tableData'];
        delete defaultData['idx'];
        defaultData.Status = defaultData.Status ? 1 : 0; 
        
        this.props.saveMember(defaultData);
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
        const { success, errorMsg } = this.props;
        const { 
            openMode, 
            showPassword, 
            showPasswordRepeat,
            changePwdCondition,
            isFormValid,
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

                            <TextFieldFormsy
                                className="mb-10"
                                fullWidth
                                disabled
                                required
                                name="UserName"
                                label="Tên đăng nhập"
                                value={defaultData.UserName}
                                onChange={(e) => this.handleChange('UserName', e.target.value)}
                                validations={{
                                    minLength: 4
                                }}
                                validationErrors={{
                                    minLength: 'Tên đăng nhập tối thiểu 4 kí tự'
                                }}
                                type="text"
                                variant="outlined"
                            />

                            <TextFieldFormsy
                                className="mb-10"
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

                            {/* <CheckboxFormsy
                                className="mb-5"
                                name="Pwd2"
                                checked={defaultData.Pwd2}
                                onChange={(e) => this.handleChange('Pwd2', e.target.checked)}
                                value={defaultData.Pwd2}
                                color="primary"
                                label="Khôi phục mật khẩu 2"
                            />

                            <CheckboxFormsy
                                className="mb-5"
                                name="Pwd_Condition"
                                checked={changePwdCondition}
                                onChange={(e) => this.setState({ changePwdCondition: !this.state.changePwdCondition })}
                                value={changePwdCondition}
                                color="primary"
                                label="Chọn vào đây nếu bạn muốn đổi mật khẩu"
                            /> */}

                            {/* { */}
                                {/* defaultData.Status && changePwdCondition && <div> */}
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
                                {/* </div> */}
                            {/* } */}

                            <CheckboxFormsy
                                name="Status"
                                checked={defaultData.Status}
                                onChange={(e) => this.handleChange('Status', e.target.checked)}
                                value={defaultData.Status}
                                color="primary"
                                label="Trạng thái"
                            /><br />

                            {
                                !success && <FormControl error>
                                    <FormHelperText 
                                        style={{fontSize: '1.4rem'}} 
                                        id="component-error-text"
                                    >
                                        { errorMsg }
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
        saveMember: bindActionCreators(saveMember, dispatch)
    }
}

MemberDialogEdit.contextType = AppContext;

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MemberDialogEdit));