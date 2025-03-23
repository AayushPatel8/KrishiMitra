import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  FileText, 
  Heart, 
  ThumbsUp, 
  MapPin, 
  HelpCircle,
  Wallet,
  Gift,
  CreditCard,
  Settings,
  Info,
  MessageSquare,
  LogOut,
  ChevronRight,
  User,
  LayoutDashboard,
  ListOrdered,
  LineChart,
  Users,
  AlertTriangle,
  CloudSun,
  DollarSign,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface Section {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    link: string;
    onClick?: () => void;
    badge?: {
      text: string;
      color: string;
    };
  }[];
}

function ProfilePage() {
  const { user, signOut } = useAuth();
  const userType = user?.user_metadata?.user_type || 'user';

  const farmerSections: Section[] = [
    {
      title: 'Farm Management',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard' },
        { icon: ListOrdered, label: 'My Listings', link: '/listings' },
        { icon: LineChart, label: 'Market Trends', link: '/trends' },
        { icon: Users, label: 'Community', link: '/community' },
      ]
    },
    {
      title: 'Farm Monitoring',
      items: [
        { 
          icon: AlertTriangle, 
          label: 'Pest Alert', 
          link: '/alerts',
          badge: {
            text: 'High',
            color: 'bg-red-100 text-red-700'
          }
        },
        { 
          icon: CloudSun, 
          label: 'Weather Updates', 
          link: '/weather',
          badge: {
            text: 'Clear',
            color: 'bg-green-100 text-green-700'
          }
        },
        { 
          icon: DollarSign, 
          label: 'Market Prices', 
          link: '/prices',
          badge: {
            text: '+5.2%',
            color: 'bg-green-100 text-green-700'
          }
        },
        { 
          icon: Bot, 
          label: 'AI Assistant', 
          link: '/ai-assistant',
          badge: {
            text: 'New',
            color: 'bg-blue-100 text-blue-700'
          }
        },
      ]
    }
  ];

  const customerSections: Section[] = [
    {
      title: 'Food Orders',
      items: [
        { icon: FileText, label: 'Your Orders', link: '/orders' },
        { icon: Heart, label: 'Favorite Orders', link: '/favorites' },
        { icon: ThumbsUp, label: 'Manage Recommendations', link: '/recommendations' },
        { icon: MapPin, label: 'Address Book', link: '/addresses' },
        { icon: HelpCircle, label: 'Online Ordering Help', link: '/help' },
      ]
    },
    {
      title: 'Money',
      items: [
        { icon: Wallet, label: 'KrishiMitra Money', link: '/wallet' },
        { icon: Gift, label: 'Buy Gift Card', link: '/gift-cards/buy' },
        { icon: Gift, label: 'Claim Gift Card', link: '/gift-cards/claim' },
        { icon: CreditCard, label: 'KrishiMitra Credits', link: '/credits' },
        { icon: Settings, label: 'Payment Settings', link: '/payment-settings' },
      ]
    }
  ];

  const commonSections: Section[] = [
    {
      title: 'More',
      items: [
        { icon: Info, label: 'About', link: '/about' },
        { icon: MessageSquare, label: 'Send Feedback', link: '/feedback' },
        { icon: Settings, label: 'Settings', link: '/settings' },
        { icon: LogOut, label: 'Log out', link: '#', onClick: signOut },
      ]
    }
  ];

  const sections = userType === 'farmer' 
    ? [...farmerSections, ...customerSections, ...commonSections]
    : [...customerSections, ...commonSections];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-gray-800">KrishiMitra</span>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex items-center gap-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
            >
              <User className="w-12 h-12 text-green-600" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{user?.email}</h1>
                {userType === 'farmer' && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                  >
                    Farmer
                  </motion.span>
                )}
              </div>
              <p className="text-gray-500">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <h2 className="text-lg font-semibold p-4 border-b">{section.title}</h2>
              <div className="divide-y">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    >
                      <Link
                        to={item.link}
                        onClick={item.onClick}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                          >
                            <Icon className="w-5 h-5 text-gray-600" />
                          </motion.div>
                          <span className="text-gray-700">{item.label}</span>
                          {item.badge && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                              className={`px-2 py-1 text-xs font-medium rounded-full ${item.badge.color}`}
                            >
                              {item.badge.text}
                            </motion.span>
                          )}
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;