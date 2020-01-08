import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import FuseSettingsConfig from 'app/fuse-configs/settingsConfig';

class accountService extends FuseUtils.EventEmitter {

    init() {

    }

    fetchAccounts = () => {
        return new Promise((resolve, reject) => {
            axios.post(`${FuseSettingsConfig.apiUrl}/api/user/GetLstAccount`, { keyword: '' })
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

    saveAccount = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(`${FuseSettingsConfig.apiUrl}/api/user/CreateNewAccount`, data)
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

    fetchDetail = (AccountID) => {
        return new Promise((resolve, reject) => {
            axios.post(`${FuseSettingsConfig.apiUrl}/api/user/GetDetailAccount`, { AccountID })
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

    getAccountByCompanyId = (companyID) => {
        return new Promise((resolve, reject) => {
            axios.get(`${FuseSettingsConfig.apiUrl}/api/user/GetAccountParentOfCompany/${companyID}`)
                .then(response => {
                    if (response.data.Result === 1) {
                        resolve({
                            status: true,
                            data: response.data.Data
                        });
                    } else {
                        reject(response.data.Message);
                    }
                });
        });
    }
    
}

const instance = new accountService();

export default instance;
