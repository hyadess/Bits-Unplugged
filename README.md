<h2 align="center">BITS UNPLUGGED</h3>

Live and running on: https://bitsunplugged.onrender.com

## About The Project

- An innovative platform where users can enhance problem-solving skills without coding.
- A seamless and user-friendly interface for engaging with data structure and algorithmic challenges.
- Facilitate conceptual understanding by focusing on problem-solving approaches rather than coding syntax.

## Features

- **Problem Solving**: <br>
    <div style="text-align: center;"><img src="./frontend/public/gifs/toh_dark.gif" alt="toh-dark"></div>

- **Problem Setting**: <br>\*\*\*\*
<!-- <video width="320" height="240" autoplay loop muted>
  <source src="./frontend/public/videos/graph_dark.mp4" type="video/mp4">
  </video>
  <video width="320" height="240" autoPlay loop muted>
  <source src="./frontend/public/videos/graph_dark.mp4" type="video/mp4" />
  </video>
<video src='./frontend/public/videos/graph_dark.mp4' /> -->
- **Read Articles**: Interactive Problem Solving
- **Contest**: Realtime Contests
- **Analytics**: Problem and User analytics
- **Recommendation**: Guided Learning Paths
- **Dashboard**:

## Why Use Our Platform?

## Getting Started

Follow the step by step installation procedure to install and run this on your machine.

## Prerequisites

Make sure you have node and postgresql installed in your device.

**`NodeJs`**: Install Nodejs from [here](https://nodejs.org/en/download/)
**`PostgreSQL`** Install PostgreSQL from [here](https://www.postgresql.org/download/)

## Installation <a name="configuration"></a>

1.  Clone the repo

```sh
git clone https://github.com/mahirlabibdihan/dEducation-frontend.git
```

2.  If you don't have git installed in your device then download zip
3.  After installation or download go to the repository and open command line.

### Configuring Backend

1. Go to backend directory

```sh
cd backend
```

2. Install NPM packages

```sh
npm install
```

#### Configuring Database

```sh
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

#### Setting up the environment variables

create a new file `.env` in the root directory. And the file should have the followings

```sh
DB_USER=YOUR_DB_USER
DB_PASS=YOUR_DB_PASS
DB_PORT=POSTGRES_PORT
DB_DB=YOUR_INITIAL_DATABASE
PORT=YOUR_FAVOURITE_PORT
JWT_SECRET=YOUR_DARKEST_SECRET
EMAIL_USER=YOUR_EMAIL_ADDRESS
EMAIL_PASS=YOUR_EMAIL_APP_PASSWORD
```

If you followed the above then the `.env` should look like this

```sh
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432
DB_DB=bitsunplugged
PORT=5000
JWT_SECRET=kuddusmia
EMAIL_USER="1905072@ugrad.cse.buet.ac.bd"
EMAIL_PASS="password_bolbo_na"
```

We are finally good to go

#### Run the project

Go to your favourite code editor and run

```sh
npm start
```

You should find that the project is working!

### Configuring Frontend

1. Go to frontend directory

```sh
cd frontend
```

2. Install NPM packages

```sh
npm install
```

3.  Ensure backend is configured and running correctly on "http://localhost:5000" (note the port number)

#### Run the project

Go to your favourite code editor and run

```sh
npm start
```

You should find that the project is working!

## Languages, Tools and Frameworks:<a name="tools"></a>

- <h4>Frontend</h4>

  - React.js
  - Tailwind
  - Material Ui
  - React-Konva

- <h4>Backend</h4>

  - Node.js
  - Express.js
  - PostgreSQL
  - Sequelize ORM
  - Passport.js

## Supervisor

- Hasebul Hasan

  - **Adjunt Lecturer**

    :arrow_forward: **Contact:**

    Department of Computer Science and Engineering
    Bangladesh University of Engineering and Technology
    Dhaka-1000, Bangladesh

<p align="right">(<a href="#top">back to top</a>)</p>
