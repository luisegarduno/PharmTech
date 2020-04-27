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


    getReceived(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/pharmacyreceiving')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })        
    }


    getPrescription(param){
        if(param == undefined){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/pharmacylist')
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
                debugger;
                axios.get('http://localhost:8000/pharmacylist/' + param)
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

    getInventory(param){
        if(param == undefined){
            return new Promise((resolve,reject) =>{
                axios.get('http://localhost:8000/pharmacyInventory/')
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
                axios.get('http://localhost:8000/pharmacyInventory/' + param)
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

    addPrescription(param){
        debugger;
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/addPrescription', param)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }


    addRequest(param){
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/makeRequest', param)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })        
    }


    getNotification(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/pharmacyNotification')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })      
    }

    editPrescription(Title, PatientID, DrugID,Quantity, doctor_id, create_date, prescription_id){
        debugger;
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:8000/editPrescription', {
                Title: Title, 
                PatientID: PatientID, 
                DrugID: DrugID,
                Quantity: Quantity,
                doctor_id: doctor_id,
                create_date: create_date,
                prescription_id: prescription_id,
            })
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