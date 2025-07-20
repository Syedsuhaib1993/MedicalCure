import { model, Schema } from "mongoose";


const patientSchema = new Schema({
    name:String,
    email:String,
    number:String,
    disease:String,
    doctor:String,
    specialty:String,
    status:{
        type:String,
        default:"Pending"
    }
})

const Patient = model('Patients', patientSchema);
export default Patient;