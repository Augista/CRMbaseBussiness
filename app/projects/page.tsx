'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { AddProjectModal } from '@/components/modals/add-project-modal'

const initialProjects = [
  { id: '1', name: 'Website Redesign', status: 'In Progress', progress: 65, budget: 'Rp 15,000,000', team: 5 },
  { id: '2', name: 'Mobile App Development', status: 'In Progress', progress: 45, budget: 'Rp 25,000,000', team: 8 },
  { id: '3', name: 'Database Migration', status: 'Planning', progress: 20, budget: 'Rp 8,000,000', team: 3 },
  { id: '4', name: 'Cloud Infrastructure', status: 'Completed', progress: 100, budget: 'Rp 12,000,000', team: 4 },
]

const mockTasks = [
  { id: '1', title: 'Setup Development Environment', project: 'Website Redesign', assigned: 'John Doe', status: 'In Progress', dueDate: '2024-02-15' },
  { id: '2', title: 'Create UI Mockups', project: 'Website Redesign', assigned: 'Jane Smith', status: 'Completed', dueDate: '2024-02-10' },
  { id: '3', title: 'Backend API Implementation', project: 'Mobile App Development', assigned: 'Mike Johnson', status: 'In Progress', dueDate: '2024-03-01' },
  { id: '4', title: 'Testing & QA', project: 'Mobile App Development', assigned: 'Sarah Williams', status: 'Todo', dueDate: '2024-03-15' },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('projects')
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddProject = (data: any) => {
    const newProject = {
      id: (projects.length + 1).toString(),
      ...data,
      budget: `Rp ${parseInt(data.budget).toLocaleString('id-ID')}`,
    }
    setProjects([...projects, newProject])
    console.log('[v0] Project added:', newProject)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <AddProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddProject}
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
        <Button
          className="bg-primary hover:bg-accent text-primary-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        {[
          { id: 'projects', label: 'Projects' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'timesheets', label: 'Timesheets' },
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

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded mt-2 inline-block ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'Planning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <p className="text-slate-600 text-sm">Budget</p>
                    <p className="font-semibold">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Team Size</p>
                    <p className="font-semibold">{project.team} members</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Task</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Assigned To</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{task.title}</td>
                    <td className="px-6 py-4 text-slate-600">{task.project}</td>
                    <td className="px-6 py-4">{task.assigned}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{task.dueDate}</td>
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

      {/* Timesheets Tab */}
      {activeTab === 'timesheets' && (
        <Card className="p-8 text-center text-slate-600">
          <p>No timesheets yet. Create one to get started!</p>
        </Card>
      )}
    </div>
  )
}
