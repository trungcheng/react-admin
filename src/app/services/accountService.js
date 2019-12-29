import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';

class accountService extends FuseUtils.EventEmitter {

    init() {

    }

    fetchAccounts = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = [
                    {
                        _id: "5bdd87f5787dcb61d7297fe5",
                        acc_parent_id: null,
                        banker: "56850ba0097802b9f23929b4",
                        uid: "56850ba0097802b9f2392a24",
                        book_id: "56850ba0097802b9f23929ad",
                        __v: 0,
                        deleted: 0,
                        updated: 1559992374,
                        created: 1541244917,
                        is_active: 'true',
                        is_confirm: false,
                        is_sub: "false",
                        data_center_sync: false,
                        flag_type: 0,
                        sub_locked_reason: "",
                        sub_locked: 0,
                        sub_login_num: "",
                        note: "",
                        sub_code: "112233",
                        sub_pass: "Qqqq1111@@",
                        sub_user: "67mfcah011s4",
                        checked: 1,
                        acc_name: "67mfcah011",
                        id: "5bdd87f5787dcb61d7297fe5",
                        short_name: "332",
                        banker_name: "332bet",
                        banker_id: "56850ba0097802b9f23929b4",
                        editable: true,
                        book_name: "sportsbook",
                        can_show: true
                    },
                    {
                        _id: "5b8a4c75787dcb61d728b3ba",
                        acc_parent_id: null,
                        banker: "56850ba0097802b9f23929b4",
                        uid: "56850ba0097802b9f2392a24",
                        book_id: "56850ba0097802b9f23929ad",
                        __v: 0,
                        deleted: 0,
                        updated: 1559992374,
                        created: 1535790197,
                        is_active: true,
                        is_confirm: false,
                        is_sub: "false",
                        data_center_sync: false,
                        flag_type: 0,
                        sub_locked_reason: "",
                        sub_locked: 0,
                        sub_login_num: "",
                        note: "",
                        sub_code: "797979",
                        sub_pass: "Ttt111@@@",
                        sub_user: "68syf01s2",
                        checked: 1,
                        acc_name: "68syf01",
                        id: "5b8a4c75787dcb61d728b3ba",
                        short_name: "332",
                        banker_name: "332bet",
                        banker_id: "56850ba0097802b9f23929b4",
                        editable: true,
                        book_name: "sportsbook",
                        can_show: true
                    },
                    {
                        _id: "5d6ea078bc5ee4ef32a81bee",
                        acc_parent_id: null,
                        banker: "56850ba0097802b9f23929c5",
                        uid: "56850ba0097802b9f2392a24",
                        book_id: "56850ba0097802b9f23929b0",
                        __v: 0,
                        deleted: 0,
                        updated: 0,
                        created: 1567531128,
                        is_active: true,
                        is_confirm: false,
                        is_sub: "false",
                        data_center_sync: false,
                        flag_type: 0,
                        sub_locked_reason: "",
                        sub_locked: 0,
                        sub_login_num: "",
                        note: "",
                        sub_code: "",
                        sub_pass: "qqq000",
                        sub_user: "789a68sub01",
                        checked: 1,
                        acc_name: "789a68sub01",
                        id: "5d6ea078bc5ee4ef32a81bee",
                        short_name: "LD789",
                        banker_name: "ld789",
                        banker_id: "56850ba0097802b9f23929c5",
                        editable: true,
                        book_name: "loto",
                        child: [
                            {
                                _id: "5d6ea422bc5ee4ef32a81c1b",
                                acc_parent_id: "5d6ea078bc5ee4ef32a81bee",
                                banker: "56850ba0097802b9f23929c5",
                                uid: "56850ba0097802b9f2392a24",
                                book_id: "56850ba0097802b9f23929b0",
                                __v: 0,
                                deleted: 0,
                                updated: 0,
                                created: 1567532066,
                                is_active: true,
                                is_confirm: false,
                                is_sub: "0",
                                data_center_sync: false,
                                flag_type: 0,
                                sub_locked_reason: "",
                                sub_locked: 0,
                                sub_login_num: "",
                                note: "",
                                sub_code: "",
                                sub_pass: "",
                                sub_user: "",
                                checked: 1,
                                acc_name: "789a68a2",
                                id: "5d6ea422bc5ee4ef32a81c1b",
                                short_name: "LD789",
                                banker_name: "ld789",
                                banker_id: "56850ba0097802b9f23929c5",
                                editable: true,
                                book_name: "loto",
                                so_ct: 1,
                                can_show: true
                            }
                        ],
                        can_show: true
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
                    value: "Price:0.34"
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

const instance = new accountService();

export default instance;
