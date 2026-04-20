'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  MapPin,
  Anchor,
  AlertTriangle,
  FileText,
  Warehouse,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { AddShipmentModal } from '@/components/modals/add-shipment-modal'

const initialShipmentData = [
  { id: '1', shipmentNo: 'SHIP-2024-001', origin: 'Shanghai', destination: 'Jakarta', status: 'In Transit', vessel: 'MS Pacific', eta: '2024-02-15', containers: 45, value: 'Rp 450,000,000' },
  { id: '2', shipmentNo: 'SHIP-2024-002', origin: 'Singapore', destination: 'Surabaya', status: 'Port Arrival', vessel: 'MV Ocean Star', eta: '2024-02-12', containers: 28, value: 'Rp 280,000,000' },
  { id: '3', shipmentNo: 'SHIP-2024-003', origin: 'Hong Kong', destination: 'Medan', status: 'Loading', vessel: 'Ever Given', eta: '2024-02-20', containers: 52, value: 'Rp 520,000,000' },
  { id: '4', shipmentNo: 'SHIP-2024-004', origin: 'Rotterdam', destination: 'Jakarta', status: 'In Transit', vessel: 'Maersk Seatrade', eta: '2024-03-01', containers: 38, value: 'Rp 380,000,000' },
  { id: '5', shipmentNo: 'SHIP-2024-005', origin: 'Los Angeles', destination: 'Jakarta', status: 'Customs Clearance', vessel: 'OOCL Hong Kong', eta: '2024-02-18', containers: 42, value: 'Rp 420,000,000' },
]

const containerData = [
  { id: '1', containerNo: 'CONT-001', type: '20ft', weight: '18.5 tons', goods: 'Electronics', status: 'Loaded', shipment: 'SHIP-2024-001' },
  { id: '2', containerNo: 'CONT-002', type: '40ft', weight: '28 tons', goods: 'Textiles', status: 'In Port', shipment: 'SHIP-2024-002' },
  { id: '3', containerNo: 'CONT-003', type: '20ft', weight: '19 tons', goods: 'Machinery', status: 'Loaded', shipment: 'SHIP-2024-003' },
  { id: '4', containerNo: 'CONT-004', type: '40ft', weight: '27.5 tons', goods: 'Consumer Goods', status: 'Customs', shipment: 'SHIP-2024-005' },
  { id: '5', containerNo: 'CONT-005', type: '20ft', weight: '17.8 tons', goods: 'Spare Parts', status: 'Delivered', shipment: 'SHIP-2024-004' },
]

const vesselData = [
  { id: '1', vesselName: 'MS Pacific', flag: 'Singapore', capacity: 15000, teu: 'Yes', currentLoad: 8500, eta: '2024-02-15' },
  { id: '2', vesselName: 'MV Ocean Star', flag: 'Panama', capacity: 18000, teu: 'Yes', currentLoad: 14200, eta: '2024-02-12' },
  { id: '3', vesselName: 'Ever Given', flag: 'UK', capacity: 20000, teu: 'Yes', currentLoad: 19800, eta: '2024-02-20' },
  { id: '4', vesselName: 'Maersk Seatrade', flag: 'Denmark', capacity: 16000, teu: 'Yes', currentLoad: 12500, eta: '2024-03-01' },
]

const portData = [
  { port: 'Jakarta', arrivals: 45, departures: 48, avgTime: '3.2d', efficiency: '94%' },
  { port: 'Surabaya', arrivals: 32, departures: 35, avgTime: '2.8d', efficiency: '96%' },
  { port: 'Medan', arrivals: 28, departures: 26, avgTime: '3.5d', efficiency: '91%' },
  { port: 'Penang', arrivals: 38, departures: 40, avgTime: '2.9d', efficiency: '95%' },
]

const documentData = [
  { id: '1', docType: 'Bill of Lading', shipment: 'SHIP-2024-001', status: 'Submitted', date: '2024-02-10' },
  { id: '2', docType: 'Invoice', shipment: 'SHIP-2024-002', status: 'Approved', date: '2024-02-11' },
  { id: '3', docType: 'Packing List', shipment: 'SHIP-2024-003', status: 'Pending', date: '2024-02-12' },
  { id: '4', docType: 'Certificate of Origin', shipment: 'SHIP-2024-004', status: 'Approved', date: '2024-02-09' },
  { id: '5', docType: 'Insurance Certificate', shipment: 'SHIP-2024-005', status: 'Submitted', date: '2024-02-13' },
]

