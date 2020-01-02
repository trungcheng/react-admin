import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';

import {ManageConfig} from 'app/main/manage/ManageConfig';

import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {authRoleExamplesConfigs} from 'app/main/auth/authRoleExamplesConfigs';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    ...pagesConfigs,
    ...authRoleExamplesConfigs,
    ManageConfig,
    LogoutConfig,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/formula" />
    },
    {
        component: () => <Redirect to="/error-404" />
    }
];

export default routes;
