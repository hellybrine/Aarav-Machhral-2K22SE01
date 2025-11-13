# Project Documentation

## 1. Introduction

This project implements **Boostly**, a peer recognition platform designed for college students. The system allows students to recognize others by sending credits, endorse existing recognitions, and redeem earned credits for vouchers. It encourages positive interactions, rewards contribution, and provides transparency within student communities.

The final deliverable is a fully functional, containerized full-stack web application built with React, Flask, SQLite, and Docker.

---

## 2. Objectives

The primary goals of the project were:

1. Build an application where students can:

   * Send recognitions with a credit transfer.
   * Endorse existing recognition entries.
   * Redeem accumulated credits for vouchers.

2. Enforce core business rules:

   * Monthly credit allocation.
   * Monthly sending limit.
   * Prevention of self-recognition.
   * Credit balance validation.
   * Fixed conversion rate for voucher redemption.

3. Implement additional “step-up” functionality:

   * Monthly credit reset with carry-forward rules.
   * Leaderboard ranked by credits, recognitions, and endorsements.

4. Deliver the application with:

   * Complete documentation.
   * Clean API design.
   * Test cases.
   * Dockerized setup for easy deployment.

---

## 3. Key Features Implemented

### 3.1 Recognition System

Students can send credits along with a message. The system enforces:

* Monthly credit limit of 100.
* Cannot send to oneself.
* Credits cannot exceed current balance.
* Validation of both sender and receiver IDs.

### 3.2 Endorsements

Users can endorse existing recognition entries.
Endorsements increase an integer counter without affecting credit balances.

### 3.3 Redemption

Students can redeem credits:

* Credits are permanently deducted.
* Voucher value is calculated at ₹5 per credit.
* System generates a unique voucher code.

### 3.4 Leaderboard

Displays top recipients based on:

* Total credits received.
* Number of recognitions.
* Total endorsements.
* Tie-breaking by student ID.

### 3.5 Monthly Reset Logic

* Students receive 100 fresh credits each month.
* Up to 50 unused credits can be carried forward.
* Sending limit resets monthly.

---

## 4. System Architecture

### 4.1 Architectural Overview

The system follows a **client–server architecture** consisting of:

* **Frontend (React + Vite)**
  Responsible for rendering the UI, sending API requests, and handling user interactions.

* **Backend API (Flask)**
  Exposes REST endpoints for data management, business logic, recognition creation, endorsements, and redemptions.

* **Database (SQLite)**
  Stores student profiles, recognitions, endorsements, and vouchers.

* **Docker Containerization**
  Used to ensure reproducible builds and isolate frontend and backend environments.

---

## 5. Technologies Used

### 5.1 Frontend

* **React** for UI development.
* **Vite** as the build tool.
* **Tailwind CSS** for styling.
* **Axios** for API communication.
* **Framer Motion** (optional) for UI animations.

### 5.2 Backend

* **Python 3.13**
* **Flask** for REST API development.
* **Flask-SQLAlchemy** as ORM.
* **Flask-CORS** for cross-origin requests.
* **SQLite** for local data persistence.

### 5.3 Deployment and Infrastructure

* **Docker** for containerization.
* **Docker Compose** for orchestration of multi-container application.
* **Node.js 20-alpine** base image for frontend build.
* **Python 3.13-slim** base image for backend.

---

## 6. Development Workflow

### 6.1 Backend Development

The backend was developed first to define the core entities and business logic:

* Students
* Recognitions
* Endorsements
* Vouchers

Using SQLAlchemy models allowed enforcement of rules directly at the application layer.
API endpoints were implemented for CRUD-like operations, with monthly reset logic built into helper functions.

### 6.2 Frontend Development

The frontend was built using React with a clean component structure:

* Dashboard
* Recognize Page
* Leaderboard
* Redeem Page

The UI consumes backend APIs and updates the interface dynamically.
Tailwind CSS was used extensively to ensure a consistent style.

### 6.3 Docker Integration

Dockerfiles were created for both frontend and backend.
These ensured consistent builds and eliminated environment configuration issues.
Finally, docker-compose orchestrates the application to run as a unified stack.

---

## 7. Testing Approach

Manual and API-based testing was done for:

* Recognition creation.
* Validation error handling.
* Endorsement increments.
* Credit redemption flow.
* Leaderboard ranking.
* Monthly reset behavior.
* Docker runtime validation.

Test cases were documented separately under `test-cases/`.

---

## 8. Conclusion

The project successfully delivers a complete, functional, full-stack application that matches the specified requirements. The solution includes a robust backend, responsive frontend, complete Dockerized environment, and clean API documentation.

Boostly demonstrates the implementation of business rules, user-friendly interactions, and clear architectural separation between components. The system is ready for demonstration, further enhancements, or deployment to cloud services.
