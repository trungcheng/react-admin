import { authRoles } from 'app/auth';
import Member from './Member';

export const MemberConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/member',
            component: Member
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
