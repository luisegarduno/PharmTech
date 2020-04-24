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
            axios.get(`${this.url}/manuInventory`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markExpired(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateexpiration`, item, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markBuy(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateOK`, item, this.config)
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
            axios.get(`${this.url}/manuInventory`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getFinancials() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manuInventory`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }
}