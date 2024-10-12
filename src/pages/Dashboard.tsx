import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Calendar, Search, BarChart2, Video, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-lg font-medium text-gray-900 truncate">{title}</dt>
          <dd className="mt-1 text-sm text-gray-500">{description}</dd>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <Link
        to={link}
        className="text-sm font-medium text-indigo-700 hover:text-indigo-900"
      >
        Go to feature &rarr;
      </Link>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useUser();

  const features = [
    {
      title: "Content Planning",
      description: "Plan and organize your content with our interactive calendar.",
      icon: <Calendar className="h-6 w-6 text-white" />,
      link: "/content-calendar"
    },
    {
      title: "SEO & Keyword Research",
      description: "Optimize your content with powerful SEO research tools.",
      icon: <Search className="h-6 w-6 text-white" />,
      link: "/seo-research"
    },
    {
      title: "Analytics & Performance",
      description: "Track and analyze your channel's performance metrics.",
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      link: "/analytics"
    },
    {
      title: "Video Repurposing",
      description: "Repurpose and distribute your videos across platforms.",
      icon: <Video className="h-6 w-6 text-white" />,
      link: "/video-repurposing"
    },
    {
      title: "Community Engagement",
      description: "Manage and boost engagement with your community.",
      icon: <Users className="h-6 w-6 text-white" />,
      link: "/community-engagement"
    },
    {
      title: "Monetization Management",
      description: "Track and optimize your channel's monetization.",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      link: "/monetization"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome, {user?.firstName}!</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;