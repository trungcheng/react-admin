import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNew } from './store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class CreateNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpenAdd: false,
            dialogOpenEdit: false,
            accountList: [],
            memberList: [],
            typeList: [
                { value: 'Nhóm công thức', label: 'Nhóm công thức' },
                { value: 'Công thức', label: 'Công thức' }
            ],
            formulaList: [],
            data: {
                account: 0,
                member: 0,
                type: 'Nhóm công thức',
                formula: 0
            }
        };
    }

    handleChange = (field, value) => {
        const { data } = this.state;

        data[field] = value;

        this.setState({
            data
        });
    };

    renderCreateForm = () => {
        const { isCreating } = this.props;
        const { accountList, memberList, typeList, formulaList, data } = this.state;

        return (
            <div className="member-list">
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="dense"
                        id="account"
                        label="Tài khoản"
                        select
                        value={data.account}
                        onChange={(e) => this.handleChange('account', e.target.value)}
                        variant="outlined"
                        style={{marginBottom: 20}}
                    >
                        <MenuItem key={0} value={0}>-- Chọn tài khoản --</MenuItem>
                        {accountList.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label.toUpperCase()}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        margin="dense"
                        id="member"
                        label="Thành viên"
                        select
                        value={data.member}
                        onChange={(e) => this.handleChange('member', e.target.value)}
                        variant="outlined"
                        style={{marginBottom: 20}}
                    >
                        <MenuItem key={0} value={0}>-- Chọn thành viên --</MenuItem>
                        {memberList.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        margin="dense"
                        id="type"
                        label="Loại"
                        select
                        value={data.type}
                        onChange={(e) => this.handleChange('type', e.target.value)}
                        variant="outlined"
                        style={{marginBottom: 20}}
                    >
                        {typeList.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        margin="dense"
                        id="formula"
                        label={data.type}
                        select
                        value={data.formula}
                        onChange={(e) => this.handleChange('formula', e.target.value)}
                        variant="outlined"
                        style={{marginBottom: 20}}
                    >
                        {
                            data.type == 'Nhóm công thức' ?
                                <MenuItem key={0} value={0}>-- Chọn nhóm công thức --</MenuItem>
                            :
                                <MenuItem key={0} value={0}>-- Chọn công thức --</MenuItem>
                        }
                        {formulaList.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="contained"
                        color="primary"
                        className="mx-auto mt-16 normal-case"
                        aria-label="LƯU LẠI"
                        value="legacy"
                    >
                        Lưu lại
                    </Button>
                </form>
            </div>
        );
    }

    renderCreateList = (list) => {
        return (
            <div className="member-detail">
                <MaterialTable
                    title="Chi tiết"
                    columns={[
                        { title: '#', field: 'idx' },
                        { title: 'Thành viên', field: 'member' },
                        { title: 'Nhóm công thức', field: 'formula_format' },
                        { title: 'Công thức', field: 'formula_name' }
                    ]}
                    data={[]}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} của {count}',
                            labelRowsSelect: 'bản ghi',
                            firstTooltip: 'Trang đầu',
                            previousTooltip: 'Trang trước',
                            nextTooltip: 'Trang tiếp',
                            lastTooltip: 'Trang cuối'
                        },
                        toolbar: {
                            nRowsSelected: '{0} bản ghi được chọn',
                            searchPlaceholder: 'Tìm kiếm',
                            searchTooltip: 'Tìm kiếm'
                        },
                        header: {
                            actions: 'Xóa'
                        },
                        body: {
                            editTooltip: "Chỉnh sửa",
                            deleteTooltip: "Xóa",
                            emptyDataSourceMessage: 'Không có dữ liệu',
                            filterRow: {
                                filterTooltip: 'Lọc'
                            },
                            editRow: {
                                cancelTooltip: 'Hủy',
                                saveTooltip: 'Xác nhận',
                                deleteText: 'Bạn có chắc chắn muốn xóa?'
                            }
                        }
                    }}
                    options={{
                        search: false,
                        actionsColumnIndex: 5
                    }}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </div>
        );
    }

    render() {
        const { classes, list } = this.props;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Tạo mới</h2>
                        <br />
                        { this.renderCreateForm() }
                        { this.renderCreateList(list) }
                    </div>
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isCreating: state.create.create.isCreating,
        list: state.create.create.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNew: bindActionCreators(createNew, dispatch)
    }
}

CreateNew.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(CreateNew))));