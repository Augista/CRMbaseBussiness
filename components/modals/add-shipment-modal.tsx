import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddShipmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function AddShipmentModal({
  open,
  onOpenChange,
  onSubmit,
}: AddShipmentModalProps) {
  const [formData, setFormData] = useState({
    shipmentNumber: '',
    origin: '',
    destination: '',
    status: 'Pending',
    eta: '',
    totalValue: '',
    containerCount: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      shipmentNumber: '',
      origin: '',
      destination: '',
      status: 'Pending',
      eta: '',
      totalValue: '',
      containerCount: '',
      description: '',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipment Number
            </label>
            <Input
              value={formData.shipmentNumber}
              onChange={(e) =>
                setFormData({ ...formData, shipmentNumber: e.target.value })
              }
              placeholder="SHIP-001"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Origin</label>
              <Input
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
                placeholder="Singapore"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Destination
              </label>
              <Input
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                placeholder="Jakarta"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option>Pending</option>
              <option>In Transit</option>
              <option>In Port</option>
              <option>Cleared</option>
              <option>Delivered</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ETA</label>
            <Input
              type="date"
              value={formData.eta}
              onChange={(e) =>
                setFormData({ ...formData, eta: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Value (Rp)
            </label>
            <Input
              type="number"
              value={formData.totalValue}
              onChange={(e) =>
                setFormData({ ...formData, totalValue: e.target.value })
              }
              placeholder="850000000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Container Count
            </label>
            <Input
              type="number"
              value={formData.containerCount}
              onChange={(e) =>
                setFormData({ ...formData, containerCount: e.target.value })
              }
              placeholder="2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Cargo description"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-accent">
              Create Shipment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
