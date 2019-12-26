import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import _ from '@lodash';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import MaterialTable from 'material-table';
import MemberDialog from './MemberDialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

import axios from 'axios';

const styles = theme => ({
    layoutRoot: {}
});

class Member extends Component {

    // const[state, setState] = React.useState({
    //     columns: [
    //         { title: 'Name', field: 'name' },
    //         { title: 'Surname', field: 'surname' },
    //         { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //         {
    //             title: 'Birth Place',
    //             field: 'birthCity',
    //             lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //         },
    //     ],
    //     data: [
    //         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //         {
    //             name: 'Zerya Betül',
    //             surname: 'Baran',
    //             birthYear: 2017,
    //             birthCity: 34,
    //         },
    //     ],
    // });

    constructor(props, context) {
        super(props);
        const { routes } = context;

        this.state = {
            type: 'add',
            dialogOpen: false,
            routes,
            columnsList: [
                { title: 'Fullname', field: 'fullname' },
                { title: 'Username', field: 'username' },
                { title: 'Status', field: 'status' },
                { title: 'Secondary password', field: 'password2' }
            ],
            columnsDetail: [
                { title: 'Account', field: 'account', editable: 'never' },
                { title: 'Member', field: 'member' },
                { title: 'Formula group', field: 'formula-group', editable: 'never' },
                { title: 'Formula name', field: 'formula-name' },
                { title: 'Company', field: 'company', editable: 'never' },
                { title: 'Currency', field: 'currency', editable: 'never' },
                { title: 'Pay/Receive', field: 'pay-receive', editable: 'never' }
            ],
            dataList: [
                {
                    fullname: '6789',
                    username: 'AV8883013',
                    status: 'Off',
                    password2: ''
                },
                {
                    fullname: 'CUSTOMER',
                    username: 'AV8883014',
                    status: 'Off',
                    password2: ''
                }
            ],
            dataDetail: [

            ]
        };
    }

    render() {
        const { classes } = this.props;
        const { columnsList, columnsDetail, dataList, dataDetail, dialogOpen, type } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Member</h2>
                        <br />
                        <MaterialTable
                            title="List of member"
                            isLoading={false}
                            columns={columnsList}
                            data={dataList}
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
                                            dialogOpen: true,
                                            type: 'add'
                                        });
                                    }
                                },
                                {
                                    icon: 'edit',
                                    onClick: rowData => {
                                        this.setState({ 
                                            dialogOpen: true,
                                            type: 'edit' 
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

                        <MemberDialog open={dialogOpen} type={type} />
                    </div>
                }
            />
        )
    }
}

function mapDispatchToProps(dispatch) {

}

function mapStateToProps({ fuse }) {

}

Member.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(Member))));