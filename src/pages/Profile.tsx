import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
          <UserProfile
            path="/profile"
            routing="path"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
                card: 'shadow-none',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;