const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.addFlight = async(req, res)=>{
        
         try{
            console.log("i am inh")
            const flightArray = req.body.flights; 
            console.log(req.body,flightArray,"i am body")

            const newFlights = await prisma.flight.createMany({
              data: flightArray.map(flight => ({
                flightNumber: flight.flightNumber,
                departure: flight.departure,
                destination : flight.destination,
                departureTime :flight.departureTime,
                destinationTime:flight.destinationTime,
                availableSeats :flight.availableSeats
              })),
            });
            res.status(201).json({ message: 'created successfully',newFlights });
             return;
         }catch(err){
            console.log(err);
            return res.status(400).json({Message:"Server Error"})
         }

}



exports.getAllFlights = async(req, res)=>{
    console.log("i am here")
        
    try{
        const { departure, destination, startTime, endTime, passengerCount } = req.query;
        console.log(departure,destination,startTime,endTime)
        console.log(new Date(startTime),"i am here")

        const availableFlights = await prisma.flight.findMany({
            where: {
              departure,
              destination,
              departureTime: {
                gte: new Date(startTime),
                lte: new Date(endTime),
              },
              availableSeats: { gte: parseInt(passengerCount) },
            },
          });

          console.log(availableFlights,"i am avalibale flights")
      
          return res.status(200).json(availableFlights);
    }catch(err){
       console.log(err);
       return res.status(400).json({Message:"Server Error"})
    }

}

exports.getPassengerFlights= async(req, res)=> {
    try {
      const { passengerId } = req.query;
      
      const bookedFlights = await prisma.assignment.findMany({
        where: { passengerId },
        include: { flight: true },
      });
      
      res.status(200).json(bookedFlights);
    } catch (error) {
      console.error('Error querying booked flights for passenger:', error);
      res.status(500).json({ error: 'An error occurred while querying booked flights.' });
    }
  }