const customsData = [
  { id: '1', shipment: 'SHIP-2024-001', status: 'Cleared', clearanceDate: '2024-02-14', duties: 'Rp 45,000,000', taxes: 'Rp 22,500,000' },
  { id: '2', shipment: 'SHIP-2024-002', status: 'In Review', clearanceDate: '-', duties: 'Rp 28,000,000', taxes: 'Rp 14,000,000' },
  { id: '3', shipment: 'SHIP-2024-003', status: 'Pending', clearanceDate: '-', duties: 'Rp 52,000,000', taxes: 'Rp 26,000,000' },
  { id: '4', shipment: 'SHIP-2024-004', status: 'Cleared', clearanceDate: '2024-02-13', duties: 'Rp 38,000,000', taxes: 'Rp 19,000,000' },
]

const alertData = [
  { id: '1', type: 'Delay', shipment: 'SHIP-2024-002', message: 'Port congestion causing 2-day delay', severity: 'Warning', date: '2024-02-12' },
  { id: '2', type: 'Documentation', shipment: 'SHIP-2024-003', message: 'Packing list discrepancy detected', severity: 'Alert', date: '2024-02-11' },
  { id: '3', type: 'Customs', shipment: 'SHIP-2024-005', message: 'Awaiting customs inspection', severity: 'Info', date: '2024-02-10' },
  { id: '4', type: 'Damage', shipment: 'SHIP-2024-001', message: 'Minor container damage reported', severity: 'Warning', date: '2024-02-09' },
]

const financialData = [
  { month: 'Dec', freight: 2500, customs: 1200, insurance: 850, handling: 600 },
  { month: 'Jan', freight: 3200, customs: 1450, insurance: 920, handling: 750 },
  { month: 'Feb', freight: 2800, customs: 1100, insurance: 780, handling: 650 },
]

const importExportData = [
  { name: 'Imports', value: 58 },
  { name: 'Exports', value: 42 },
]

const COLORS = ['#8B5A2B', '#D4A574']

