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

export const GetPatient = async(req,res)=>{
    try {
        const patient = await Patient.find();
        return res.status(200).json(patient)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const UpdatePatient = async(req,res)=>{
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json({
            message: "Patient updated successfully",
            patient: patient})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}