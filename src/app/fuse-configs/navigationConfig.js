const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'       : 'manage',
                'title'    : 'Manage',
                'type'     : 'collapse',
                'icon'     : 'settings',
                'children' : [
                    {
                        'id'   : 'create-new',
                        'title': 'Create new',
                        'type' : 'item',
                        'url'  : '/create-new'
                    },
                    {
                        'id'   : 'formula',
                        'title': 'Formula',
                        'type' : 'item',
                        'url'  : '/formula'
                    },
                    {
                        'id'   : 'member',
                        'title': 'Member',
                        'type' : 'item',
                        'url'  : '/member'
                    },
                    {
                        'id'   : 'account',
                        'title': 'Account',
                        'type' : 'item',
                        'url'  : '/account'
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
