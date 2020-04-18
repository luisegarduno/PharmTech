import axios from 'axios'

export class PharmacistRepository {

    url = 'http://localhost:8000'

    getIncoming(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/pharmacyincoming')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getOutGoing(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/pharmacyoutgoing')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getInventory(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/pharmacyinventory')
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