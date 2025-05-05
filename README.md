School Inventory Management System
A comprehensive inventory management solution for educational institutions developed using Java Spring Boot, Angular, and MySQL.

Overview
This system streamlines the inventory management process in schools by providing separate interfaces for staff members and administrators. Staff can request items, track order status, and generate reports, while administrators have complete control over inventory, user management, and approval workflows.
Features
User Side (Teachers & Staff)

Account Management

-Register new accounts
-Update personal and contact information
-Secure login with role-based access


Inventory Browsing

-View available items in the inventory
-Check stock status (available/out of stock)
-Search and filter functionality


Order Management

-Request items from inventory
-Track request status (pending, approved, declined)
-View order history
-Download order lists as reports



Admin Side

Inventory Control

-Complete CRUD operations for inventory items
-Add new products with descriptions and images
-Update product prices (not visible to regular users)
-Manage stock levels


Order Processing

-Review incoming item requests
-Approve or decline requests

Analytics & Reporting

-View most frequently ordered items
-Interactive data visualization with charts and graphs
-Generate and export inventory reports



Technology Stack

-Backend
Java 17+ will work
-Spring Boot 3.x
-JPA for ORM
-Maven for dependency management


Frontend

-Angular 15+
-TypeScript
-Chart.js for data visualization


Database

-MySQL Workbench

Getting Started
Prerequisites

JDK 17 or higher
Node.js 16.x or higher
npm 8.x or higher
MySQL 8.0 or higher
Maven 3.8 or higher

Database Setup

Install MySQL Workbench
Create a new database named school_inventory
Update the database configuration in application.properties

Backend Setup

Clone the repository

Install dependencies and build
bashmvn clean install

Run the application
bashmvn spring-boot:run
The backend server will start on http://localhost:8080

Frontend Setup

Navigate to the frontend directory
bashcd ../frontend

Install dependencies
bashnpm install

Run the development server
bashng serve
The frontend application will be available at http://localhost:4200

Initial Admin Setup

When the application first runs, it automatically creates an admin account with the following credentials:

Username: admin@schoolmis.co.za
Password: admin
