# 🏥 MedEase AI – AI-Powered Healthcare Management System

MedEase AI is an intelligent healthcare management platform designed to simplify preliminary patient assessment, medical report analysis, and clinical decision support using AI-based workflows.

The system collects patient symptoms and medical history, conducts dynamic follow-up assessments, evaluates severity and priority, and provides preliminary clinical recommendations.

## 🚀 Key Features

### 👤 Patient Module
- Secure patient registration and login.
- AI-based symptom assessment.
- Dynamic follow-up questions based on reported symptoms.
- Medical history collection.
- Clinical severity and priority assessment.
- Medical report upload and analysis.
- View assessment results and recommendations.

### 👨‍⚕️ Doctor Module
- Doctor dashboard.
- View completed patient assessments.
- Access patient details and medical history.
- Review clinical summaries and assessment results.
- Support clinical decision-making.

### 🤖 AI Assessment Module
- Symptom-based patient assessment.
- Dynamic question generation.
- Clinical severity classification.
- Priority-based patient categorization.
- Preliminary medical recommendations.
- Medical report text extraction and analysis.

## 🔄 System Workflow

1. Patient Registration and Login
2. AI Health Assessment
3. Symptom and Medical History Collection
4. Dynamic Follow-up Questions
5. Clinical Assessment
6. Severity and Priority Classification
7. Recommended Medical Tests
8. Medical Report Upload
9. Report Analysis
10. Combined Assessment Results
11. Doctor Dashboard Review

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Angular | Frontend development |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modelling |
| JavaScript | Application development |
| Python | AI/ML exploration and development |
| PDF Processing | Medical report text extraction |

## 🏗️ Project Architecture

**Frontend**
- Angular standalone components
- Patient dashboard
- Doctor dashboard
- Authentication and route guards
- HTTP API integration

**Backend**
- Node.js and Express.js
- RESTful API architecture
- Authentication and authorization
- Service and controller structure
- Patient and doctor management
- AI assessment processing
- Medical report processing

**Database**
- MongoDB
- Mongoose schemas and models
- Patient records
- AI conversations
- Medical reports

## 💻 Installation and Setup

### Prerequisites
- Node.js
- Angular CLI
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd MedEase-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure your environment variables in `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:4200
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
ng serve
```

Open the application:

```text
http://localhost:4200
```

Backend:

```text
http://localhost:5000
```

## 🎯 Project Objectives

- Simplify preliminary healthcare assessments.
- Reduce manual effort in collecting patient information.
- Organize patient data and medical reports.
- Support early identification of patient severity and priority.
- Provide doctors with structured patient assessment information.

## 🔮 Future Enhancements

- Expand the medical knowledge base.
- Improve disease prediction capabilities.
- Integrate advanced machine learning models.
- Enhance doctor-patient communication.
- Introduce real-time clinical monitoring.
- Improve recommendation accuracy.

## 👩‍💻 Developer

**Shalini K S**

BE Computer Science and Engineering | 2026

**Technical Interests:** Full-Stack Development | Artificial Intelligence | Machine Learning | Healthcare Technology

---

*MedEase AI is an academic development project intended to support preliminary assessment and clinical decision-making. It is not a replacement for professional medical diagnosis or treatment.*
