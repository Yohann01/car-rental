# CarDeal Development Setup Guide⚙️

This guide is intended for developers who want to set up a local development environment for the PlayLink application. It includes instructions for running and testing the Angular frontend and ASP.NET Core Web API separately.

## Prerequisites📃

Before you begin, ensure you have the following installed:

- Git
- Node.js and npm

## Cloning the Repository

First, clone the CarDeal repository using the following command:

```bash
git clone https://github.com/Yohann01/car-rental
```

Navigate to the project directory:

```bash
cd car-rental
```

## Running Server Locally

### Installing Node Modules


1. Install the necessary npm packages:

```bash
npm install dotenv ejs express express-ejs-layouts express-session method-override mongoose validator bcrypt cookie-parser jsonwebtoken stripe
```

### Running Server in Development Mode
1. Make your own`.env` file:


    ![2024-05-03 17-48-01 (online-video-cutter com) (3)](https://github.com/Yohann01/car-rental/assets/82199055/bc6fd1e4-e478-40d9-94e5-afd245fffda4)
---
2. Ensure to fill the `.env` file with the following environment variables:

`note: Make sure that you have MongoDB cluster and a Stripe account`
```.env
MONGO_URL = (Your MongoDB cluster URL)
PORT = 5000
JWT = (Supply your own secret key)
SESSION = (Supply your own secret key)
STRIPE_SECRET_KEY = (Secret key from Stripe account)
STRIPE_PUBLIC_KEY = (Public key from Stripe account)
```

3. Server is running on port 5000:

```bash
node app.js
```