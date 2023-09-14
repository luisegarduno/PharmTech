import axios from 'axios'

export class PharmacistRepository {

    getDrug(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getDrug')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getPatient(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getPatient')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getDoctor(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getDoctor')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

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
        if(param === undefined){
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
        if(param === undefined){
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
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:8000/delete/' + drug_id)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    deletePrescription(id){
        return new Promise((resolve, reject) => {
            axios.delete('http://localhost:8000/deletePrescription/' + id)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    addPrescription(param){
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

    getUserNotification(param){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/userNotifications/' + param)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })            
    }

    addUserNotification(username, drug_id){
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/addNotification/'+ username, {drug_id : drug_id})
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })     
    }

    deleteUserNotification(username, drug_id){
        return new Promise((resolve, reject) => {
            debugger;
            axios.delete('http://localhost:8000/deleteNotification/' + username, {params: {drug_id: drug_id}})
                .then(x => {
                    debugger;
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    editPrescription(Title, PatientID, DrugID,Quantity, doctor_id, create_date, prescription_id){
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:8000/editPrescription', {
                Title: Title, 
                PatientID: PatientID, 
                DrugID: DrugID,
                Quantity: Quantity,
                doctor_id: doctor_id,
                create_date: create_date,
                id: prescription_id,
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

    editReceiving(param){
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:8000/editReceiving', {
                Title: param.DoctorID, 
                PatientID: param.PatientID, 
                DrugID: param.DrugID,
                Quantity: param.quantity,
                doctor_id: param.DoctorID,
                create_date: param.create_date,
                fill_date: param.fill_date,
                id: param.OrderID,
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