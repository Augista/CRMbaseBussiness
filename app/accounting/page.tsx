'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { AddInvoiceModal } from '@/components/modals/add-invoice-modal'

const initialInvoices = [
  { id: '1', invoiceNumber: 'INV-2024-001', customer: 'Acme Corp', date: '2024-01-10', amount: 'Rp 5,250,000', status: 'Paid' },
  { id: '2', invoiceNumber: 'INV-2024-002', customer: 'Tech Solutions', date: '2024-01-15', amount: 'Rp 8,900,000', status: 'Pending' },
  { id: '3', invoiceNumber: 'INV-2024-003', customer: 'Global Industries', date: '2024-01-18', amount: 'Rp 3,450,000', status: 'Overdue' },
  { id: '4', invoiceNumber: 'INV-2024-004', customer: 'Creative Agency', date: '2024-01-20', amount: 'Rp 6,200,000', status: 'Paid' },
]

const mockExpenses = [
  { id: '1', description: 'Office Supplies', amount: 'Rp 450,000', date: '2024-01-15', category: 'Operations', status: 'Approved' },
  { id: '2', description: 'Travel Expenses', amount: 'Rp 1,200,000', date: '2024-01-18', category: 'Travel', status: 'Pending' },
  { id: '3', description: 'Software License', amount: 'Rp 500,000', date: '2024-01-20', category: 'Software', status: 'Approved' },
]

const mockBankAccounts = [
  { id: '1', name: 'Main Account', number: '****1234', balance: 'Rp 125,450,000', type: 'Checking' },
  { id: '2', name: 'Savings Account', number: '****5678', balance: 'Rp 45,200,000', type: 'Savings' },
]

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState('invoices')
  const [search, setSearch] = useState('')
  const [invoices, setInvoices] = useState(initialInvoices)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddInvoice = (data: any) => {
    const newInvoice = {
      id: (invoices.length + 1).toString(),
      ...data,
      amount: `Rp ${parseInt(data.amount).toLocaleString('id-ID')}`,
    }
    setInvoices([...invoices, newInvoice])
    console.log('[v0] Invoice added:', newInvoice)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <AddInvoiceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddInvoice}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Accounting & Finance</h1>
        <Button
          className="bg-primary hover:bg-accent text-primary-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
          <p className="text-2xl font-bold">Rp 23,800,000</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Pending Payments</p>
          <p className="text-2xl font-bold text-orange-600">Rp 12,350,000</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-600 text-sm mb-2">Total Expenses</p>
          <p className="text-2xl font-bold">$2,150</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-600 text-sm mb-2">Net Income</p>
          <p className="text-2xl font-bold text-green-600">$21,650</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {[
          { id: 'invoices', label: 'Invoices' },
          { id: 'expenses', label: 'Expenses' },
          { id: 'bank', label: 'Bank Accounts' },
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

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Invoice #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4">{invoice.customer}</td>
                    <td className="px-6 py-4 text-slate-600">{invoice.date}</td>
                    <td className="px-6 py-4 font-semibold">{invoice.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {invoice.status}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{expense.description}</td>
                    <td className="px-6 py-4">{expense.category}</td>
                    <td className="px-6 py-4 text-slate-600">{expense.date}</td>
                    <td className="px-6 py-4 font-semibold">{expense.amount}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
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

      {/* Bank Accounts Tab */}
      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockBankAccounts.map((account) => (
            <Card key={account.id} className="p-6">
              <h3 className="font-semibold mb-4">{account.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Account Number</span>
                  <span className="font-mono text-slate-900">{account.number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Type</span>
                  <span>{account.type}</span>
                </div>
                <div className="flex justify-between text-lg mt-4 pt-4 border-t border-slate-200">
                  <span className="text-slate-600">Balance</span>
                  <span className="font-bold text-green-600">{account.balance}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
