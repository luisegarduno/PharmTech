import axios from 'axios'

export class ManufacturerRepository {
    
    url = 'http://localhost:8000'

    // config = {
    //     headers: {
    //         Authorization: ''
    //     }
    // };

    getInventory() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/manufacturerorders')
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markExpired(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}`, item, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    markBuy(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}`, item, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getOrders() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/manufacturerorders')
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getSales() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/manufacturerorders')
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getFinancials() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/manufacturerorders')
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }
}