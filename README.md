
# Project Title

airline ticketing platform


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
ADD your database url here



## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

 Install all the packages using npm or yarn
 To test all the routes visit the routes folder

The common route is /api/v1

To  test the different functions use specfic routes such as  /api/v1//addFlight to test the add flights functionlity


POSTMAN TESTING

The request body must contain specfic body while testing the api endpoints which you can see from the  respective controllers

for eg

to test the addFlights functionlity 
{
  "flights": [
  {
    "flightNumber": "FL12333",
    "departure": "New York",
    "destination": "Los Angeles",
    "departureTime": "2023-08-15T10:00:00Z",
    "destinationTime": "2023-08-15T11:00:00Z",
    "availableSeats": 150
  }
  
  ]
}

this should be json object present in req.body
here you can add multiple objects in the flight array




    