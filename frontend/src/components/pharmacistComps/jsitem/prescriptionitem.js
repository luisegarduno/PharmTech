export class PrescriptionItem{
    
    title = "";
    patient_id = 0;
    drug_id = 0;
    create_date = "";
    doctor_id = 0;
    quantity = 0;

    constructor(title, patient_id, drug_id, quantity, create_date, doctor_id){
        this.title = title; 
        this.patient_id = patient_id;
        this.drug_id = drug_id;
        this.quantity = quantity;
        this.create_date = create_date;
        this.doctor_id = doctor_id;
    }
}