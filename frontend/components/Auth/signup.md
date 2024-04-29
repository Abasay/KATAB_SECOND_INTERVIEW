# Signup Component Documentation

## Overview

The Signup component is responsible for rendering a form for user registration. It allows users to sign up using their email and password or using their Google account.

## Props

The Signup component does not accept any props.

## State Management

The component manages the following states:

- `data`: Object containing form input values for first name, last name, email, password, and department.
- `err`: Boolean indicating if an error occurred during form submission.
- `isSigningIn`: Boolean indicating if the user is currently in the signing-in process.
- `success`: Boolean indicating if the form submission was successful.
- `successSignUp`: Boolean indicating if the user successfully signed up.

## Dependencies

The component imports the following dependencies:

- `motion` from "framer-motion": For animations.
- `Image` from "next/image": For displaying images.
- `Link` from "next/link": For client-side navigation.
- `useEffect`, `useState` from "react": For managing side effects and state.
- `useGoogleLogin` from "@react-oauth/google": For Google sign-in functionality.
- `Cookies` from "js-cookie": For managing cookies.
- `toast` from "react-hot-toast": For displaying toast notifications.
- `useRouter` from "next/navigation": For client-side routing.
- `Swal` from "sweetalert2": For displaying custom modals.

## Functionality

- Checks if the user is already logged in and redirects to the home page if so.
- Sends a POST request to the server with user registration details on form submission.
- Handles success and error responses from the server.
- Integrates Google sign-in functionality.
- Renders a signup form with input fields for user details.
- Provides a checkbox for keeping the user signed in.
- Includes a button to create the account.
- Displays links to navigate to the sign-in page for existing users.

## Styling

The component uses Tailwind CSS for styling, including responsive design classes for different screen sizes.

## Usage

```jsx
import Signup from "./Signup";

const App = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default App;
```
