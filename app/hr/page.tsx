'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

const mockEmployees = [
  { id: '1', name: 'John Doe', email: 'john@company.com', phone: '555-1234', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', phone: '555-5678', department: 'Design', position: 'UI/UX Designer', status: 'Active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', phone: '555-9012', department: 'Engineering', position: 'Backend Developer', status: 'Active' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@company.com', phone: '555-3456', department: 'Marketing', position: 'Marketing Manager', status: 'On Leave' },
  { id: '5', name: 'Tom Brown', email: 'tom@company.com', phone: '555-7890', department: 'Sales', position: 'Sales Representative', status: 'Active' },
]

const mockLeaveRequests = [
  { id: '1', employee: 'Jane Smith', type: 'Vacation', startDate: '2024-02-15', endDate: '2024-02-20', status: 'Approved' },
  { id: '2', employee: 'Sarah Williams', type: 'Sick Leave', startDate: '2024-02-10', endDate: '2024-02-12', status: 'Approved' },
  { id: '3', employee: 'Mike Johnson', type: 'Personal', startDate: '2024-02-25', endDate: '2024-02-26', status: 'Pending' },
]

const mockExpenses = [
  { id: '1', employee: 'John Doe', description: 'Conference Attendance', amount: 'Rp 450,000', date: '2024-01-15', status: 'Approved' },
  { id: '2', employee: 'Jane Smith', description: 'Training Course', amount: 'Rp 600,000', date: '2024-01-18', status: 'Pending' },
  { id: '3', employee: 'Mike Johnson', description: 'Client Dinner', amount: 'Rp 200,000', date: '2024-01-20', status: 'Approved' },
]

export default function HRPage() {
  const [activeTab, setActiveTab] = useState('employees')
  const [search, setSearch] = useState('')

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Human Resources</h1>
        <Button className="bg-primary hover:bg-accent text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-slate-600 text-sm mb-2">Total Employees</p>
          <p className="text-2xl font-bold">45</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-600 text-sm mb-2">On Leave</p>
          <p className="text-2xl font-bold text-orange-600">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-600 text-sm mb-2">Pending Requests</p>
          <p className="text-2xl font-bold text-red-600">2</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {[
          { id: 'employees', label: 'Employees' },
          { id: 'leave', label: 'Leave Requests' },
          { id: 'expenses', label: 'Expenses' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{employee.name}</td>
                    <td className="px-6 py-4 text-slate-600">{employee.email}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'Active' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === 'leave' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Start Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">End Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaveRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{request.employee}</td>
                    <td className="px-6 py-4">{request.type}</td>
                    <td className="px-6 py-4 text-slate-600">{request.startDate}</td>
                    <td className="px-6 py-4 text-slate-600">{request.endDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{expense.employee}</td>
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4 font-semibold">{expense.amount}</td>
                    <td className="px-6 py-4 text-slate-600">{expense.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        expense.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  )
}
