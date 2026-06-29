export type ActiveView = 'main' | 'about' | 'contact' | 'order' | 'admin';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  features: string[];
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Beta';
}

export interface ContactSubmission {
  id?: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface ProjectOrder {
  id?: string;
  customer_name: string;
  mobile: string;
  email: string;
  selected_services: string[];
  created_at?: string;
}
