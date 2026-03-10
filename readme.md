# Portfolio Application

A full-stack portfolio website built with Next.js (frontend) and Node.js/Express (backend), featuring image uploads to Cloudinary and admin authentication.

## Features

- **Responsive Design**: Modern, mobile-friendly portfolio layout
- **Admin Panel**: Secure admin interface for content management
- **Image Management**: Cloudinary integration for image storage and optimization
- **Dynamic Content**: Real-time content updates across all sections
- **Authentication**: JWT-based admin authentication
- **Database**: MongoDB for data persistence

## Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **shadcn/ui** - Modern UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud-based image management

## Project Structure

```
portfolio-app/
├── backend/                 # Express.js API server
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom middleware
│   └── uploads/            # File upload directory (legacy)
├── frontend/                # Next.js application
│   ├── app/                # Next.js app router
│   ├── components/         # React components
│   ├── lib/                # Utility functions and API client
│   └── public/             # Static assets
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-jwt-secret-key
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ADMIN_TOKEN=your-admin-jwt-token
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
ADMIN_USER_IDS=user_123456789
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Database Setup

1. Start MongoDB locally or use a cloud service like MongoDB Atlas
2. Update the `MONGO_URI` in backend/.env with your connection string

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

## API Documentation

### Portfolio Endpoints

#### GET /api/portfolio
Retrieve complete portfolio data including all sections.

**Response:**
```json
{
  "Landingdata": {
    "section": "LandingPage",
    "data": {
      "greeting": "Hello",
      "role": "Developer",
      "description": "Full-stack developer",
      "profilePicture": "https://cloudinary.com/image.jpg"
    }
  },
  "ProjectsData": {
    "section": "ProjectsPage",
    "data": [...]
  },
  "AboutMeData": {...},
  "FooterData": {...}
}
```

#### POST /api/portfolio
Save complete portfolio data (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "landing": {
    "greeting": "Hello",
    "role": "Developer",
    "description": "Full-stack developer",
    "profilePicture": "https://cloudinary.com/image.jpg"
  },
  "projects": [...],
  "about": {...},
  "footer": {...}
}
```

### Individual Section Endpoints

- `GET /api/landing` - Get landing page data
- `GET /api/projects` - Get projects data
- `GET /api/about` - Get about section data
- `GET /api/footer` - Get footer data
- `GET /api/contact` - Get contact information

## Image Upload

Images are uploaded to Cloudinary cloud storage:

1. Select image file in the admin panel
2. Image is uploaded to Cloudinary via `uploadImage()` function
3. Secure URL is stored in the database
4. Images are served directly from Cloudinary CDN

## Authentication

### Admin Access
- Uses JWT tokens for API authentication
- Admin panel protected by Clerk authentication
- Only authorized users can modify portfolio content

### Token Generation
Admin tokens are generated using the `tokenGenerator.js` script in the backend.

## Deployment

### Backend (Vercel/Server)
```bash
cd backend
npm run build
npm run start
```

### Frontend (Vercel)
```bash
cd frontend
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- Vercel: Project settings > Environment Variables
- Heroku: Config Vars
- AWS/DigitalOcean: Environment configuration

## Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email@example.com] or create an issue in the repository.