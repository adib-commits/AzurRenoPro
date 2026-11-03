export interface AppointmentCreate {
  customer_name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
}

export interface Appointment extends AppointmentCreate {
  id: number;
  status: string;
  created_at: string;
}
