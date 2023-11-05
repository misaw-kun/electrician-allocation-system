type ElectricianData = {
  name: string;
  phoneNumber: string;
  zone: string[];
  // assignedSites: Omit<SiteData, "AssignedElectrician">[];
  assignedSites: SiteData[];
  grievanceElectrician: boolean;
};

type SiteData = {
  name: string;
  phone: string;
  city: string;
  AssignedElectrician: {
    electricianName?: string;
    electricianAssignDate?: string;
  };
  InstallationDate: string;
  grievance: boolean;
};

type FlattenedData = {
  electricianName: string;
  siteName: string;
  assignmentDate: string;
  isGrievanceSite: string;
  isGrievanceElectrician: string;
};
