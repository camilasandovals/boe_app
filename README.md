# BOE Site 3.0

A modern web application for BOE (Board of Education) built with React and Firebase, providing a platform for educational resources, school listings, and member management.

## Features

- **User Authentication**: Secure login and signup functionality
- **School Directory**: Browse and search through partner schools
- **Events Carousel**: Stay updated with latest educational events
- **Member Portal**: Dedicated space for member information and verification
- **Blog System**: Educational content and updates
- **Profile Management**: User profile and account settings
- **Favorites System**: Save and manage favorite schools or content
- **Newsletter Subscription**: Stay updated with latest news

## Tech Stack

- **Frontend**: React.js
- **Backend/Database**: Firebase
- **Authentication**: Firebase Auth
- **Styling**: CSS with custom styling
- **Asset Management**: Public directory for images and media

## Project Structure

```
boe_app/
├── public/                 # Static files
│   ├── images/            # Image assets
│   ├── meta/             # Meta assets (favicon, logos)
│   └── index.html        # Entry HTML file
├── src/
│   ├── components/       # Reusable React components
│   ├── layout/          # Layout components
│   ├── pages/           # Page components
│   ├── styles/          # CSS styles
│   ├── App.js           # Main App component
│   ├── Firebase.js      # Firebase configuration
│   └── index.js         # Application entry point
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project
   - Update Firebase configuration in `src/Firebase.js`
   - Enable Authentication and other required Firebase services

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run deploy`: Deploys the application to Firebase

## Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
