const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'       : 'manage',
                'title'    : 'Quản lý',
                'type'     : 'collapse',
                'icon'     : 'settings',
                'children' : [
                    // {
                    //     'id'   : 'create-new',
                    //     'title': 'Tạo mới',
                    //     'type' : 'item',
                    //     'url'  : '/create-new'
                    // },
                    {
                        'id'   : 'formula',
                        'title': 'Công thức',
                        'type' : 'item',
                        'url'  : '/formula'
                    },
                    {
                        'id'   : 'member',
                        'title': 'Thành viên',
                        'type' : 'item',
                        'url'  : '/member'
                    },
                    {
                        'id'   : 'account',
                        'title': 'Tài khoản',
                        'type' : 'item',
                        'url'  : '/account'
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
