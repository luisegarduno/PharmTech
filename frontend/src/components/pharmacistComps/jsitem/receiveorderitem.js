export class ReceiveorderItem{
    
    Patient = "";
    doctor_name = "";
    name = "";
    quantity = 0;
    create_date = "";
    fill_date = "";

    constructor(Patient, doctor_name, name, quantity, create_date, fill_date){
        this.Patient = Patient; 
        this.doctor_name = doctor_name;
        this.name = name;
        this.quantity = quantity;
        this.create_date = create_date;
        this.fill_date = fill_date;
    }
}