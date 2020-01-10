/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin', 'user', 'userSub', 'member'],
    user     : ['user'],
    userSub  : ['userSub'],
    member   : ['member'],
    onlyGuest: []
};

export default authRoles;
