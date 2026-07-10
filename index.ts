export type ApplicationStatus = "Pending" | "Processing" | "Completed" | "Delivered";

export interface Application {
  id: string;
  name: string;
  mobile: string;
  address: string;
  service: string;
  sub_service: string | null;
  notes: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface SubService {
  name: string;
  charge: string;
}

export interface ServiceInfo {
  slug: string;
  name: string;
  icon: string;
  description: string;
  documents: string[];
  subServices: SubService[];
}
