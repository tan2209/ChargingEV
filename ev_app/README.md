# VietEN

VietEN is a React Native application designed to help users find the nearest charging stations, charge their electric vehicles, and make payments for charging services. The app also provides functionality for technical support accounts to repair charging stations.

## Features

- **Search for Charging Stations**: Users can easily search for the nearest charging stations based on their current location.
- **Vehicle Charging**: Users can initiate the charging process for their electric vehicles directly through the app.
- **Payment Integration**: Users can make payments for charging services seamlessly within the app.
- **Technical Support Functionality**: Accounts with technical support access can manage and repair charging stations, ensuring they remain operational.

## Technologies Used

- **Framework**: React Native
- **State Management**: Context API
- **Navigation**: React Navigation
- **Backend**: RESTful API (NestJS)
- **Payment Gateway**: Integration with a payment processing service (VNPay)

## Installation

To run this project, you need to have Node.js and npm installed on your computer, along with the React Native development environment set up.

1. Clone the repository:
    ```bash
    git clone https://github.com/username/vieten.git
    cd vieten
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
    npm run android   # For Android
    ```
    or
    ```bash
    npm run ios       # For iOS
    ```

## Project Structure

The project is organized in the following structure:
vieten/
├── android/ # Android native files
├── ios/ # iOS native files
├── src/ # Main source files
│ ├── components/ # Contains UI components
│ ├── screens/ # Contains application screens
│ ├── navigation/ # Contains navigation setup
│ ├── services/ # Contains API services
│ └── App.js # Main component of the application
├── package.json # Project metadata and dependencies
└── README.md # Project documentation


## Contribution

We welcome contributions from the community! You can open issues or create pull requests on GitHub.

## Contact

If you have any questions, please contact us via email: [nganptlhe160415@fpt.edu.vn].

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
