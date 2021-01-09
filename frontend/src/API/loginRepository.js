import axios from 'axios'

export class LoginRepository {
    
    registerUser(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/registerUser')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);       // Handle Error
                    reject(x);
                })
        })
    }

    verifyUser(username, password, loginType){
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:8000/verifyUser', username, password, loginType)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);       // Handle Error
                    reject(x);
                })
        })
    }
}