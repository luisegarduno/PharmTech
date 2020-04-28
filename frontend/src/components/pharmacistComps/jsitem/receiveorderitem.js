export class ReceiveorderItem{
    
    patientID = 0;
    doctorID = 0;
    drugID = 0;
    quantity = 0;
    createDate = "";
    fillDate = "";

    constructor(Patient, doctor_name, name, quantity, create_date, fill_date){
        this.Patient = Patient; 
        this.doctor_name = doctor_name;
        this.name = name;
        this.quantity = quantity;
        this.create_date = create_date;
        this.fill_date = fill_date;
    }
}