const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.AssignFlight = async(req, res)=>{
    console.log("i am inside")
        
         try{
            const { passengerId, flightId } = req.body;

            // Check if the passenger is already assigned to a flight
            const existingAssignment = await prisma.assignment.findFirst({
              where: { passengerId ,flightId},
            });
        
            if (existingAssignment) {
              return res.status(400).json({ error: 'Passenger is already assigned to a flight.' });
            }
        
            // Retrieve the new flight's departure time
            const newFlight = await prisma.flight.findUnique({ where: { id: flightId } });
            const newDepartureTime = newFlight.departureTime;
            const newDestinationTime = newFlight.destinationTime;
            console.log(new Date(newDepartureTime),"i am time");
        
         

            const conflictingAssignment = await prisma.assignment.findFirst({
              where: {
                passengerId,
                flight: {
                  destinationTime: {
                    gte: new Date(newDepartureTime),
                  },
                  departureTime: {
                    lte: new Date(newDestinationTime),
                  },
                },
              },
            });
            
        
            if (conflictingAssignment) {
              return res.status(400).json({ error: 'Passenger is already assigned to a conflicting flight.' });
            }
        
            // Assign the passenger to the flight
            const newAssignment = await prisma.assignment.create({
              data: {
                passengerId,
                flightId,
              },
            });
        
            res.status(201).json(newAssignment);
        
         }catch(err){
            console.log(err);
            return res.status(400).json({Message:"Server Error"})
         }

}

exports.help = async(req,res)=>{
    return res.status(200).json({message : "ok"})
}