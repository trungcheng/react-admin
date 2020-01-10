import { authRoles } from 'app/auth';

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
                    {
                        'id'   : 'create-new',
                        'title': 'Tạo mới',
                        'type' : 'item',
                        // 'auth' : authRoles.user,
                        'url'  : '/create-new'
                    },
                    {
                        'id'   : 'formula',
                        'title': 'Công thức',
                        'type' : 'item',
                        // 'auth' : authRoles.user,
                        'url'  : '/formula'
                    },
                    {
                        'id'   : 'member',
                        'title': 'Thành viên',
                        'type' : 'item',
                        // 'auth' : authRoles.user,
                        'url'  : '/member'
                    },
                    {
                        'id'   : 'account',
                        'title': 'Tài khoản',
                        'type' : 'item',
                        // 'auth' : authRoles.user,
                        'url'  : '/account'
                    },
                    {
                        'id'   : 'user',
                        'title': 'User',
                        'type' : 'item',
                        // 'auth' : authRoles.user,
                        'url'  : '/user'
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
