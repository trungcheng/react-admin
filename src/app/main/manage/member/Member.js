import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { withRouter } from 'react-router-dom';

import MaterialTable from 'material-table';
import MemberDialogAdd from './MemberDialogAdd';
import MemberDialogEdit from './MemberDialogEdit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'app/store/actions';
import { fetchMembers, fetchDetail } from './store/actions';
import AppContext from 'app/AppContext';

const styles = theme => ({
    layoutRoot: {}
});

class Member extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogOpenAdd: false,
            dialogOpenEdit: false,
            columnsList: [
                { title: '#', field: 'id' },
                { title: 'Fullname', field: 'fullname' },
                { title: 'Username', field: 'username' },
                { title: 'Status', field: 'status' },
                { title: 'Secondary password', field: 'password2' }
            ],
            columnsDetail: [
                { title: '#', field: 'id' },
                { title: 'Account', field: 'account', editable: 'never' },
                { title: 'Member', field: 'member' },
                { title: 'Formula group', field: 'formula-group', editable: 'never' },
                { title: 'Formula name', field: 'formula-name' },
                { title: 'Company', field: 'company', editable: 'never' },
                { title: 'Currency', field: 'currency', editable: 'never' },
                { title: 'Pay/Receive', field: 'pay-receive', editable: 'never' }
            ],
            dataList: [],
            dataDetail: [],
            dataEdit: {}
        };
    }

    componentWillMount() {
        this.props.fetchMembers();
    }

    renderMemberList = (members) => {
        const { classes } = this.props;
        const { 
            columnsList, 
            columnsDetail, 
            dataList, 
            dataDetail, 
            dialogOpenAdd,
            dialogOpenEdit,
            dataEdit
        } = this.state;

        return (
            <MaterialTable
                title="List of member"
                isLoading={false}
                columns={columnsList}
                data={members}
                options={{
                    actionsColumnIndex: 5
                }}
                style={{
                    width: '41%',
                    float: 'left'
                }}
                actions={[
                    {
                        icon: 'add',
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
                        onClick: (rowData) => {
                            this.setState({ 
                                dialogOpenAdd: false,
                                dialogOpenEdit: true,
                                dataEdit: rowData
                            });
                        }
                    }
                ]}
                onRowClick={(event, rowData) => {
                    console.log('row click');
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
        );
    }

    renderMemberDetail = () => {
        const { classes } = this.props;
        const { 
            columnsList, 
            columnsDetail, 
            dataList, 
            dataDetail, 
            dialogOpenAdd,
            dialogOpenEdit,
            dataEdit
        } = this.state;

        return (
            <MaterialTable
                title="Member detail"
                columns={columnsDetail}
                data={dataDetail}
                options={{
                    actionsColumnIndex: 8
                }}
                style={{
                    width: '57%',
                    float: 'right'
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
        );
    }

    render() {
        const { classes, members } = this.props;
        const { 
            columnsList, 
            columnsDetail, 
            dataList, 
            dataDetail, 
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
                        <h2>Member</h2>
                        <br />
                        { this.renderMemberList(this.props.members) }
                        { this.renderMemberDetail(this.props.members) }

                        <MemberDialogAdd open={dialogOpenAdd} />
                        <MemberDialogEdit open={dialogOpenEdit} data={dataEdit} />
                    </div>
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        members: state.member.list,
        member: state.member.member
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