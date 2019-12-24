const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'       : 'collapses',
                'title'    : 'Collapses',
                'type'     : 'collapse',
                'icon'     : 'dashboard',
                'children' : [
                    {
                        'id'   : 'member',
                        'title': 'Member',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    },
                    {
                        'id'   : 'account',
                        'title': 'Tài khoản',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'   : 'users',
                'title': 'Users',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/users'
            }
        ]
    }
];

export default navigationConfig;
