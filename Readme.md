cat <<EOL > README.md
# KrishiMitra

KrishiMitra is a transparent natural farming marketplace platform that connects farmers directly with consumers, ensuring fair pricing and product traceability using QR codes. It integrates Supabase for authentication and data management and uses React for the frontend.

## Video Demonstration

Watch the demo video here: [KrishiMitra Demo](#) https://drive.google.com/file/d/1atDL0Z_XFwRvYDIaNul2hjIvSG5ACCrv/view?usp=sharing

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

## Installation

### Prerequisites

- Node.js (>= 16.x)  
- npm or yarn  
- Python (>= 3.8)  

### Steps

1. Clone the repository:  
   \`\`\`bash
   git clone cd KrishiMitra
   \`\`\`  
2. Install dependencies:  
   \`\`\`bash
   npm install
   \`\`\`  
3. Configure environment variables:  
   - Rename \`.env.example\` to \`.env\`  
   - Add your Supabase credentials  
4. Start the development server:  
   \`\`\`bash
   npm run dev
   \`\`\`  
5. **Run the AI Chatbot**  
   Open a terminal and run:  
   \`\`\`bash
   python main.py
   \`\`\`  

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



 

## Contribution

1. Fork the repository.  
2. Create a new branch (\`feature/new-feature\`).  
3. Commit your changes.  
4. Push the branch and open a Pull Request.  
EOL
