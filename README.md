# React Spotify Stats Application

A React-based web application that displays your Spotify listening statistics including top artists, tracks, and albums.

## Features

- Login with Spotify
- View your profile information
- See your top artists of the month
- View your top 5 tracks
- See your top albums derived from your track data
- Modern UI with responsive design

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React, React Router, Styled Components
- **API**: Spotify Web API

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- Node.js and npm
- Spotify Developer Account

### Step 1: Spotify Developer Setup

1. Go to Spotify Developer Dashboard
2. Create a new application
3. Set the redirect URI to `http://localhost:3000/callback`
4. Note your Client ID and Client Secret

### Step 2: Backend Setup

1. Update `app.py` with your Spotify Client ID and Client Secret:

```python
CLIENT_ID = "your_client_id_here"
CLIENT_SECRET = "your_client_secret_here"
```

2. Install the required Python packages:

```bash
pip install flask flask-cors requests
```

3. Run the Flask backend:

```bash
python app.py
```

### Step 3: Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

### Alternative: Run Both Servers Together

You can run both the backend and frontend with a single command:

```bash
npm run dev
```

## Usage

1. Start both servers using `npm run dev` in the project root
2. Open your browser and navigate to `http://localhost:3000`
3. Click "Login with Spotify" to authorize the application
4. Explore your music stats!

## Project Structure

- `/app.py` - Flask backend with Spotify API integration
- `/client/` - React frontend application
  - `/src/components/` - React components
  - `/src/services/` - API services
  - `/src/components/styled/` - Styled components

## License

MIT 