import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MemberDialogAdd from './MemberDialogAdd';
import MemberDialogEdit from './MemberDialogEdit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMembers, fetchDetail } from './store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class Member extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: null,
            open: false,
            dataDetail: [],
            dataAdd: {},
            dataEdit: {},
            memberList: [
                { value: '6789', label: '6789' },
                { value: '79', label: '79' }
            ],
            formulaNameList: [
                { value: 'LDBONG88-VND-0.2-PA-(-1)', label: 'LDBONG88-VND-0.2-PA-(-1)' },
                { value: 'LDBONG88-VND-0.34-PA-(-1)', label: 'LDBONG88-VND-0.34-PA-(-1)' }
            ]
        };
    }

    componentWillMount() {
        this.props.fetchMembers();
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
        this.props.fetchMembers();
    }

    renderMemberList = (members) => {
        const { isFetching } = this.props;

        return (
            <div className="member-list">
                <MaterialTable
                    xs={12}
                    title="Danh sách thành viên"
                    isLoading={isFetching}
                    data={members} 
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
                                deleteText: 'Bạn có chắc chắn muốn xóa?'
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

    renderMemberDetail = (member) => {
        const { memberList, formulaNameList } = this.state;

        return (
            <div className="member-detail">
                <MaterialTable
                    xs={12}
                    title="Chi tiết thành viên"
                    columns={[
                        { title: '#', field: 'idx', editable: 'never' },
                        { title: 'Tài khoản', field: 'acc_name', editable: 'never' },
                        { 
                            title: 'Thành viên', 
                            field: 'member',
                            editComponent: props => (
                                <TextField
                                    margin="dense"
                                    id="member"
                                    select
                                    value={props.value}
                                    onChange={e => props.onChange(e.target.value)}
                                    variant="outlined"
                                >
                                    {memberList.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) 
                        },
                        { title: 'Nhóm công thức', field: 'formula_group_name', editable: 'never' },
                        { 
                            title: 'Tên công thức', 
                            field: 'formula_name',
                            editComponent: props => (
                                <TextField
                                    margin="dense"
                                    id="formula_name"
                                    select
                                    value={props.value}
                                    onChange={e => props.onChange(e.target.value)}
                                    variant="outlined"
                                >
                                    {formulaNameList.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )  
                        },
                        { title: 'Công ty', field: 'banker_name', editable: 'never' },
                        { title: 'Loại tiền', field: 'currency', editable: 'never' },
                        { title: 'Giao/Nhận', field: 'pay_receive', editable: 'never' },
                        { title: 'Loại', field: 'type_name', editable: 'never' },
                        { title: 'Giá trị', field: 'value', editable: 'never' }
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
                    data={member}
                    options={{
                        actionsColumnIndex: 10
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
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
        const { classes, members, member, username } = this.props;
        const { 
            mode,
            open,
            dataAdd,
            dataEdit
        } = this.state;

        dataAdd.AuthUserName = username;
        dataEdit.AuthUserName = username;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Thành viên</h2>
                        <br />
                        { this.renderMemberList(members) }
                        { this.renderMemberDetail(member) }

                        <MemberDialogAdd 
                            open={mode == 'add' && open} 
                            onClose={this.handleClose}
                            onRefresh={this.handleRefresh}
                            data={dataAdd} 
                        />
                        <MemberDialogEdit 
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
        username: state.auth.user.data.email,
        isFetching: state.member.member.isFetching,
        members: state.member.member.list,
        member: state.member.member.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMembers: bindActionCreators(fetchMembers, dispatch),
        fetchDetail: bindActionCreators(fetchDetail, dispatch)
    }
}

Member.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Member))));