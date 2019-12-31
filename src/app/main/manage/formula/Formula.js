import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import FormulaDialogAdd from './FormulaDialogAdd';
import FormulaDialogEdit from './FormulaDialogEdit';

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
            dataDetail: [],
            dataEdit: {}
        };
    }

    componentWillMount() {
        this.props.fetchFormulas();
    }

    renderFormulaList = (formulas) => {
        const { isFetching } = this.props;

        console.log(formulas);

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
                                    <TableCell rowSpan={2}>Tên công thức</TableCell>
                                    <TableCell rowSpan={2}>Nhóm</TableCell>
                                    <TableCell rowSpan={2}>Công ty</TableCell>
                                    <TableCell rowSpan={2}>Loại tiền</TableCell>
                                    <TableCell rowSpan={2}>Giao/Nhận</TableCell>
                                    <TableCell colSpan={2} align="center">
                                        Chi tiết
                                    </TableCell>
                                    <TableCell rowSpan={2}>Số TK sử dụng</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Loại</TableCell>
                                    <TableCell align="center">Giá trị</TableCell>
                                </TableRow>
                            </TableHead>
                        );
                    },
                    Row: ({ formulas }) => {
                        return (
                            <TableRow>
                                <TableCell>{formulas.tenct}</TableCell>
                                <TableCell align="center">{formulas.book_name}</TableCell>
                                <TableCell align="center">{formulas.banker_name}</TableCell>
                                <TableCell align="center">{formulas.currency_name}</TableCell>
                                <TableCell align="center">{formulas.giaonhan}</TableCell>
                                <TableCell align="center"></TableCell>
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
                options={{
                    actionsColumnIndex: 5
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Thêm mới',
                        isFreeAction: true,
                        onClick: () => {
                            this.setState({
                                dialogOpenAdd: true,
                                dialogOpenEdit: false
                            });
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Chỉnh sửa',
                        onClick: (event, rowData) => {
                            this.setState({
                                dialogOpenAdd: false,
                                dialogOpenEdit: true,
                                dataEdit: rowData
                            });
                        }
                    }
                ]}
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
        );
    }

    render() {
        const { classes, formulas } = this.props;
        const {
            dialogOpenAdd,
            dialogOpenEdit,
            dataEdit
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