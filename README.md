# Eventify

Eventify is a modern event management web application built with **Next.js**, **Firebase**, and **MongoDB**. It allows users to create, manage, and browse events with ease. The platform features user authentication, event search, and an intuitive dashboard for managing events.

---

## Table of Contents

- [Project Description](#project-description)  
- [Setup & Installation](#setup--installation)  
- [Available Routes](#available-routes)  
- [Technologies Used](#technologies-used)

---

## Project Description

Eventify enables users to:

- Sign up and log in securely using Firebase authentication.  
- Add new events with details like title, description, date, time, location, category, priority, price, and images.  
- Browse, search, and view details of all events.  
- Delete events easily from their dashboard.  
- View events in a clean, responsive, and mobile-friendly interface.  

---

## 🚀 Features

- User authentication with Firebase  
- Add, edit, and delete events  
- Event search and filtering  
- Event details page with images and descriptions  
- Responsive design with Tailwind CSS  

---

## Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/roksanadilshad/Event_Management_Next.git
cd event-management

```
2. **Install dependencies:**
npm install


3. **Configure environment variables:**

Create a .env.local file in the root and add:
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>

MONGODB_URI=<your-mongodb-connection-string>



4. **Run the development server:**
npm run dev

5. **Build and start for production:**
npm run build
npm run start
npm run dev

Open http://localhost:3000
 to see your app.

## Available Routes

| Route              | Description                                   |
| ------------------ | --------------------------------------------- |
| `/`                | Home page / Dashboard (protected)             |
| `/login`           | Login page for users                          |
| `/items`           | List of all events                            |
| `/items/[id]`      | Event details page                            |
| `/api/events`      | API route to get or add events (POST/GET)     |
| `/api/events/[id]` | API route to delete a specific event (DELETE) |

Note: All protected routes require the user to be authenticated. Non-authenticated users are redirected to /login.

---

### Technologies Used

- *Next.js 16* – React framework for server-side rendering and static site generation

- *React 19* – Frontend library for building UI

- *Firebase 12* – Authentication and real-time services

- *MongoDB 7* – Database for storing events

- *Tailwind CSS 4* – Styling framework

- *React Hot Toast* – Notifications

- *SweetAlert2* – Interactive alert modals

- *Swiper* – Slider/Carousel components

- *Framer Motion* – Animations

---

# Website live link: https://event-management-next-fscg.vercel.app/