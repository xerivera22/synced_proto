export type StudentStatus = "active" | "pending" | "inactive";

export type AdminStudentRecord = {
  id: string;
  name: string;
  gradeLevel: string;
  section: string;
  status: StudentStatus;
  enrollmentDate: string;
  advisor: string;
  gpa: number;
  alerts?: string;
};

export type FacultyRecord = {
  id: string;
  name: string;
  department: string;
  subjects: number;
  contact: string;
};

export type EventRecord = {
  id: string;
  title: string;
  date: string;
  audience: "students" | "teachers" | "parents" | "all";
  status: "scheduled" | "draft" | "sent";
};

export type PaymentRecord = {
  id: string;
  student: string;
  gradeLevel: string;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  status: "paid" | "partial" | "overdue";
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  target: "students" | "teachers" | "parents" | "all";
  scheduledFor: string;
  status: "draft" | "scheduled" | "sent";
};

export const studentMetrics = {
  totalStudents: 864,
  activeStudents: 798,
  pendingEnrollments: 42,
  inactiveStudents: 24,
  averageGPA: 3.42,
};

export const studentRecords: AdminStudentRecord[] = [
  {
    id: "ST-1024",
    name: "Alexandra Reyes",
    gradeLevel: "Grade 10",
    section: "STEM-A",
    status: "active",
    enrollmentDate: "2023-08-15",
    advisor: "Ms. Dela Cruz",
    gpa: 3.8,
  },
  {
    id: "ST-1089",
    name: "Miguel Santos",
    gradeLevel: "Grade 12",
    section: "ABM-B",
    status: "pending",
    enrollmentDate: "2024-06-27",
    advisor: "Mr. Gutierrez",
    gpa: 3.1,
    alerts: "Missing medical clearance",
  },
  {
    id: "ST-0953",
    name: "Jamie Lim",
    gradeLevel: "Grade 9",
    section: "Arts-C",
    status: "active",
    enrollmentDate: "2022-08-03",
    advisor: "Ms. Flores",
    gpa: 3.6,
  },
  {
    id: "ST-0811",
    name: "Rafael Tan",
    gradeLevel: "Grade 11",
    section: "HUMSS-A",
    status: "inactive",
    enrollmentDate: "2021-08-18",
    advisor: "Mr. Villanueva",
    gpa: 2.7,
    alerts: "On leave — returning Q3",
  },
  {
    id: "ST-1122",
    name: "Celine Navarro",
    gradeLevel: "Grade 7",
    section: "Explorer-B",
    status: "active",
    enrollmentDate: "2024-05-04",
    advisor: "Ms. Javier",
    gpa: 3.9,
  },
  {
    id: "ST-0875",
    name: "Kenji Sato",
    gradeLevel: "Grade 8",
    section: "Discovery-A",
    status: "active",
    enrollmentDate: "2023-01-12",
    advisor: "Ms. Domingo",
    gpa: 3.4,
  },
];

export const facultyRecords: FacultyRecord[] = [
  {
    id: "T-021",
    name: "Maria Dela Cruz",
    department: "STEM",
    subjects: 4,
    contact: "m.delacruz@synced.edu",
  },
  {
    id: "T-034",
    name: "Antonio Ramirez",
    department: "Humanities",
    subjects: 3,
    contact: "a.ramirez@synced.edu",
  },
  {
    id: "T-017",
    name: "Patricia Lao",
    department: "Junior High",
    subjects: 5,
    contact: "p.lao@synced.edu",
  },
];

export const upcomingEvents: EventRecord[] = [
  {
    id: "EV-909",
    title: "STEM Research Expo",
    date: "2024-08-12",
    audience: "students",
    status: "scheduled",
  },
  {
    id: "EV-912",
    title: "Faculty Development Day",
    date: "2024-08-29",
    audience: "teachers",
    status: "draft",
  },
  {
    id: "EV-918",
    title: "Quarterly Parent Forum",
    date: "2024-09-03",
    audience: "parents",
    status: "scheduled",
  },
];

export const paymentSummaries = {
  totalDueThisMonth: 128640,
  collectedThisMonth: 87450,
  overdueInvoices: 36,
  scholarshipsGranted: 18,
};

export const paymentRecords: PaymentRecord[] = [
  {
    id: "INV-20240601",
    student: "Alexandra Reyes",
    gradeLevel: "Grade 10",
    amountDue: 18500,
    amountPaid: 18500,
    dueDate: "2024-06-15",
    status: "paid",
  },
  {
    id: "INV-20240614",
    student: "Miguel Santos",
    gradeLevel: "Grade 12",
    amountDue: 21500,
    amountPaid: 15000,
    dueDate: "2024-06-20",
    status: "partial",
  },
  {
    id: "INV-20240522",
    student: "Rafael Tan",
    gradeLevel: "Grade 11",
    amountDue: 20500,
    amountPaid: 0,
    dueDate: "2024-05-30",
    status: "overdue",
  },
];

export const announcements: AnnouncementRecord[] = [
  {
    id: "ANN-341",
    title: "Quarter 1 Grade Release",
    target: "students",
    scheduledFor: "2024-07-05",
    status: "scheduled",
  },
  {
    id: "ANN-343",
    title: "Updated Tuition Guidelines",
    target: "parents",
    scheduledFor: "2024-06-30",
    status: "draft",
  },
  {
    id: "ANN-330",
    title: "Advisory: Weather Protocol",
    target: "all",
    scheduledFor: "2024-06-22",
    status: "sent",
  },
];
