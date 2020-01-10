import { authRoles } from 'app/auth';
import User from './User';

export const UserConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/user',
            component: User
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
