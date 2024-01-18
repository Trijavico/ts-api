# Documentación API REST

API REST developed in TypeScript using the Express framework and Prisma as the ORM.

# Routes and Functionalities
## Authentication
### SignUp
- **Route:** /signup
- **Method:** POST
- **Request Body Parameters (`req.body`):**
  - `username` (string, required): User's username.
  - `password` (string, required): User's password.
  - **Example Request Body:**
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

### SignIn
- **Route:** /signin
- **Method:** POST
- **Request Body Parameters (`req.body`):**
  - `username` (string, required): User's username.
  - `password` (string, required): User's password.
  - **Example Request Body:**
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

## Products
### Create Product
- **Route:** /api/v1/product
- **Method:** POST
- **Request Body Parameters (`req.body`):**
  - `name` (string, required): Product name.
  - **Example Request Body:**
    ```json
    {
      "name": "example_product"
    }
    ```

### Update Product
- **Route:** /api/v1/product/:id
- **Method:** PUT
- **Route Parameters (`req.params`):**
  - `id` (string, required): Product identifier.
- **Request Body Parameters (`req.body`):**
  - `name` (string, optional): New product name.
  - **Example Request Body:**
    ```json
    {
      "name": "new_example_product_name"
    }
    ```

### Get All Products
- **Route:** /api/v1/product
- **Method:** GET
- **Authentication:** JWT token authentication required.

### Get Product by ID
- **Route:** /api/v1/product/:id
- **Method:** GET
- **Route Parameters (`req.params`):**
  - `id` (string, required): Product identifier.
- **Authentication:** JWT token authentication required.

### Delete Product by ID
- **Route:** /api/v1/product/:id
- **Method:** DELETE
- **Route Parameters (`req.params`):**
  - `id` (string, required): Product identifier.
- **Authentication:** JWT token authentication required.

## Updates
### Create Update
- **Route:** /api/v1/update
- **Method:** POST
- **Request Body Parameters (`req.body`):**
  - `title` (string, required): Update title.
  - `body` (string, required): Update body/description.
  - `productId` (string, required): Associated product identifier.
  - **Example Request Body:**
    ```json
    {
      "title": "example_update_title",
      "body": "example_update_body",
      "productId": "example_product_id"
    }
    ```

### Update Update
- **Route:** /api/v1/update/:id
- **Method:** PUT
- **Route Parameters (`req.params`):**
  - `id` (string, required): Update identifier.
- **Request Body Parameters (`req.body`):**
  - `title` (string, optional): New update title.
  - `body` (string, optional): New update body/description.
  - `version` (string, optional): New update version.
  - `status` (string, optional): New update status (IN_PROGRESS, LIVE, DEPRECATED, ARCHIVED).
  - **Example Request Body:**
    ```json
    {
      "title": "new_example_update_title",
      "body": "new_example_update_body",
      "version": "new_example_version",
      "status": "LIVE"
    }
    ```

### Get All Updates
- **Route:** /api/v1/update
- **Method:** GET
- **Authentication:** JWT token authentication required.

### Get Update by ID
- **Route:** /api/v1/update/:id
- **Method:** GET
- **Route Parameters (`req.params`):**
  - `id` (string, required): Update identifier.
- **Authentication:** JWT token authentication required.

### Delete Update by ID
- **Route:** /api/v1/update/:id
- **Method:** DELETE
- **Route Parameters (`req.params`):**
  - `id` (string, required): Update identifier.
- **Authentication:** JWT token authentication required.
