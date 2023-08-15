const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.addPassenger = async(req, res)=>{
        
         try{
            console.log("i am inh")
            
            const passengerArray = req.body.passengers; // Assuming the array is in the 'passengers' property of the request body

            const newPassengers = await prisma.passenger.createMany({
              data: passengerArray.map(passenger => ({
                firstName: passenger.firstName,
                lastName: passenger.lastName,
                passportNumber : passenger.passportNumber,
              })),
            });
            res.status(201).json({ message: 'created successfully' });
             return;
         }catch(err){
            console.log(err);
            return res.status(400).json({Message:"Server Error"})
         }

}