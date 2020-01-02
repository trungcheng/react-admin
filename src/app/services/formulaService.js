import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';

class formulaService extends FuseUtils.EventEmitter {

    init() {

    }

    fetchFormulas = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = [
                    {
                        id: "576a624553bf136435176ad3",
                        giaonhan: "Nhận",
                        tenct: "332BET-USD-0.02-5.5-A",
                        banker_name: "332bet",
                        format_name: "Sportbook-All",
                        currency_name: "USD",
                        book_name: "sportsbook",
                        book_id: "56850ba0097802b9f23929ad",
                        field_value: [
                            {
                                value: "5.5",
                                id: "576a624553bf136435176ad4",
                                field_name: "he_so"
                            },
                            {
                                value: "0.02",
                                id: "576a624553bf136435176ad5",
                                field_name: "gia_thau"
                            }
                        ]
                    },
                    {
                        id: "576a624553bf136435176aa3",
                        giaonhan: "Nhận",
                        tenct: "332BET-USD-0.18-5.5-A",
                        banker_name: "332bet",
                        format_name: "Sportbook-All",
                        currency_name: "USD",
                        book_name: "sportsbook",
                        book_id: "56850ba0097802b9f23929ad",
                        field_value: [
                            {
                                value: "5.5",
                                id: "576a624553bf136435176ad4",
                                field_name: "he_so"
                            },
                            {
                                value: "0.18",
                                id: "576a624553bf136435176ad5",
                                field_name: "gia_thau"
                            }
                        ]
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

const instance = new formulaService();

export default instance;
