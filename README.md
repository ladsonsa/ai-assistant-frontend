# AI Assistant Frontend

A modern frontend application built with **Next.js** and **TypeScript** that provides a clean, responsive, and maintainable interface for interacting with an AI assistant.

The project was designed with a strong focus on **Software Engineering best practices**, applying **Clean Architecture**, **SOLID principles**, and **Dependency Injection** to create a scalable and production-oriented codebase.

> **Project Status:** 🚧 MVP in Development

The frontend is currently being developed independently from the backend. Once the frontend reaches the planned MVP milestone, the Python backend will be refactored to implement the communication contract defined by this application.

# Badges do Projeto

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Clean Architecture](https://img.shields.io/badge/Focus-Clean%20Architecture-00599C?style=for-the-badge)
![SOLID](https://img.shields.io/badge/Design-SOLID%20Principles-4E9A06?style=for-the-badge)
![MVP Development](https://img.shields.io/badge/Stage-MVP%20Development-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

# Overview

AI Assistant Frontend is a modern web application built with **Next.js** and **TypeScript** that provides an intuitive interface for interacting with an AI-powered chatbot.

Rather than focusing only on delivering a functional user interface, this project was designed to demonstrate the application of professional software engineering practices in frontend development. The architecture emphasizes maintainability, scalability, testability, and clear separation of responsibilities.

The application follows **Clean Architecture**, applying **SOLID principles**, dependency inversion, repository abstraction, and use case orchestration to keep the domain independent from external technologies.

During the MVP phase, the frontend is intentionally developed independently from the backend. A mock repository is used to validate the application's behavior while the backend evolves separately. Once the frontend reaches feature completion, the Python backend will be refactored to implement the communication contract defined by this application.

This approach allows both projects to evolve independently while preserving a stable architectural boundary between business rules and infrastructure.

The final result is a production-oriented codebase that serves both as a complete academic project and as a portfolio example demonstrating modern frontend architecture and engineering practices.

# Features

## Version 1.0 (MVP)

The first release focuses on delivering a clean, maintainable, and production-oriented frontend with the following capabilities:

* Interactive chat interface built with Next.js and React.
* Conversation history management during the active session.
* Asynchronous communication with the AI backend through HTTP.
* Loading and error state handling.
* Environment-based configuration.
* Modular architecture following Clean Architecture principles.
* Dependency Injection through composition.
* Repository abstraction for infrastructure independence.
* Strongly typed domain model using TypeScript.
* Code quality enforced with ESLint and Prettier.
* Containerized development environment with Docker.

## Planned for Future Releases

The following features are intentionally outside the scope of Version 1.0 and are planned for future iterations:

* Persistent conversation history.
* Multiple chat sessions.
* Streaming AI responses.
* Markdown rendering.
* Code syntax highlighting.
* File attachments.
* Authentication and user accounts.
* Internationalization (i18n).
* Automated testing pipeline.
* Continuous Integration and Continuous Deployment (CI/CD).
* Progressive Web App (PWA) support.
* Advanced performance optimizations.

# Architecture

This project adopts **Clean Architecture** to keep the business rules independent from frameworks, external services, and implementation details.

The application is organized into layers with clearly defined responsibilities and one-way dependencies.

```text
┌──────────────────────────────────────┐
│                App                   │
│        Next.js App Router            │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│             Components               │
│      Reusable UI components          │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│               Hooks                  │
│     UI state and interaction logic   │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│            Application               │
│   Dependency composition and         │
│     use case orchestration           │
└──────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│               Domain                 │
│  Entities, repository contracts      │
│        and use cases                 │
└──────────────────────────────────────┘
                  ▲
                  │
┌──────────────────────────────────────┐
│           Infrastructure             │
│ HTTP API, repositories and DTOs      │
└──────────────────────────────────────┘
```

## Layer Responsibilities

### Domain

The domain contains the core business model of the application. It defines entities, repository contracts, and use cases without depending on any framework or external technology.

### Application

The application layer is responsible for composing dependencies and wiring together domain services with infrastructure implementations.

### Infrastructure

The infrastructure layer implements repository contracts, performs HTTP communication, and maps data between external APIs and domain entities.

### Hooks

Hooks coordinate user interactions, application state, and use case execution while keeping React components focused on rendering.

### Components

Components provide reusable presentation elements. They remain independent of infrastructure concerns and communicate only through hooks and properties.

### App

The App Router defines the application entry points and page composition using the components exposed by the presentation layer.

## Dependency Flow

Dependencies always point inward.

```text
     App
      │
  Components
      │
    Hooks
      │
  Application
      │
    Domain
      ▲
      │
Infrastructure
```

The domain never depends on external frameworks or implementation details, allowing infrastructure components to evolve without affecting the core business rules.

# Project Structure

The project is organized into independent layers, each responsible for a specific part of the application. This separation improves maintainability, scalability, and testability.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── application/
│
├── components/
│
├── config/
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│
├── hooks/
│
└── infrastructure/
    ├── api/
    │   └── dto/
    └── repositories/
```

| Directory           | Responsibility                                                                   |
| ------------------- | -------------------------------------------------------------------------------- |
| **app/**            | Next.js App Router entry points, layouts, and global styles.                     |
| **application/**    | Dependency composition and application orchestration.                            |
| **components/**     | Reusable React UI components.                                                    |
| **config/**         | Application configuration and environment variables.                             |
| **domain/**         | Core business rules, entities, repository contracts, and use cases.              |
| **hooks/**          | React hooks responsible for state management and user interactions.              |
| **infrastructure/** | External integrations, HTTP communication, DTOs, and repository implementations. |

## Design Principles

The directory structure reflects the architectural boundaries of the application rather than grouping files by technology.

Each layer has a single responsibility and communicates only with the layers defined by the architecture, reducing coupling and making the project easier to evolve over time.

# Technology Stack

The project is built using modern technologies selected to provide a maintainable, scalable, and production-oriented development experience.

| Category                  | Technology                       | Purpose                                                                  |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| **Language**              | TypeScript                       | Provides static typing, improved maintainability, and safer refactoring. |
| **Framework**             | Next.js 16                       | React framework used for routing, rendering, and application structure.  |
| **UI Library**            | React 19                         | Component-based library for building interactive user interfaces.        |
| **Styling**               | CSS Modules                      | Enables locally scoped styles and modular component design.              |
| **Architecture**          | Clean Architecture               | Separates business rules from infrastructure and presentation layers.    |
| **Design Principles**     | SOLID                            | Promotes maintainable, extensible, and loosely coupled software.         |
| **Dependency Management** | Dependency Injection             | Reduces coupling by composing dependencies outside the domain layer.     |
| **Data Access**           | Repository Pattern               | Abstracts infrastructure details from business logic.                    |
| **Communication**         | Fetch API                        | Performs HTTP communication with the backend service.                    |
| **Code Quality**          | ESLint                           | Enforces code consistency and identifies potential issues.               |
| **Code Formatting**       | Prettier                         | Maintains a consistent code style across the project.                    |
| **Containerization**      | Docker                           | Standardizes the development environment and simplifies deployment.      |
| **Version Control**       | Git & GitHub                     | Tracks project history and supports collaborative development.           |
| **Backend**               | Python, Streamlit and OpenAI API | Provides the AI processing layer consumed by the frontend.               |

## Development Philosophy

The technology stack was intentionally selected to prioritize software architecture, code quality, and long-term maintainability over short-term implementation speed.

Every technology included in this project serves a clear architectural purpose and supports the overall goal of delivering a production-oriented application rather than a simple proof of concept.

# Getting Started

Follow the steps below to run the frontend locally.

## Prerequisites

Before starting, make sure the following tools are installed:

* Node.js 22 or later
* npm (or another compatible package manager)
* Git

## Clone the Repository

```bash
git clone <repository-url>
cd ai-assistant-frontend
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a local environment file:

```text
.env.local
```

Add the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note**
>
> The backend integration is still under development. The API URL may change before the final V1.0 release.

## Start the Development Server

```bash
npm run dev
```

After the server starts, open your browser and navigate to:

```text
http://localhost:3000
```

## Current Development Mode

At the current stage of development, the frontend uses a mock repository to simulate backend responses.

This allows the user interface, application flow, and architecture to be developed independently from the Python backend.

The HTTP integration will replace the mock implementation during the final integration phase of Version 1.0.

# Environment Variables

The application uses environment variables to configure external services and runtime behavior.

During development, create a `.env.local` file in the project root.

| Variable              | Description                  | Required |
| --------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API. | Yes      |

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note**
>
> Additional environment variables may be introduced during the backend integration phase. This documentation will be updated before the Version 1.0 release.
>
> 

# Docker

Docker support is planned as part of the Version 1.0 release.

The final project will include:

* Dockerfile for the frontend application.
* Docker Compose configuration for running the frontend and backend together.
* Environment variable configuration.
* Local development workflow.

The complete Docker documentation will be added once the backend integration is finalized.

# Backend Integration

The frontend and backend are maintained as independent projects.

During the MVP development phase, the frontend uses a mock repository to validate the user interface, application flow, and architecture without depending on the backend implementation.

Once the frontend reaches feature completion, the Python backend will be refactored to implement the communication contract defined by this project.

This strategy allows both applications to evolve independently while maintaining a stable interface between the domain and infrastructure layers.

# Roadmap

## Version 1.0 (Current)

* [x] Project initialization
* [x] Domain layer
* [x] Infrastructure layer
* [ ] Application layer
* [ ] Chat state management
* [ ] User interface
* [ ] Backend integration
* [ ] Docker support
* [ ] Documentation
* [ ] Version 1.0 release

## Version 2.0 (Backlog)

The following items are intentionally outside the scope of Version 1.0:

* Persistent conversation history
* Multiple chat sessions
* Streaming AI responses
* Authentication
* File attachments
* Markdown rendering
* Internationalization
* Automated tests
* CI/CD pipeline
* Progressive Web App (PWA)

# License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.