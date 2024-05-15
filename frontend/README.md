# C&M Transport Services Website

Welcome to the KATAB ROYALS' second interview frontend repository!

## Introduction

This repository contains the frontend files for the KATAB ROYALS' second interview in building a full stack web app

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, ReactJs, NextJs, TypeScript
- **Deployment**: Vercel

## Security and FireWall:

    The Security functionality implemented for this website was done using jsonwebtoken(jwt).

### How The JWT Works

#### User Login:

1. **Credential Verification**:
   - When a user logs in, the server verifies the user's credentials.
2. **JWT Generation**:
   - Upon successful verification, the server generates a JWT containing the user's identity and permissions.
3. **Token Delivery**:
   - This token is then sent back to the client.

#### Token Storage:

1. **Client Storage**:
   - The client stores the JWT a cookie, for use in subsequent requests.

#### Authenticated Requests:

1. **Including JWT in Requests**:
   - For any request requiring authentication, the client includes the JWT in the `Authorization` header.
2. **Token Verification**:
   - The server decodes and verifies the token. If valid, it grants access to the requested resource.
   - If the token has been malformed, to prevent any security risk, the cookies are cleared and the user has to login again, to perform any action.

## Setup Instructions

To run this website locally on your machine, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Configure environment variables (if any).
5. Start the server using `npm run server`.
6. Access the website in your browser at `http://localhost:3000`.

## Deployed Website URL (Frontend)

- [text](https://candm-services.vercel.app/)

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support regarding this website, please contact us at [abdulsalamasheem@gmail..com](mailto:abdulsalamasheem@gmail.com).
