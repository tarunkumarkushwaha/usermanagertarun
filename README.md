# Next.js User Management App by tarun

live link - 

Welcome! This is a simple **Next.js** application built for a test assignment. It handle user authentication, listing users, editing their details, and deleting them. 

## Features
- Login with **Reqres API** credentials
- Display a paginated list of users
- Edit user details
- Delete users from the list

## Installation
1. **Clone the repository:**

   git clone https://github.com/tarunkumarkushwaha/usermanagertarun
   cd your-repo


2. **Install dependencies:**
 
   npm install

## Running the Project
To start the development server, run:

npm run dev

Then, open **http://localhost:3000** in your browser.

## Authentication
- **Test Login Credentials:**
  - **Email:** `eve.holt@reqres.in`
  - **Password:** `cityslicka`

## API Endpoints Used
- **Login:** `POST https://reqres.in/api/login`
- **Get Users (Paginated):** `GET https://reqres.in/api/users?page=1`
- **Get User by ID:** `GET https://reqres.in/api/users/{id}`
- **Update User:** `PUT https://reqres.in/api/users/{id}`
- **Delete User:** `DELETE https://reqres.in/api/users/{id}`

## Notes
The token is stored in **localStorage** for session management.
Dynamic Routing Used in Next.js for editing users.

Let me know if you run into any issues!

my portfolio - https://tarunkushwahaportfolio.netlify.app/