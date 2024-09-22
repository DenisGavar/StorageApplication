
# Storage Application

This is a simple console-based storage management application built using Node.js and MongoDB. The application allows you to manage different types of items such as tools and materials. It supports CRUD operations, and implements different MongoDB functionality.

## Features

- **CRUD Operations**: 
  - Create, Read, Update, and Delete items (tools/materials) and users.
  - Manage tools, materials, and users in the storage system.

- **Item Types**: 
  - Tools: Track borrowed tools, condition, and usage.
  - Materials: Manage suppliers and material quality.

- **Class Inheritance**: 
  - Tools and materials inherit common attributes and methods from the base item schema.

- **MongoDB Populate Functionality**: 
  - Populate fields like `borrowedBy` for tools, showing the users who borrowed them.

- **Error Handling and Validation**: 
  - Implements validation to prevent invalid data from being saved and proper error handling for CRUD operations.

- **Console-based Interaction**: 
  - All operations are performed through a console interface, ensuring a simple and interactive experience.

## Installation and Setup

### Prerequisites

- Docker
- Docker Compose

### Clone the repository

```bash
git clone https://github.com/DenisGavar/StorageApplication.git
cd StorageApplication
```

### Running the Application

1. **Build the application using Docker Compose**:

   ```bash
   docker-compose build
   ```

   This command builds the Docker images.

2. **Run the application using Docker Compose**:

   ```bash
   docker-compose up -d mongo && docker-compose run storage_app
   ```

   This command starts both the app and the MongoDB service.

3. **Using the Application**:

   After starting the app, you'll see a menu with options for managing tools, materials, and users. Use the numeric options to interact with the app:

   ```bash
   Options:
   1. Tool
   2. Material
   3. User
   4. Drop the database
   5. Exit
   ```

### Stopping the Application

To stop the app and clean up resources, run:

```bash
docker-compose down
```

## Application Overview

### Schemas

1. **Item (Base Schema)**:
   - `name`: Name of the item.
   - `amount`: Quantity in storage.
   - `cost`: Cost per item.
   - **Methods**:
     - `worth()`: Calculates total worth (amount * cost).
     - `newArrival(quantity)`: Adds the specified quantity to the current amount.

2. **Tool (Inherits from Item)**:
   - `usage`: The purpose of the tool.
   - `borrowedBy`: Users who borrowed the tool.
   - `condition`: Current condition (1-100).
   - **Methods**:
     - `useTool()`: Decreases condition if it's above a threshold.
     - `fixTool()`: Improves the tool's condition.

3. **Material (Inherits from Item)**:
   - `supplier`: The supplier's name.
   - `quality`: Quality of the material.
   - **Methods**:
     - `use(quantity)`: Decreases the stored quantity of the material.

4. **User**:
   - `name`: User's name.
   - `age`: User's age.
   - **Methods**:
     - `useTool(tool)`: Use a tool and log the user.
     - `usedTools()`: Lists all tools used by the user.
     - `buildSomething(tools, materials)`: Build something using tools and materials.

### Main Functionalities

- Add, view, update, and delete tools, materials, and users.
- Track tool condition, borrowing, and material suppliers.
- Use items, track history, and build something with specific tools and materials.
