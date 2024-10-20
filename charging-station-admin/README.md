# VietEV

VietEV is a web application developed using ReactJS, designed to manage users of the VietEV app, oversee charging stations, and analyze data collected from the VietEV app. The application provides features such as searching for charging stations, managing charging station information, and supporting stakeholders such as motel owners, parking garage operators, and charging pole manufacturers.

## Features

- **User Management**: Admins can manage users of the VietEV app, including adding, editing, and deleting user accounts.
- **Charging Station Management**: Provides detailed information about each charging station, including name, address, business status, and opening hours.
- **Data Analytics**: Analyzes data from the VietEV app to generate insights and statistics related to charging station usage and user behavior.
- **Search for Charging Stations**: Users can search for the nearest charging stations based on their current location.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: NestJS (server API)
- **Database**: MongoDB 
- **Libraries**: React Router, Axios, Tailwind CSS

## Installation

To run this project, you need to have Node.js and npm or Yarn installed on your computer.

1. Clone the repository:
    ```bash
    git clone https://github.com/username/vietev.git
    cd vietev
    ```

2. Install dependencies:
    Use npm or Yarn to install the dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. Run the application:
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```
    The application will run on `http://localhost:3000`.

## Project Structure

The project is organized in the following structure:

vietev/
├── public/ # Static files such as index.html
├── src/ # Main source files
│ ├── components/ # Contains UI components
│ ├── pages/ # Contains application pages
│ ├── services/ # Contains API services
│ ├── utils/ # Contains utility functions
│ └── App.js # Main component of the application
├── package.json # Project metadata and dependencies
└── README.md # Project documentation


## Contribution

We welcome contributions from the community! You can open issues or create pull requests on GitHub.

## Contact

If you have any questions, please contact us via email: [nganptlhe160415@fpt.edu.vn]

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
