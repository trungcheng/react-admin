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

class FormulaDialogEdit extends Component {

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
            },
            codeList: [
                { value: 'bong88', label: 'bong88' },
                { value: 'sbobet', label: 'sbobet' }
            ],
            formatList: [
                { value: 'sportbook-all', label: 'sportbook-all' },
                { value: 'sportbook-casino', label: 'sportbook-casino' }
            ],
            currencyList: [
                { value: 'usd', label: 'usd' },
                { value: 'vnd', label: 'vnd' }
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
            defaultData: {
                ...this.state.defaultData,
                pay_receive: 'pay'
            }
        });
    }

    handleSave = () => {
        const { data } = this.state;
        
        console.log(data);
    }

    handleChange = (field, value) => {
        const { defaultData } = this.state;

        defaultData[field] = value;

        this.setState({
            defaultData
        });
    };

    render() {
        const { 
            openMode, 
            defaultData,
            codeList,
            formatList,
            currencyList
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
                    <DialogTitle id="form-dialog-title">Cập nhật công thức</DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">

                            <TextField
                                fullWidth
                                id="formula_name"
                                label="Tên công thức"
                                value={defaultData.formula_name}
                                onChange={(e) => this.handleChange('formula_name', e.target.value)}
                                variant="outlined"
                                style={{marginBottom: 20}}
                            />

                            <TextField
                                fullWidth
                                id="code"
                                label="Code"
                                select
                                value={defaultData.account}
                                onChange={(e) => this.handleChange('code', e.target.value)}
                                value={defaultData.code}
                                variant="outlined"
                                style={{marginBottom: 20}}
                            >
                                {codeList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                id="formula_format"
                                label="Kiểu công thức"
                                select
                                onChange={(e) => this.handleChange('formula_format', e.target.value)}
                                value={defaultData.formula_format}
                                variant="outlined"
                                style={{marginBottom: 20}}
                            >
                                {formatList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                id="currency_name"
                                label="Loại tiền"
                                select
                                onChange={(e) => this.handleChange('currency_name', e.target.value)}
                                value={defaultData.currency_name}
                                variant="outlined"
                                style={{marginBottom: 20}}
                            >
                                {currencyList.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                id="heso"
                                label="Hệ số"
                                value={defaultData.heso}
                                onChange={(e) => this.handleChange('heso', e.target.value)}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 20}}
                            />

                            <TextField
                                fullWidth
                                id="giathau"
                                label="Giá thầu"
                                value={defaultData.giathau}
                                onChange={(e) => this.handleChange('giathau', e.target.value)}
                                type="text"
                                variant="outlined"
                                style={{marginBottom: 20}}
                            />

                            <FormControl style={{marginTop: 5}}>
                                <FormLabel>Giao/Nhận (Kết quả = (GrossComm * Hệ số + WinLose) * Giá thầu)</FormLabel>
                                <RadioGroup 
                                    value={defaultData.pay_receive} 
                                    onChange={(e) => this.handleChange('pay_receive', e.target.value)}
                                >
                                    <FormControlLabel value="pay" control={<Radio />} label="Giao" />
                                    <FormControlLabel value="receive" control={<Radio />} label="Nhận" />
                                </RadioGroup>
                            </FormControl>
                                    
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

export default FormulaDialogEdit;