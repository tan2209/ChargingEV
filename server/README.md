# VietEV Backend

The VietEV backend is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. This backend supports the VietEV application by providing RESTful APIs for user management, charging station management, and data analytics, using MongoDB as the database.

## Features

- **User Management**: Manage user accounts, including registration, authentication, and profile management.
- **Charging Station Management**: CRUD operations for charging stations, including details such as name, location, business status, and availability.
- **Data Analytics**: Analyze data related to user activities and charging station usage.
- **RESTful API**: Provides a well-structured API for frontend applications to interact with the backend.

## Technologies Used

- **Framework**: NestJS
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv
- **Testing**: Jest

## Installation

To run this project, you need to have Node.js and Yarn installed on your computer.

1. Clone the repository:
    ```bash
    git clone https://github.com/username/vietev-backend.git
    cd vietev-backend
    ```

2. Install dependencies:
    Use Yarn to install the dependencies:
    ```bash
    yarn install
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:
    ```bash
    yarn start
    ```
    or for development mode:
    ```bash
    yarn start:dev
    ```

## Project Structure

The project is organized in the following structure:

vietev-backend/
├── src/ # Main source files
│ ├── auth/ # Authentication module
│ ├── users/ # User management module
│ ├── charging-stations/ # Charging station management module
│ ├── analytics/ # Data analytics module
│ ├── app.module.ts # Main application module
│ └── main.ts # Entry point of the application
├── test/ # Test files
├── .env # Environment configuration
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Contribution

We welcome contributions from the community! You can open issues or create pull requests on GitHub.

## Contact

If you have any questions, please contact us via email: [nganptlhe160415@fpt.edu.vn].

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
