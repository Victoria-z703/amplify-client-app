import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import config from './aws-exports'; // AWS Amplify configuration
import { Amplify } from 'aws-amplify'; // Correct named import for Amplify
import { ThemeProvider } from '@aws-amplify/ui-react'; // ThemeProvider for theming
import '@aws-amplify/ui-react/styles.css'

// Configure Amplify with the aws-exports file
Amplify.configure(config);

// Create the root element for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in ThemeProvider (if you need theming)
root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Optional if theming is needed */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
