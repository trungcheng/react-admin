import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';

class createNewService extends FuseUtils.EventEmitter {

    init() {

    }

    fetchMembers = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = [
                    {
                        _id: "5d6ea5f8bc5ee4ef32a81c47",
                        parent_id: "56850ba0097802b9f2392a24",
                        active_password2: 0,
                        status: 0,
                        roles: 11,
                        fullname: "6789",
                        username: "av8883013",
                        id: "5d6ea5f8bc5ee4ef32a81c47",
                        msg: null,
                        msg_link: null,
                        msg_hidden_friend: null
                    },
                    {
                        _id: "5d6ea4bfbc5ee4ef32a81c24",
                        parent_id: "56850ba0097802b9f2392a24",
                        active_password2: 0,
                        status: 0,
                        roles: 11,
                        fullname: "79",
                        username: "av8883009",
                        id: "5d6ea4bfbc5ee4ef32a81c24",
                        msg: null,
                        msg_link: null,
                        msg_hidden_friend: null
                    }
                ];

                resolve({
                    status: true,
                    data
                });
            }, 600);
            // axios.get('/api/auth/register', data)
            //     .then(response => {
            //         if (response.data.user) {
            //             resolve(response.data.user);
            //         } else {
            //             reject(response.data.error);
            //         }
            //     });
        });
    }

}

const instance = new createNewService();

export default instance;
