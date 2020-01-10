import { authRoles } from 'app/auth';
import Account from './Account';

export const AccountConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/account',
            component: Account
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
