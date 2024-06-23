# IoT Platform for Back-office Device Management

This project is an IoT platform designed for managing devices from a back-office perspective. It includes features for device management such as creating, editing, and deleting devices, all integrated with a MongoDB database and implemented using Node.js, NestJS for the backend, and Next.js 14 for the frontend.

## Architecture
![image](https://github.com/topspinppy/iot-service-monorepo/assets/18381211/91e29764-2f72-4b6c-a76f-64c37c2896a2)

## Technology Stack

- **Backend**: Node.js, NestJS (framework)
- **Database**: MongoDB
- **Frontend**: Next.js 14

## Running with Docker Compose

To run this project using Docker Compose with a single command, follow these steps:

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Ensure your `.env` files in both `backend` and `frontend` directories are correctly configured if needed.

3. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

4. (Optional) To run the containers in the background (detached mode):

   ```bash
   docker-compose up -d
   ```

5. Once the containers are up and running, open your web browser and go to `http://localhost:3000` to access the frontend application.

6. For backend API documentation (Swagger), go to `http://localhost:2000/docs`.

## Features

- **View All Device Management**: Allows users to see all devices currently managed by the platform.
- **Create Device**: Enables users to add new devices to the platform.
- **Edit Device**: Provides functionality to modify existing device details.
- **Delete Device**: Allows users to remove devices from the platform.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request in the GitHub repository.

## License

This project is licensed under the [MIT License](link-to-license-file).
