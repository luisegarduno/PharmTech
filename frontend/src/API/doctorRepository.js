import axios from 'axios'

export class DoctorRepository {
    
    url = 'http://localhost:8000'

    // config = {
    //     headers: {
    //         Authorization: ''
    //     }
    // };

    getInventory() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDoctorInventory`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);           // Handle Error
                    reject(x);
                });
        });
    }

    getDrugTypes() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDrugTypes`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);           // Handle Error
                    reject(x);
                });
        });
    }

    getOrders() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/manufacturerorders`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);           // Handle Error
                    reject(x);
                });
        });
    }
}