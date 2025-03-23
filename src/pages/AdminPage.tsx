import React, { useState } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  ClipboardCheck, 
  FileText, 
  Settings,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  registrationDate: string;
  avatarUrl: string;
}

const AdminPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data
  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      status: 'Pending',
      registrationDate: '2024-01-15',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      status: 'Approved',
      registrationDate: '2024-01-14',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'm.brown@email.com',
      status: 'Rejected',
      registrationDate: '2024-01-13',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces'
    }
  ];

  const stats = {
    totalFarmers: 1234,
    pendingApprovals: 28,
    approvedToday: 12,
    rejected: 5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FarmAdmin</h1>
        <button onClick={toggleMobileMenu} className="p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block 
        w-full md:w-64 
        bg-white border-r border-gray-200 
        md:relative fixed inset-0 z-50
      `}>
        <div className="p-4">
          <div className="hidden md:block mb-8">
            <h1 className="text-xl font-bold">FarmAdmin</h1>
            <p className="text-sm text-gray-500">Management Dashboard</p>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg">
              <Users className="w-5 h-5 mr-3" />
              Farmer Management
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <ClipboardCheck className="w-5 h-5 mr-3" />
              Product Approvals
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <FileText className="w-5 h-5 mr-3" />
              Reports
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold">Farmer Management</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">4</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">Admin User</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-500 text-sm mb-2">Total Farmers</h3>
            <p className="text-2xl font-semibold">{stats.totalFarmers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-gray-500 text-sm mb-2">Pending Approvals</h3>
            <p className="text-2xl font-semibold">{stats.pendingApprovals}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-500 text-sm mb-2">Approved Today</h3>
            <p className="text-2xl font-semibold">{stats.approvedToday}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-gray-500 text-sm mb-2">Rejected</h3>
            <p className="text-2xl font-semibold">{stats.rejected}</p>
          </div>
        </div>

        {/* Farmer List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <h3 className="text-lg font-semibold">Farmer List</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search farmers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow sm:flex-grow-0"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                    Add New Farmer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Farmer Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Registration Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {farmers.map((farmer) => (
                    <tr key={farmer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={farmer.avatarUrl}
                            alt={farmer.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                            <div className="text-sm text-gray-500 md:hidden">{farmer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{farmer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(farmer.status)}`}>
                          {farmer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {farmer.registrationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                          <button className="text-red-600 hover:text-red-900">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-4 py-4 md:px-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Showing 1 to 3 of 100 entries
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">Previous</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;