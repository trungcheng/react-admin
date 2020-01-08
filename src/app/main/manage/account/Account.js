import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import MaterialTable from 'material-table';
import AccountDialogAdd from './AccountDialogAdd';
import AccountDialogEdit from './AccountDialogEdit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccounts, saveAccount, fetchDetail } from './store/actions';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            open: false,
            dataDetail: [],
            dataEdit: {}
        };
    }

    componentWillMount() {
        this.handleRefresh();
    }

    openDialogAdd = () => {
		this.setState({
			mode: 'add',
			open: true
		});
    }
    
    openDialogEdit = (dataEdit) => {
		this.setState({
			mode: 'edit',
            open: true,
            dataEdit
		});
	}

    handleClose = () => {
        this.setState({
            open: false,
            mode: null
		});
    }

    handleRefresh = () => {
        this.props.fetchAccounts();
    }

    renderAccountList = (accounts) => {
        const { isFetching } = this.props;

        return (
            <MaterialTable
                title="Danh sách tài khoản"
                isLoading={isFetching}
                columns={[
                    { title: '#', field: 'idx' },
                    { title: 'ID', field: 'AccountID', hidden: true },
                    { title: 'Tên tài khoản', field: 'AccountName' },
                    { title: 'Tên đăng nhập', field: 'UserName' },
                    { title: 'Công ty', field: 'CompanyName' },
                    { title: 'Trạng thái', field: 'StatusName' }
                ]}
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
                            deleteText: 'Bạn có chắc chắn muốn xóa ?'
                        }
                    }
                }}
                data={accounts}
                parentChildData={(row, rows) => rows.find(a => a.AccountID === row.ParentID)}
                options={{
                    actionsColumnIndex: 5,
                    pageSize: 10
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Thêm mới',
                        isFreeAction: true,
                        onClick: () => {
                            this.openDialogAdd();
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Chỉnh sửa',
                        onClick: (event, rowData) => {
                            this.openDialogEdit(rowData);
                        }
                    }
                ]}
                editable={{
                    onRowDelete: oldData => {
                        oldData.Status = 1111;
                        return new Promise((resolve, reject) => {
                            this.props.saveAccount(oldData, (status) => {
                                if (status) {
                                    this.handleRefresh();
                                    this.props.showMessage({ message: 'Xóa thành công' });
                                    resolve();
                                } else {
                                    this.props.showMessage({ message: 'Xóa không thành công' });
                                    reject();
                                }
                            });
                        });
                    }
                }}
            />
        );
    }

    render() {
        const { classes, accounts } = this.props;
        const { 
            mode,
            open,
            dataAdd,
            dataEdit
        } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Tài khoản</h2>
                        <br />
                        { this.renderAccountList(accounts) }

                        <AccountDialogAdd 
                            open={mode == 'add' && open} 
                            onClose={this.handleClose}
                            onRefresh={this.handleRefresh}
                            data={dataAdd} 
                        />

                        <AccountDialogEdit 
                            open={mode == 'edit' && open} 
                            onClose={this.handleClose}
                            onRefresh={this.handleRefresh}
                            data={dataEdit} 
                        />
                    </div>
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.account.account.isFetching,
        accounts: state.account.account.list,
        account: state.account.account.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccounts: bindActionCreators(fetchAccounts, dispatch),
        fetchDetail: bindActionCreators(fetchDetail, dispatch),
        saveAccount: bindActionCreators(saveAccount, dispatch),
        showMessage: bindActionCreators(Actions.showMessage, dispatch)
    }
}

Account.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Account))));