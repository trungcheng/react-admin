import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';

import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {authRoleExamplesConfigs} from 'app/main/auth/authRoleExamplesConfigs';
import {manageConfigs} from 'app/main/manage/manageConfigs';

import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    ...pagesConfigs,
    ...authRoleExamplesConfigs,
    ...manageConfigs,
    LogoutConfig,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'user', 'userSub', 'member']),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/create-new" />
    },
    {
        component: () => <Redirect to="/error-404" />
    }
];

export default routes;
