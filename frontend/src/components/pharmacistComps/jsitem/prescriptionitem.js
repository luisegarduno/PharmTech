export class PrescriptionItem{
    
    Title = "";
    Patient = "";
    PrescriptionName = "";
    Quantity = 0;

    constructor(Title, Patient, PrescriptionName, Quantity){
        this.Title = Title; 
        this.Patient = Patient;
        this.PrescriptionName = PrescriptionName;
        this.Quantity = Quantity;
    }
}