'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'
import {
  Users,
  Package,
  DollarSign,
  Briefcase,
  UserCheck,
  TrendingUp,
} from 'lucide-react'

const dashboardStats = [
  {
    title: 'Total Customers',
    value: '245',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Products in Stock',
    value: '1,234',
    icon: Package,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Total Revenue',
    value: 'Rp 89,450,000',
    icon: DollarSign,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Active Projects',
    value: '12',
    icon: Briefcase,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Total Employees',
    value: '45',
    icon: UserCheck,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    title: 'Growth',
    value: '+12.5%',
    icon: TrendingUp,
    color: 'bg-emerald-100 text-emerald-600',
  },
]

const salesData = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Feb', sales: 3000, revenue: 1398 },
  { month: 'Mar', sales: 2000, revenue: 9800 },
  { month: 'Apr', sales: 2780, revenue: 3908 },
  { month: 'May', sales: 1890, revenue: 4800 },
  { month: 'Jun', sales: 2390, revenue: 3800 },
]

const inventoryData = [
  { product: 'Arabica', quantity: 245, value: 122500 },
  { product: 'Robusta Gayo', quantity: 389, value: 38900 },
  { product: 'Robusta Dieng', quantity: 512, value: 15360 },
  { product: 'Arabica Dampit', quantity: 856, value: 12840 },
  { product: 'Robusta Bromo', quantity: 234, value: 11700 },
]

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {dashboardStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales & Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#5e2619" />
              <Line type="monotone" dataKey="revenue" stroke="#bfa584" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products by Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ad786c" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Pending Invoices</h3>
          <p className="text-3xl font-bold text-[#5e2619]">Rp 12,450,000</p>
          <p className="text-sm text-muted-foreground mt-2">5 invoices due</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Tasks</h3>
          <p className="text-3xl font-bold text-[#bfa584]">28</p>
          <p className="text-sm text-slate-600 mt-2">This week</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Requests</h3>
          <p className="text-3xl font-bold text-[#bfa584]">3</p>
          <p className="text-sm text-slate-600 mt-2">Pending approval</p>
        </Card>
      </div>
    </div>
  )
}
