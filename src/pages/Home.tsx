import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Home: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to our SaaS App
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignedIn
            ? "You're signed in. Head to your dashboard to get started!"
            : "Sign up or log in to get started."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSignedIn ? (
            <Link
              to="/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                to="/sign-up"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;