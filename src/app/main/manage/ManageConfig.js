import { Formula } from './formula';
import { Member } from './member';
import { Account } from './account';

export const ManageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/formula',
            component: Formula
        },
        {
            path     : '/member',
            component: Member
        },
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
