# 🌾 AgriTrade

AgriTrade is a MERN-stack based agricultural marketplace that connects farmers directly with consumers. Farmers can list their agricultural products, manage their listings, upload product images, and consumers can browse and purchase products directly.

## 🚀 Features

### 👨‍🌾 Farmer

* Farmer registration and login
* Secure JWT authentication
* Add agricultural products
* Edit and delete product listings
* Manage product quantity and pricing
* Upload product images using Cloudinary
* Manage farm/pickup location
* View listed products

### 🛒 Consumer

* Consumer registration and login
* Browse agricultural products
* View product details
* View farmer/product information
* Search and explore available products

### 🔐 Authentication

* JWT-based authentication
* Protected routes
* Separate farmer and consumer functionality
* Secure backend API

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cloudinary

### Deployment

* Vercel
* MongoDB Atlas
* Cloudinary

## 📁 Project Structure

```text
AgriTrade/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── Backend/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Sanjivkumar9405080/Agri-Trade.git
cd Agri-Trade
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd Backend
npm install
npm run dev
```

## 🔑 Environment Variables

### Backend

Create a `.env` file inside `Backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

Create `.env` inside `Frontend`:

```env
VITE_API_URL=http://localhost:5000
```

⚠️ Never commit `.env` files or secret credentials to GitHub.

## 🌐 Deployment

The project is configured for Vercel deployment.

### Frontend

Set the Vercel root directory to:

```text
Frontend
```

Environment variable:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

### Backend

Set the Vercel root directory to:

```text
Backend
```

Add the required backend environment variables in Vercel.

## 📌 Future Improvements

* Online payment integration
* Order management
* Real-time notifications
* Product search and filtering
* Farmer-consumer messaging
* AI-powered agricultural recommendations
* Weather-based farming insights

## 👨‍💻 Author

**Sanjiv Kumar**

B.Tech CSE (AI & ML)

GitHub: https://github.com/Sanjivkumar9405080

---

⭐ If you find this project useful, consider giving it a star!
