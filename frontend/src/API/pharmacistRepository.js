import axios from 'axios'

export class PharmacistRepository {


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


    getInventory(param){
        if(param == undefined){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getInventory/')
                    .then(x => {
                        resolve(x.data);
                    })
                    .catch(x => {
                        alert(x);
                        reject(x);
                    })
            })
        }
        else{
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/getInventory/' + param)
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

    addinventory(param){
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/addInventory', param)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    deleteinventory(drug_id){
        debugger;
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:8000/delete/' + drug_id)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

}