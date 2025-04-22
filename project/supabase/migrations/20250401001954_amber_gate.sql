/*
  # Initial Schema for Freelance Management System

  1. New Tables
    - `profiles`
      - User profile information
      - Linked to Supabase auth.users
    - `clients`
      - Client information
    - `projects`
      - Project details and timelines
    - `tasks`
      - Project tasks and status
    - `time_entries`
      - Time tracking records
    - `invoices`
      - Invoice information
    - `payments`
      - Payment records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  business_name text,
  email text UNIQUE NOT NULL,
  hourly_rate decimal(10,2),
  currency text DEFAULT 'USD',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  name text NOT NULL,
  email text,
  company text,
  phone text,
  address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  name text NOT NULL,
  description text,
  start_date date,
  end_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on-hold', 'cancelled')),
  hourly_rate decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  due_date date,
  estimated_hours decimal(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_entries table
CREATE TABLE time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  task_id uuid REFERENCES tasks(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  invoice_number text NOT NULL,
  issue_date date NOT NULL,
  due_date date NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  amount decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) NOT NULL,
  amount decimal(10,2) NOT NULL,
  payment_date date NOT NULL,
  payment_method text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own clients"
  ON clients FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage tasks in own projects"
  ON tasks FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage time entries in own projects"
  ON time_entries FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage invoices in own projects"
  ON invoices FOR ALL
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage payments for own invoices"
  ON payments FOR ALL
  TO authenticated
  USING (
    invoice_id IN (
      SELECT i.id FROM invoices i
      JOIN projects p ON i.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

-- Create functions
CREATE OR REPLACE FUNCTION calculate_invoice_total(invoice_uuid uuid)
RETURNS decimal
LANGUAGE plpgsql
AS $$
DECLARE
  total decimal;
BEGIN
  SELECT COALESCE(SUM(amount), 0)
  INTO total
  FROM payments
  WHERE invoice_id = invoice_uuid;
  
  RETURN total;
END;
$$;