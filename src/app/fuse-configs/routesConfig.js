import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {UserConfig} from 'app/main/user/UserConfig';

const routeConfigs = [
    UserConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/users" />
    }
];

export default routes;
