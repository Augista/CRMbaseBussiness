// API utility functions for Supabase integration
// These can be used with the createClient from '@/lib/supabase/client'

export async function createCustomer(supabase: any, data: any) {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert([data])
    .select()
  return { customer, error }
}

export async function getCustomers(supabase: any) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createProduct(supabase: any, data: any) {
  const { data: product, error } = await supabase
    .from('products')
    .insert([data])
    .select()
  return { product, error }
}

export async function getProducts(supabase: any) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createInvoice(supabase: any, data: any) {
  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert([data])
    .select()
  return { invoice, error }
}

export async function getInvoices(supabase: any) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createEmployee(supabase: any, data: any) {
  const { data: employee, error } = await supabase
    .from('employees')
    .insert([data])
    .select()
  return { employee, error }
}

export async function getEmployees(supabase: any) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createProject(supabase: any, data: any) {
  const { data: project, error } = await supabase
    .from('projects')
    .insert([data])
    .select()
  return { project, error }
}

export async function getProjects(supabase: any) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}
