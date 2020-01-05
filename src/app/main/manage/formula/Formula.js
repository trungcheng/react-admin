import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import FormulaDialogAdd from './FormulaDialogAdd';
import FormulaDialogEdit from './FormulaDialogEdit';
import FormulaDialogDelete from './FormulaDialogDelete';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFormulas, fetchDetail } from './store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class Formula extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpenAdd: false,
            dialogOpenEdit: false,
            dialogOpenDelete: false,
            dataDetail: [],
            dataEdit: {},
            dataDelete: {}
        };
    }

    componentWillMount() {
        this.props.fetchFormulas();
    }

    handleOpenFormEdit = (data) => {
        this.setState({
            dialogOpenAdd: false,
            dialogOpenEdit: true,
            dialogOpenDelete: false,
            dataEdit: data
        });
    }

    handleOpenFormDelete = (data) => {
        this.setState({
            dialogOpenAdd: false,
            dialogOpenEdit: false,
            dialogOpenDelete: true,
            dataDelete: data
        });
    }

    renderFormulaList = (formulas) => {
        const { isFetching } = this.props;

        return (
            <MaterialTable
                title="Danh sách công thức"
                isLoading={isFetching}
                columns={[]}
                data={formulas}
                components={{
                    Header: props => {
                        return (
                            <TableHead>
                                <TableRow>
                                    <TableCell rowSpan={2}>#</TableCell>
                                    <TableCell rowSpan={2}>Tên công thức</TableCell>
                                    <TableCell rowSpan={2}>Nhóm</TableCell>
                                    <TableCell rowSpan={2}>Công ty</TableCell>
                                    <TableCell rowSpan={2}>Loại tiền</TableCell>
                                    <TableCell rowSpan={2}>Giao/Nhận</TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        Chi tiết
                                    </TableCell>
                                    <TableCell rowSpan={2}>Số TK sử dụng</TableCell>
                                    <TableCell rowSpan={2}>Sửa</TableCell>
                                    <TableCell rowSpan={2}>Xóa</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Loại</TableCell>
                                    <TableCell align="center">Giá trị</TableCell>
                                </TableRow>
                            </TableHead>
                        );
                    },
                    Row: ({ data }) => {
                        return (
                            <TableRow key={data.idx}>
                                <TableCell>{data.idx}</TableCell>
                                <TableCell>{data.tenct}</TableCell>
                                <TableCell>{data.book_name}</TableCell>
                                <TableCell>{data.banker_name.toUpperCase()}</TableCell>
                                <TableCell>{data.currency_name}</TableCell>
                                <TableCell>{data.giaonhan}</TableCell>
                                <TableCell>{data.format_name}</TableCell>
                                <TableCell>
                                    <TableRow>
                                        <TableCell align="left">Hệ số</TableCell>
                                        <TableCell align="left">{data.field_value[0].value}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ border: "none" }} align="left">Giá thầu</TableCell>
                                        <TableCell style={{ border: "none" }} align="left">{data.field_value[1].value}</TableCell>
                                    </TableRow>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton 
                                            aria-label="edit"
                                            onClick={() => this.handleOpenFormEdit(data)}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Xóa">
                                        <IconButton 
                                            aria-label="delete"
                                            onClick={() => this.handleOpenFormDelete(data)}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    }
                }}
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
                        actions: 'Hành động'
                    },
                    body: {
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
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Thêm mới',
                        isFreeAction: true,
                        onClick: () => {
                            this.setState({
                                dialogOpenAdd: true,
                                dialogOpenEdit: false,
                                dialogOpenDelete: false
                            });
                        }
                    }
                ]}
            />
        );
    }

    render() {
        const { classes, formulas } = this.props;
        const {
            dialogOpenAdd,
            dialogOpenEdit,
            dialogOpenDelete,
            dataEdit,
            dataDelete
        } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Công thức</h2>
                        <br />
                        {this.renderFormulaList(formulas)}

                        <FormulaDialogAdd open={dialogOpenAdd} />
                        <FormulaDialogEdit open={dialogOpenEdit} data={dataEdit} />
                        <FormulaDialogDelete open={dialogOpenDelete} data={dataDelete} />
                    </div>
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.formula.formula.isFetching,
        formulas: state.formula.formula.list,
        formula: state.formula.formula.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFormulas: bindActionCreators(fetchFormulas, dispatch),
        fetchDetail: bindActionCreators(fetchDetail, dispatch)
    }
}

Formula.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Formula))));