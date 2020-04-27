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

        getCartInventory(){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getCartInventory')
                    .then(x => {
                        resolve(x.data);
                    })
                    .catch(x => {
                        alert(x);
                        reject(x);
                    })
            })
        }

    getPharmManagerSales(){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getPharmManagerSales')
                    .then(x => {
                        resolve(x.data);
                    })
                    .catch(x => {
                        alert(x);
                        reject(x);
                    })
            })
        }

        getRecentPharmManagerSales(){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getRecentPharmManagerSales')
                    .then(x => {
                        resolve(x.data);
                    })
                    .catch(x => {
                        alert(x);
                        reject(x);
                    })
            })
        }

        getPharmRequest(){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getPhamRequest')
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