'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

const mockProducts = [
  { id: '1', sku: 'PROD-001', name: 'Laptop Pro', category: 'Electronics', price: 'Rp 1,299,000', quantity: 45, warehouse: 'Main Warehouse' },
  { id: '2', sku: 'PROD-002', name: 'Monitor 27"', category: 'Electronics', price: 'Rp 399,000', quantity: 120, warehouse: 'Main Warehouse' },
  { id: '3', sku: 'PROD-003', name: 'Keyboard', category: 'Accessories', price: 'Rp 79,000', quantity: 230, warehouse: 'Secondary' },
  { id: '4', sku: 'PROD-004', name: 'Mouse Wireless', category: 'Accessories', price: 'Rp 49,000', quantity: 180, warehouse: 'Main Warehouse' },
  { id: '5', sku: 'PROD-005', name: 'USB Hub', category: 'Accessories', price: 'Rp 29,000', quantity: 50, warehouse: 'Secondary' },
]

const mockWarehouses = [
  { id: '1', name: 'Main Warehouse', location: 'New York', products: 575, capacity: '80%' },
  { id: '2', name: 'Secondary Warehouse', location: 'Chicago', products: 280, capacity: '60%' },
  { id: '3', name: 'West Coast Hub', location: 'Los Angeles', products: 420, capacity: '75%' },
]

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('products')
  const [search, setSearch] = useState('')

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Product & Inventory</h1>
        <Button className="bg-primary hover:bg-accent text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        {[
          { id: 'products', label: 'Products' },
          { id: 'warehouses', label: 'Warehouses' },
          { id: 'shipments', label: 'Shipments' },
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
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Warehouse</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-600">{product.sku}</td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.quantity > 100 ? 'bg-green-100 text-green-700' :
                        product.quantity > 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.quantity} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.warehouse}</td>
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

      {/* Warehouses Tab */}
      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWarehouses.map((warehouse) => (
            <Card key={warehouse.id} className="p-6">
              <h3 className="font-semibold mb-2">{warehouse.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{warehouse.location}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Products</span>
                  <span className="font-semibold">{warehouse.products}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <span className="font-semibold">{warehouse.capacity}</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: warehouse.capacity }}
                ></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Shipments Tab */}
      {activeTab === 'shipments' && (
        <Card className="p-8 text-center text-slate-600">
          <p>No shipments yet. Create one to get started!</p>
        </Card>
      )}
    </div>
  )
}
