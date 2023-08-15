const express = require("express")
const PassengerRouter = require("./routes/passengerRoutes")
const FlightRouter = require("./routes/flightroutes")
const AssignmentRouter = require("./routes/assignmentroutes")

const app = express();
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended : true}))


app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/v1",PassengerRouter)
app.use("/api/v1",FlightRouter)
app.use("/api/v1",AssignmentRouter)
