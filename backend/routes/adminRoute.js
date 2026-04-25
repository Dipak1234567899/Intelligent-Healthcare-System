 import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

// YEH API ADD KARO
adminRouter.post("/verify-whatsapp", authAdmin, (req, res) => {
    try {
        const { phoneNumber, countryCode } = req.body
        
        console.log('📱 Verifying WhatsApp:', phoneNumber, countryCode)
        
        if (!phoneNumber) {
            return res.json({ valid: false, message: 'Phone number required' })
        }
        
        // Always return success for now
        res.json({ valid: true, message: 'WhatsApp verified' })
        
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ valid: false, message: 'Verification failed' })
    }
})

export default adminRouter;