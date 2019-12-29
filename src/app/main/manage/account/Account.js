import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import AccountDialogAdd from './AccountDialogAdd';
import AccountDialogEdit from './AccountDialogEdit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccounts, fetchDetail } from './store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class Account extends Component {

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
                    { title: 'Tên tài khoản', field: 'acc_name' },
                    { title: 'Tên đăng nhập', field: 'sub_user' },
                    { title: 'Công ty', field: 'banker_name' },
                    { title: 'Trạng thái', field: 'statusText' }
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
                            deleteText: 'Bạn có chắc chắn muốn xóa?'
                        }
                    }
                }}
                data={accounts} 
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
        const { classes, accounts } = this.props;
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
                        <h2>Tài khoản</h2>
                        <br />
                        { this.renderAccountList(accounts) }

                        <AccountDialogAdd open={dialogOpenAdd} />
                        <AccountDialogEdit open={dialogOpenEdit} data={dataEdit} />
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
        fetchDetail: bindActionCreators(fetchDetail, dispatch)
    }
}

Account.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Account))));