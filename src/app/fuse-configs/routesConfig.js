import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ManageConfig} from 'app/main/manage/ManageConfig';

const routeConfigs = [
    ManageConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/member" />
    }
];

export default routes;
