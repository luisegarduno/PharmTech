import axios from 'axios'

export class ManufacturerRepository {
    
    url = 'http://localhost:8000'

    config = {
        headers: {
            Authorization: ''
        }
    };

    getInventory() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manuinventory`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markExpired(tf, batchid) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateExpiration`, tf, batchid)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markBuy(tf, batchid) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateOK`, tf, batchid)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getOrders() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manufacturerorders`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getSales() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manuinventory`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getFinancials() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manuinventory`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }
}