# Car Rental Web Application

A full-stack car rental web application built with **Next.js**, **Node.js**, **React**, **TypeScript**, **CSS3** , **SWR**, **Supabase** and **Clerk** for authentication. This application allows users to browse, filter, and book cars for rent. It includes features like location-based searches, pricing filters, and car availability.

## Features

- **User Authentication** using **Clerk**.
- **Car rental search** based on location, price, and car type.
- **Responsive design** with modern UI.
- **Car listing** with detailed information about each vehicle.
- **Filter functionality** for pickup and drop-off locations, car type, and price.
- **Integration with GraphQL** using **Hygraph** (Headless CMS).
- **Round-trip feature** for booking cars with different pickup and drop-off locations.

## Tech Stack

- **Frontend**: 
  - Next.js (React-based framework)
  - TypeScript
  - Clerk for authentication
  - CSS Modules / Styled Components
  - SWR for data fetching
- **Backend**:
  - Hygraph (Headless CMS for car data)
  - Serverless functions (Vercel)
- **Deployment**:
  - Vercel for hosting and deployment

## Prerequisites

Before you can run this project locally, make sure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Comes bundled with Node.js
- **Vercel CLI** (optional for deployment): [Install Vercel CLI](https://vercel.com/docs/cli)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/car-rental-web-application.git
   cd car-rental-web-application
