import bcrypt from 'bcrypt';
import Staff from '../model/Staff.js';
import jwt from 'jsonwebtoken'

export const createStaff = async(req,res)=>{
    try {
        const {name, email, password,  specialty} = req.body;
        if(!name || !email || !password  || !specialty){
            return res.status(400).json({message: "Please fill in all fields"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const existemail = await Staff.findOne({email});
        if(existemail){
            return res.status(400).json({message: 'Email already exist'});
        }
        const staff = new Staff({
            name, email, password: hashedPassword, specialty
            });
            await staff.save();
            res.json({message: 'Doctor added successfully',
                staff});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getStaff = async(req,res)=>{
    try {
        const staff = await Staff.find();
        return res.status(200).json(staff);
    } catch (error) {
      return res.status(500).json({message: error.message})   
    }
}

export const getStaffById = async(req,res)=>{
    try {
        const id = req.params.id;
        const staff = await Staff.findById(id);
        if(!staff){
            return res.status(404).json({message: 'Doctor not found'});
        }
        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateStaff = async(req,res)=>{
    try {
        const id = req.params.id;
        const {name, email, specialty} = req.body;
        const staff = await Staff.findByIdAndUpdate(id,{
            name, email, specialty
        },{new: true});
        return res.status(200).json({
            message: 'Doctor updated successfully',
            staff
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteStaff = async(req,res)=>{
    try {
        const id = req.params.id;
        await Staff.findByIdAndDelete(id);
        return res.status(200).json({message: 'Doctor deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const loginStaff = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Please enter both email and password'});
        }
        const staff = await Staff.findOne({email});
        if(!staff){
            return res.status(404).json({message: 'Invalid email or password'});
        }
        const isValidPassword = await bcrypt.compare(password, staff.password);
        if(!isValidPassword){
            return res.status(404).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign({id: staff._id}, process.env.SECRET_KEY,
            {expiresIn: '1h'});
            return res.status(200).json({message: 'Login successful', token,staff});
    } catch (error) {
        return res.status(500).json({message: error.message})
   }
}