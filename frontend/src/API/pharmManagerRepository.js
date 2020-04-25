import axios from 'axios'

export class PharmManagerRepository {

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

    getSales(){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getSales')
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