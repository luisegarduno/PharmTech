import axios from 'axios'

export class PharmManagerRepository {
    
    url = ''

    config = {
        headers: {
            Authorization: ''
        }
    };

    getCart() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    addCartItem(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}`, item, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getInventory() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }
}