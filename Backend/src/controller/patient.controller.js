import Patient from "../model/Appointment.js";



export const CreatePatient = async(req,res)=>{
    try {
        const patient = await Patient.create(req.body);
        return res.status(201).json({
            message: "Patient created successfully",
            patient: patient
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}