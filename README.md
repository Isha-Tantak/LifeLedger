#  LifeLedger – Emergency Health QR System

LifeLedger is a full-stack emergency health QR system built using Java Spring Boot (backend) and ReactJS (frontend).  
It allows users to enter emergency health data, generate a QR code, and scan it later to view critical patient information instantly.

---

## Features

- Submit name, blood group, allergies, and emergency contact
- Generate unique QR code on submission
- Scan QR to access patient info in emergencies
- Uses H2 Database (or MySQL for future upgrade)
  Mobile QR scanner compatible
  React frontend with form validation


####  Tech Stack

 Layer      Technology         

 Frontend   : ReactJS, Axios     
 Backend  :   Java Spring Boot   
 QR Library:  ZXing (QR Code Generator) 
 Database:    H2 (in-memory)     
Tools   :    Postman, IntelliJ, VS Code 



## Folder Structure
LifeLedger/
├── frontend/ # ReactJS UI (form, QR download)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ └── UserForm.js
│ │ └── App.js
│ └── package.json
│
├── backend/ # Java Spring Boot API
│ ├── src/main/java/
│ │ └── com/lifeledger/
│ │ ├── controller/
│ │ ├── model/
│ │ ├── repository/
│ │ └── service/
│ ├── src/main/resources/
│ │ └── application.properties
│ └── pom.xml


---

##  How to Run Locally

###  Backend (Spring Boot)


cd backend
./mvnw spring-boot:run
Backend will run at: http://localhost:8080

H2 Console: http://localhost:8080/h2-console

##Frontend (React)

cd frontend
npm install
npm start
Frontend will run at: http://localhost:3000

##Screenshots :
1)Springboot started:
It will run on:
 http://localhost:8080
 2)output of ui form:
 <img width="1380" height="666" alt="Image" src="https://github.com/user-attachments/assets/57e387dd-697d-4362-9990-c0a765287c7d" />
 <img width="1046" height="565" alt="Image" src="https://github.com/user-attachments/assets/bccb9955-e328-4265-82ab-015ca2f96265" />
 ![Image](https://github.com/user-attachments/assets/0f5e39d1-7bac-46aa-a335-0f0f6be4eb92)

<img width="829" height="492" alt="Image" src="https://github.com/user-attachments/assets/15cc14a9-0ff7-48a9-a339-d7544695be2c" />


