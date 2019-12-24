import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import _ from '@lodash';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import MaterialTable from 'material-table';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'app/store/actions';
import AppContext from 'app/AppContext';

import axios from 'axios';

const styles = theme => ({
    layoutRoot: {}
});

class User extends Component {

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
            routes,
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
            ],
            data: [
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                {
                    name: 'Zerya Betül',
                    surname: 'Baran',
                    birthYear: 2017,
                    birthCity: 34,
                },
            ],
        };
    }

    render() {
        const { classes } = this.props;
        const { columns, data } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <h2>Quản lý users</h2>
                        <br />
                        <MaterialTable
                            title=""
                            columns={columns}
                            data={data}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data.push(newData);
                                                return { ...prevState, data };
                                            });
                                        }, 600);
                                    }),
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
                }
            />
        )
    }
}

function mapDispatchToProps(dispatch) {

}

function mapStateToProps({ fuse }) {

}

User.contextType = AppContext;

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(User))));