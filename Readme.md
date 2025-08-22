# KrishiMitra

**KrishiMitra** is a transparent **natural farming marketplace** that connects farmers directly with consumers, ensuring **fair pricing** and **product traceability via QR codes**.  
It integrates **Supabase** for authentication and data management, **React** for the frontend, and an **AI chatbot** for farmer and consumer support.  

**Tech Stack**:
- **Frontend**: React
- **Backend**: Python, FastAPI  
- **Database**: Supabase

🔗 **Live Project**: [KrishiMitra](https://krishi-mitra-front.vercel.app/)  
*(Note: Database may be disabled, so login might not work.)*  

- **Frontend Deployment**: Vercel  
- **Backend Deployment(Chatbot)**: Rander  
- **Database**: Supabase (Backend-as-a-Service)  

---

## 🎥 Video Demonstration  
📌 Watch the demo here: [KrishiMitra Demo](https://drive.google.com/file/d/1atDL0Z_XFwRvYDIaNul2hjIvSG5ACCrv/view?usp=sharing)  

---

## 🖼️ Screenshots & Diagrams  
Home Page:
<img width="1907" height="871" alt="image" src="https://github.com/user-attachments/assets/3973a792-b56b-4e39-aa58-f19839b75f44" />
Chatbot:
<img width="1898" height="880" alt="image" src="https://github.com/user-attachments/assets/594e675c-ac10-409a-a676-605a06d3e09e" />
Activity Diagram:
<img width="659" height="774" alt="image" src="https://github.com/user-attachments/assets/1d960ad3-3d0d-4df6-9ce9-ab3572bb6389" />


## Features

- **Farmer Verification**: Farmers upload certificates (encrypted) for admin approval.  
- **Consumer Traceability**: Products have QR codes for transparency.  
- **Direct Market Connection**: Farmers list and sell their products after admin approval.  
- **Delivery Tracking**: Customers can track their orders.  
- **AI Chatbot**: A chatbot is available to assist farmers and consumers.

## Usage

### Login Credentials

#### Customer Login  
- Email: abc@gmail.com  
- Password: 123456  

#### Farmer Login  
- Email: farmer@gmail.com  
- Password: 123456

#### (You can Sign up with new credentials)

## Installation

### Prerequisites

- Node.js (>= 16.x)  
- npm or yarn  
- Python (>= 3.8)  

# 🚀 Installation & Setup

Follow the steps below to set up **KrishiMitra** locally on your system.

---

## ⚙️ Prerequisites

- **Node.js** (>= 16.x)
- **npm** or **yarn**
- **Python** (>= 3.8)

---

## 🔧 Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/AayushPatel8/KrishiMitra.git
    cd KrishiMitra
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**
    - Rename `.env.example` to `.env`
    - Add your **Supabase** credentials in the `.env` file.

4. **Setup AI Chatbot API key**
    - Add your **Groq API key** in `main.py`.
    - [Create one here if you don’t have it](https://groq.com/).

5. **Run frontend (React app)**
    ```bash
    npm run dev
    ```

6. **Run AI Chatbot (Backend)**
    ```bash
    python main.py
    ```

---


## Dependencies

### Main Dependencies

- @supabase/supabase-js: ^2.39.7  
- lucide-react: ^0.344.0  
- motion: ^12.5.0  
- qrcode.react: ^4.2.0  
- react: ^18.3.1  
- react-dom: ^18.3.1  
- react-hot-toast: ^2.4.1  
- react-router-dom: ^6.22.3  

### Dev Dependencies

- @eslint/js: ^9.9.1  
- @types/react: ^18.3.5  
- @types/react-dom: ^18.3.0  
- @vitejs/plugin-react: ^4.3.1  
- autoprefixer: ^10.4.18  
- eslint: ^9.9.1  
- eslint-plugin-react-hooks: ^5.1.0-rc.0  
- eslint-plugin-react-refresh: ^0.4.11  
- globals: ^15.9.0  
- postcss: ^8.4.35  
- tailwindcss: ^3.4.1  
- typescript: ^5.5.3  
- typescript-eslint: ^8.3.0  
- vite: ^5.4.2   
