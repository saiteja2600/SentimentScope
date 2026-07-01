# <img width="100" height="100" alt="logo" src="https://github.com/user-attachments/assets/447fbbf3-0769-4451-b273-ff004cab6694" /> SentimentScope

## Overview

SentimentScope is a full-stack web application that analyzes customer product reviews and transforms raw review data into meaningful business insights through sentiment analysis and interactive visualizations.

The application processes approximately **3,000 customer review records**, classifies customer sentiment based on review ratings, and presents analytical insights using interactive dashboards. It helps users understand customer opinions, identify highly rated products, and explore review trends through an intuitive interface.

This project demonstrates practical experience in building data-driven applications by integrating data processing, relational database management, backend API development, and frontend visualization into a complete analytical solution.

The application is developed using:

- **Frontend:** React
- **Backend:** Flask
- **Database:** PostgreSQL

---

## Project Objectives

- Analyze customer review data
- Classify customer sentiment using review ratings
- Store and manage structured review data
- Display analytical insights through interactive dashboards
- Help users identify highly rated products
- Improve understanding of customer feedback using visual reports

---

## Features

- Customer Review Management
- Dashboard Overview
- Product Analytics
- Sentiment Distribution
- Rating Analysis
- Product Ranking
- Pagination
- Filtering and Searching
- Responsive User Interface
- REST API Integration

---

## Application Screenshots

### Dashboard

<img width="1920" height="921" alt="Screenshot 2026-07-01 103936" src="https://github.com/user-attachments/assets/b9133a74-daf5-4ae0-afde-36eb0d8b208f" />

---

### Reviews Page

<img width="1909" height="925" alt="Screenshot 2026-07-01 104315" src="https://github.com/user-attachments/assets/23bb6c76-eaf7-4531-9bda-5bcce50e5733" />


---

### Analytics Page

<img width="1920" height="919" alt="Screenshot 2026-07-01 105842" src="https://github.com/user-attachments/assets/6a4ed64c-8d1c-4519-ae52-61ac65b71cdb" />
<img width="1920" height="919" alt="Screenshot 2026-07-01 105810" src="https://github.com/user-attachments/assets/9af12760-da71-4005-9965-a677577f760e" />
<img width="1920" height="925" alt="Screenshot 2026-07-01 105720" src="https://github.com/user-attachments/assets/96bcb0b6-b5db-4562-9d21-ce948a8b1232" />
<img width="1920" height="941" alt="Screenshot 2026-07-01 105648" src="https://github.com/user-attachments/assets/9f971729-94e0-44b7-8645-2fedfc4f7b09" />

---

## Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React |
| Backend | Flask |
| Database | PostgreSQL |
| API | REST API |
| Styling | Bootstrap |
| Charts | Chart.js / Recharts *(whichever you use)* |

---


---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/SentimentScope.git
```

### Backend

```bash
cd Backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

---

### Frontend

```bash
cd Frontend

npm install

npm start
```

---

## Environment Variables

Backend

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

## Database

The application uses PostgreSQL to store:

- Customer Reviews
- Product Information
- Ratings
- Vote Counts
- Review Metadata

---

## Workflow

1. Customer review data is stored in PostgreSQL.
2. Flask APIs retrieve and process the review data.
3. The backend computes sentiment summaries based on review ratings.
4. React consumes the REST APIs.
5. Interactive charts and dashboards present the analytical insights.

---

## Future Enhancements

- Machine Learning based Sentiment Classification
- User Authentication
- Export Dashboard Reports
- Real-Time Review Analysis
- Advanced Search Filters
- Product Comparison Dashboard
- Cloud Deployment
- Azure Data Pipeline Integration

---

## Author

**Sai Teja**

Software Engineer | Aspiring Azure Data Engineer

LinkedIn:
https://www.linkedin.com/in/sai-teja-chippada-33bb9b216/
