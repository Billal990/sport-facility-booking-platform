# Sport Facility Booking System

## Overview

The Sport Facility Booking System is a TypeScript-based backend application designed to manage bookings for various sports facilities. It uses MongoDB for data storage, Mongoose for object modeling, Express.js for handling routes and middleware, and Zod for input validation. The system includes role-based authentication with endpoints accessible to "user" and "admin" roles as per specified permissions.

## Key Features

- **User Management:** Allows users to sign up and log in securely.

- **Facility Management:** Admins can perform CRUD operations on facilities.

- **Booking Management:** Users can book facilities for specific time slots, and admins can view all bookings or bookings by specific users.

- **Availability Check:** Provides endpoint to check availability of facilities on a given date.

- **Role-based Access Control:** Ensures that only authorized users can access specific endpoints based on their roles.

## Installation

1. **Clone the repository:**
   git clone https://github.com/Billal990/sport-facility-booking-platform

2. **Install dependencies:**
   cd sport-facility-booking-system <br>
   npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and define the following variables:
   PORT=3000 <br>
   MONGODB_URI=`<Your MongoDB connection URI>`

4. **Run the application:**
   npm start
   The application should now be running on http://localhost:3000.

## API Endpoints

### Authentication

- **POST /api/auth/signup** - User signup.

- **POST /api/auth/login** - User login.

### Facilities

- **GET /api/facility** - Get all facilities.

- **POST /api/facility** - Admin can create a new facility.

- **DELETE /api/facility/:id** - Admin can delete a facility.

- **PUT /api/facility/:id** - Admin can update a facility.

### Bookings

- **GET /api/bookings** - (Admin) Get all bookings.

- **GET /api/bookings/user** - (User) Get bookings of the logged-in user.

- **POST /api/bookings** - (User) Make a booking for a facility.

- **DELETE /api/bookings/:id** - (User) Cancel a booking.

### Availability

- **GET /api/check-availability?date=<YYYY-MM-DD>** - Check availability of facilities on a specific date.


## Live API URL
You can access the live API at https://l2-b3-assignment2-product-management-api.vercel.app/

## Technologies Used

- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **TypeScript:** Typed superset of JavaScript that compiles to plain JavaScript.
- **Zod:** TypeScript-first schema declaration and validation library.
- **Dotenv:** Module that loads environment variables from a .env file into process.env.
- **CORS:** Middleware for enabling Cross-Origin Resource Sharing in Express.js.

## Usage

- Ensure MongoDB is running and accessible.
- Use API testing tools like Postman or curl to interact with the API endpoints.
- Authenticate admin and user requests with JSON Web Tokens (JWTs) included in the Authorization header

I am excited for you to explore and leverage the capabilities of Sport Facility Booking System. Should you have any questions, feedback, or suggestions, please don't hesitate to reach out. Thank you for choosing my solution to enhance Sport Facility Booking System workflows!