export default function Logistics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [shipmentData, setShipmentData] = useState(initialShipmentData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddShipment = (data: any) => {
    const newShipment = {
      id: (shipmentData.length + 1).toString(),
      shipmentNo: data.shipmentNumber,
      origin: data.origin,
      destination: data.destination,
      status: data.status,
      eta: data.eta,
      value: `Rp ${parseInt(data.totalValue).toLocaleString('id-ID')}`,
      containers: parseInt(data.containerCount),
      vessel: 'TBD',
    }
    setShipmentData([...shipmentData, newShipment])
    console.log('[v0] Shipment added:', newShipment)
  }

  const tabs = [
    { id: 'overview', label: 'Shipment Overview', icon: MapPin },
    { id: 'tracking', label: 'Tracking & Visibility', icon: Clock },
    { id: 'vessels', label: 'Vessels & Ports', icon: Anchor },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'customs', label: 'Customs & Clearance', icon: AlertTriangle },
    { id: 'warehouse', label: 'Warehouse & Inventory', icon: Warehouse },
    { id: 'financial', label: 'Financial Monitoring', icon: TrendingUp },
    { id: 'alerts', label: 'Operational Alerts', icon: AlertTriangle },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <AddShipmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddShipment}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Logistics & Shipping</h1>
        <Button
          className="bg-primary hover:bg-accent text-primary-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Shipment Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Shipments</p>
              <p className="text-3xl font-bold">245</p>
              <p className="text-xs text-foreground mt-2">In last 30 days</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">In Transit</p>
              <p className="text-3xl font-bold text-blue-600">58</p>
              <p className="text-xs text-foreground mt-2">Active shipments</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Value</p>
              <p className="text-2xl font-bold">Rp 2.05B</p>
              <p className="text-xs text-foreground mt-2">All shipments</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Delivered On Time</p>
              <p className="text-3xl font-bold text-green-600">94%</p>
              <p className="text-xs text-foreground mt-2">Performance rate</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Shipments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Shipment #</th>
                    <th className="text-left py-3 px-4">Route</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">ETA</th>
                    <th className="text-left py-3 px-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData.map((ship) => (
                    <tr key={ship.id} className="border-b border-border hover:bg-muted">
                      <td className="py-3 px-4 font-medium">{ship.shipmentNo}</td>
                      <td className="py-3 px-4">{ship.origin} → {ship.destination}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          ship.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          ship.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {ship.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{ship.eta}</td>
                      <td className="py-3 px-4">{ship.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tracking & Visibility Tab */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Container Tracking Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={importExportData} cx="50%" cy="50%" labelLine={false} label={{ fill: '#000' }} outerRadius={100} fill="#8884d8" dataKey="value">
                    {importExportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {containerData.map((cont) => (
                  <div key={cont.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{cont.containerNo}</p>
                      <span className="text-xs bg-accent text-primary-foreground px-2 py-1 rounded">{cont.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{cont.type} | {cont.goods} | {cont.weight}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Vessels & Ports Tab */}
      {activeTab === 'vessels' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Vessel Performance</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Vessel Name</th>
                    <th className="text-left py-3 px-4">Flag</th>
                    <th className="text-left py-3 px-4">Capacity</th>
                    <th className="text-left py-3 px-4">Current Load</th>
                    <th className="text-left py-3 px-4">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {vesselData.map((vessel) => {
                    const util = Math.round((vessel.currentLoad / vessel.capacity) * 100)
                    return (
                      <tr key={vessel.id} className="border-b border-border hover:bg-muted">
                        <td className="py-3 px-4 font-medium">{vessel.vesselName}</td>
                        <td className="py-3 px-4">{vessel.flag}</td>
                        <td className="py-3 px-4">{vessel.capacity} TEU</td>
                        <td className="py-3 px-4">{vessel.currentLoad} TEU</td>
                        <td className="py-3 px-4">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${util}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4">Port Performance Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={portData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="port" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="arrivals" fill="#8B5A2B" />
                <Bar dataKey="departures" fill="#D4A574" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Shipment Documents</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Document Type</th>
                    <th className="text-left py-3 px-4">Shipment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((doc) => (
                    <tr key={doc.id} className="border-b border-border hover:bg-muted">
                      <td className="py-3 px-4 font-medium">{doc.docType}</td>
                      <td className="py-3 px-4">{doc.shipment}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          doc.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{doc.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Customs & Clearance Tab */}
      {activeTab === 'customs' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customs & Duties Analysis</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Shipment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Duties</th>
                    <th className="text-left py-3 px-4">Taxes</th>
                    <th className="text-left py-3 px-4">Clearance Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customsData.map((custom) => (
                    <tr key={custom.id} className="border-b border-border hover:bg-muted">
                      <td className="py-3 px-4 font-medium">{custom.shipment}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          custom.status === 'Cleared' ? 'bg-green-100 text-green-700' :
                          custom.status === 'In Review' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {custom.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{custom.duties}</td>
                      <td className="py-3 px-4">{custom.taxes}</td>
                      <td className="py-3 px-4">{custom.clearanceDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4">Total Customs Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Total Duties</p>
                <p className="text-2xl font-bold">Rp 163,000,000</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Total Taxes</p>
                <p className="text-2xl font-bold">Rp 81,500,000</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Combined</p>
                <p className="text-2xl font-bold">Rp 244,500,000</p>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* Warehouse & Inventory Tab */}
      {activeTab === 'warehouse' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Warehouse Inventory Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Current Stock Value</p>
                <p className="text-2xl font-bold mt-2">Rp 1.2B</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Items in Stock</p>
                <p className="text-2xl font-bold mt-2">12,450</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Warehouse Utilization</p>
                <p className="text-2xl font-bold mt-2">78%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Items Pending</p>
                <p className="text-2xl font-bold mt-2">342</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Inventory Movement Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="freight" stroke="#8B5A2B" name="Inbound" />
                <Line type="monotone" dataKey="handling" stroke="#D4A574" name="Outbound" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Financial Monitoring Tab */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Freight Cost</p>
              <p className="text-2xl font-bold">Rp 2.85B</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Customs & Duties</p>
              <p className="text-2xl font-bold">Rp 244.5M</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Insurance Cost</p>
              <p className="text-2xl font-bold">Rp 142.8M</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Handling & Storage</p>
              <p className="text-2xl font-bold">Rp 123.2M</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Breakdown (Last 3 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="freight" fill="#8B5A2B" name="Freight" />
                <Bar dataKey="customs" fill="#D4A574" name="Customs" />
                <Bar dataKey="insurance" fill="#A0826D" name="Insurance" />
                <Bar dataKey="handling" fill="#6B4423" name="Handling" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Operational Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Alerts & Issues</h3>
            <div className="space-y-4">
              {alertData.map((alert) => (
                <div key={alert.id} className={`p-4 border-l-4 rounded ${
                  alert.severity === 'Alert' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'Warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{alert.type} - {alert.shipment}</p>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      alert.severity === 'Alert' ? 'bg-red-200 text-red-700' :
                      alert.severity === 'Warning' ? 'bg-yellow-200 text-yellow-700' :
                      'bg-blue-200 text-blue-700'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
