import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import FuseSettingsConfig from 'app/fuse-configs/settingsConfig';

class userService extends FuseUtils.EventEmitter {

    init() {

    }

    fetchUsers = () => {
        return new Promise((resolve, reject) => {
            axios.post(`${FuseSettingsConfig.apiUrl}/api/user/GetLstMember`, { keyword: '' })
                .then(response => {
                    if (response.data.Result === 1) {
                        resolve({
                            status: true,
                            data: response.data.Data.Data
                        });
                    } else {
                        reject(response.data.Message);
                    }
                });
        });
    }

    saveUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(`${FuseSettingsConfig.apiUrl}/api/user/CreateNewMember`, data)
                .then(response => {
                    if (response.data.Result === 1) {
                        resolve({
                            status: true
                        });
                    } else {
                        reject(response.data.Message);
                    }
                });
        });
    }

    fetchDetail = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = [{
                    _id: "5d6ea60a94a6cee3387704eb",
                    uid: "56850ba0097802b9f2392a24",
                    congthucmau_id: "5d6ea607bc5ee4ef32a81c48",
                    account_id: "5d6ea5ebbc5ee4ef32a81c46",
                    user_id: "5d6ea5f8bc5ee4ef32a81c47",
                    __v: 0,
                    deleted: 0,
                    updated: 0,
                    created: 1567532554,
                    id: "5d6ea60a94a6cee3387704eb",
                    formula_group_name: "",
                    formula_name: "LDBONG88-VND-0.2-PA-(-1)",
                    banker_id: "5913c714b0e6c7ca64ce5320",
                    banker_name: "ldbong88",
                    acc_name: "ldb20dua03",
                    member: "6789",
                    currency: "VND",
                    pay_receive: "Receive",
                    type_name: "Loto-PA",
                    value: "Giá thầu: 0.34"
                }];
                resolve({
                    status: true,
                    data
                });
            }, 600);
            // axios.get('/api/auth/register', id)
            //     .then(response => {
            //         if (response.data.user) {
            //             this.setSession(response.data.access_token);
            //             resolve(response.data.user);
            //         } else {
            //             reject(response.data.error);
            //         }
            //     });
        });
    }
    
}

const instance = new userService();

export default instance;
