import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import UserDialogAdd from './UserDialogAdd';
import UserDialogEdit from './UserDialogEdit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUsers, saveUser, fetchDetail } from './store/actions';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            open: false,
            dataDetail: [],
            dataAdd: {},
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
        this.props.fetchUsers();
    }

    renderUserList = (users) => {
        const { isFetching } = this.props;

        return (
            <MaterialTable
                xs={12}
                title="Danh sách user"
                isLoading={isFetching}
                data={users} 
                columns={[
                    { title: '#', field: 'idx' },
                    { title: 'ID', field: 'UserID', hidden: true },
                    { title: 'Tên', field: 'FullName' },
                    { title: 'Tên đăng nhập', field: 'UserName' },
                    { title: 'Điện thoại', field: 'Phone' },
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
                onRowClick={(event, rowData) => {
                    this.setState({
                        open: false,
                        mode: null
                    }, () => {
                        this.props.fetchDetail(rowData.id);
                    });
                }}
                editable={{
                    onRowDelete: oldData => {
                        oldData.Status = 1111;
                        return new Promise((resolve, reject) => {
                            this.props.saveUser(oldData, (status) => {
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
        const { classes, users, user } = this.props;
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
                        <h2>User</h2>
                        <br />
                        { this.renderUserList(users) }

                        <UserDialogAdd 
                            open={mode == 'add' && open} 
                            onClose={this.handleClose}
                            onRefresh={this.handleRefresh}
                            data={dataAdd} 
                        />
                        <UserDialogEdit 
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
        isFetching: state.user.user.isFetching,
        users: state.user.user.list,
        user: state.user.user.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: bindActionCreators(fetchUsers, dispatch),
        fetchDetail: bindActionCreators(fetchDetail, dispatch),
        saveUser: bindActionCreators(saveUser, dispatch),
        showMessage: bindActionCreators(Actions.showMessage, dispatch)
    }
}

User.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(User))));