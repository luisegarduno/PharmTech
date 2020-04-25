export class InventoryItem{
    
    drug_id = 0;
    quantity = 0;
    exp_date = "";

    constructor(drug_id, quantity, exp_date){
        this.drug_id = drug_id;
        this.quantity = quantity;
        this.exp_date = exp_date;
    }
}