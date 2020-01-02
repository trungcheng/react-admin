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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class FormulaDialogDelete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openMode: props.open,
            defaultData: {
                id: '',
                formula_name: '',
                code: 'bong88',
                formula_format: 'sportbook-all',
                currency_name: 'usd',
                heso: '',
                giathau: '',
                pay_receive: 'pay'
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
            });
        }
    }

    handleClose = () => {
        this.setState({
            openMode: false
        });
    }

    handleSave = () => {
        const { defaultData } = this.state;
        
        console.log(defaultData);
    }

    render() {
        const { 
            openMode, 
            defaultData
        } = this.state;

        return (
            <div>
                <Dialog
                    open={openMode}
                    fullWidth={true}
                    maxWidth={'xs'}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Bạn có chắc chắn muốn xóa?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">
                            Xóa
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

export default FormulaDialogDelete;