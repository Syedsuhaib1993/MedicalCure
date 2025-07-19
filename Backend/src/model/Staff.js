import { model, Schema } from "mongoose";



const staffSchema = new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"Doctor"
    },
    specialty:String
})


const Staff = model('Staff', staffSchema);

export default Staff;