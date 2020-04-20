import axios from 'axios'

export class PharmManagerRepository {
    
    url = 'http://localhost:8000'

    config = {
        headers: {
            Authorization: ''
        }
    };


    getItem(item) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}`, item, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    getInventory(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getInventory')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }
}