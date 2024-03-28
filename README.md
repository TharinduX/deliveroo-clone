# Restaurant Management Application

This is a restaurant management application similar to Deliveroo, catering to both customers and restaurant owners. Restaurant owners can add their restaurants and menus, while customers can place orders from them.

## Project Structure

The project is organized into two main folders:

- **client**: Contains files related to the client-side application.
- **server**: Contains files related to the server-side application.

### Client

Inside the `client` folder, you'll find:

- **.env.sample**: Rename this file to `.env.local` and fill in the necessary environment variables.
- Other client-side files and folders.

### Server

Inside the `server` folder, you'll find:

- **.env.sample**: Include this file with necessary environment variables. Rename it to `.env` and fill in the details.
- Other server-side files and folders.

## Installation

### Clone the Repository

Clone the repository and navigate to the project directory:

```
git clone https://github.com/TharinduX/deliveroo-clone.git
```

### Setup Environment Variables

#### Client:

Rename `.env.sample` to `.env.local` in the client folder and set the `REACT_APP_GOOGLE_CLIENT_ID` variable with your Google Client ID.

```
cd client
cp .env.sample .env.local
```

Edit `.env.local` and set `REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID`.

#### Server:

Rename `.env.sample` to `.env` in the server folder and set the required environment variables.

```
cd server
cp .env.sample .env
```

Edit `.env` and set the following variables:

```
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

### Install Dependencies

#### Client:

Navigate to the client directory and install the dependencies.

```
cd client
npm install
```

#### Server:

Navigate to the server directory and install the dependencies.

```
cd server
npm install
```

### Run the Application

#### Client:

Start the React development server.

```
cd client
npm start
```

#### Server:

Start the Express development server.

```
cd server
npm run dev
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.
