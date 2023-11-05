export const formatDate = (dateString: string): string => {
  return dateString.split("T")[0];
};

export async function getData(url: string) {
  const res = await fetch(url, {
    headers: {
      "X-Master-Key": `${process.env.API_MASTER_KEY}`,
      "X-Access-Key": `${process.env.API_ACCESS_KEY}`,
      "X-Bin-Meta": "false",
    },
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
}

//*/ Here the magic ✨ happens
//     name: "Digvijay",
//     phoneNumber: "6161232524",
//     zone: [],
//     assignedSites: [],
//     grievanceElectrician: false,
//   },
//   {
//     name: "Pranav",
//     phoneNumber: "6161232524",
//     zone: [],
//     assignedSites: [],
//     grievanceElectrician: true,
//   },
//   {
//     name: "Sidharth",
//     phoneNumber: "6161232524",
//     zone: ["NOIDA", "GHAZIABAD"],
//     assignedSites: [],
//     grievanceElectrician: false,
//   },
//   {
//     name: "Javed",
//     phoneNumber: "6161232524",
//     zone: ["GURGAON"],
//     assignedSites: [],
//     grievanceElectrician: false,
//   },
// ];

// const rawSites = [
//   {
//     name: "Manthan ",
//     phone: "6163988877",
//     city: "GREATER NOIDA",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Samrat Jain ",
//     phone: "6163988877",
//     city: "GHAZIABAD",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Abhimanu Jaiswal ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Abhinav Tambi (3rd Floor) ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-12-04",
//     grievance: false,
//   },
//   {
//     name: "Abhinav Tambi (2nd Floor) ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Avi Arora",
//     phone: "6163988877",
//     city: "NOIDA",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Mukul Rathi",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Pankaj Khatri",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Abhinav Tambi (4RTH Floor) ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Mohit Garg ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "PRATEEK  ",
//     phone: "6163988877",
//     city: "NOIDA",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Ishaan ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Official Ronnie Hunk ",
//     phone: "6163988877",
//     city: "GHAZIABAD",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "AARYA MOTORS ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Utkarsh ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Vijesh Wadhwa ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Shahzama ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "aartstore  ",
//     phone: "6163988877",
//     city: "ANY FOR NOW",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Sameer ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Anuj Pandey ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Randeep Reehal ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "Harsh Bansal ",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "neha05singh  ",
//     phone: "6163988877",
//     city: "ANY FOR NOW",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "pujapunj9  ",
//     phone: "6163988877",
//     city: "ANY FOR NOW",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "  Divanshu Arora ",
//     phone: "6163988877",
//     city: "ANY FOR NOW",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Sushil Flock Coliving",
//     phone: "6163988877",
//     city: "GURGAON",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Yogesh Agarwal ",
//     phone: "6163988877",
//     city: "NOIDA",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
//   {
//     name: "MLKR Pvt. Ltd (ref 2) ",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "KRISHNA ROY",
//     phone: "6163988877",
//     city: "DELHI",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: false,
//   },
//   {
//     name: "Anuj Gupta  ",
//     phone: "6163988877",
//     city: "NOIDA",
//     AssignedElectrician: {},
//     InstallationDate: "2023-11-04",
//     grievance: true,
//   },
// ];

//
export function autoAssign(
  electricians: ElectricianData[],
  sites: SiteData[],
  currentDate: Date
): ElectricianData[] {
  const assignedElectricians = [...electricians];
  const maxSitesPerElectrician = 3;
  const currentDateString = currentDate.toISOString().split("T")[0];

  //*/ CHECK: if an electrician is available for a specific date
  const isElectricianAvailable = (
    electrician: ElectricianData,
    date: string
  ) => {
    return (
      electrician.assignedSites.filter((site) => site.InstallationDate === date)
        .length < maxSitesPerElectrician
    );
  };

  // * / FILTER: electricians into grievance and general
  const grievanceElectricians = assignedElectricians.filter(
    (e) => e.grievanceElectrician
  );
  const generalElectricians = assignedElectricians.filter(
    (e) => !e.grievanceElectrician
  );

  // * / FILTER: remaining sites(unassigned) to assign based on the current date
  const sitesToAssign = sites.filter(
    (site) =>
      Object.keys(site.AssignedElectrician).length < 1 &&
      site.InstallationDate === currentDateString
  );

  for (const site of sitesToAssign) {
    // `assigned` is a flag here ensuring one electrician per site
    let assigned = false;
    if (site.grievance) {
      for (const electrician of grievanceElectricians) {
        if (isElectricianAvailable(electrician, currentDateString)) {
          electrician.assignedSites.push(site);
          site.AssignedElectrician = {
            electricianName: electrician.name,
            electricianAssignDate: currentDateString,
          };
          assigned = true;
          break;
        }
      }
    }
    // assigning remaining sites to general electricians
    if (!assigned) {
      for (const electrician of generalElectricians) {
        if (isElectricianAvailable(electrician, currentDateString)) {
          electrician.assignedSites.push(site);
          site.AssignedElectrician = {
            electricianName: electrician.name,
            electricianAssignDate: currentDateString,
          };
          break;
        }
      }
    }
  }

  return assignedElectricians;
}
