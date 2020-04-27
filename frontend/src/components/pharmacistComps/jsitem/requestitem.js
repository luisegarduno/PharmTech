export class RequestItem{
    
    drug_id = 0;
    quantity = 0;
    date_requested = "";

    constructor(drug_id, quantity, date_requested){
        this.drug_id = drug_id;
        this.quantity = quantity;
        this.date_requested = date_requested;
    }
}