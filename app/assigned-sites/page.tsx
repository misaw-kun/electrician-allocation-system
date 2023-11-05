import Link from "next/link";
import { autoAssign, getData } from "../utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //*/ Getting query params needed to access this page
  let dateQuery = String(searchParams?.date);
  // */ CHECK: if date is in `yyyy-mm-dd` format
  let validatedDate = /^\d{4}-\d{2}-\d{2}$/.test(dateQuery) ? dateQuery : null;
  let isAuthorized = searchParams?.authorized || false;

  if (validatedDate && isAuthorized) {
    const currentDate = new Date(dateQuery);
    //*/ FETCH: site and electrician data from server
    const electricianData = (await getData(
      `https://api.jsonbin.io/v3/b/${process.env.ELECTRICIAN_DATA_BIN}?meta=false`
    )) as ElectricianData[];
    const siteData = (await getData(
      `https://api.jsonbin.io/v3/b/${process.env.SITE_DATA_BIN}?meta=false`
    )) as SiteData[];

    //*/ 🪄🔮 AUTO-ASSIGN call takes place here
    const assignedData = autoAssign(electricianData, siteData, currentDate);

    //*/ Flattening the nested data for easy referencing while display
    const flattenedData = assignedData.reduce((flattened, electrician) => {
      electrician.assignedSites.forEach((site) => {
        flattened.push({
          electricianName: electrician.name,
          siteName: site.name,
          assignmentDate:
            site.AssignedElectrician?.electricianAssignDate || "N/A",
          isGrievanceSite: site.grievance ? "Yes" : "No",
          isGrievanceElectrician: electrician.grievanceElectrician
            ? "Yes"
            : "No",
        });
      });
      return flattened;
    }, [] as FlattenedData[]);

    return (
      <div className="bg-white rounded p-4 border border-black mb-4">
        <h1 className="text-xl font-semibold mb-2 bg-black text-white inline-block p-2 uppercase">
          Auto Assigned Sites ✨⚡
        </h1>
        {/* CHECK: if NO ASSIGNMENTS for the given date */}
        {flattenedData?.length > 0 ? (
          <table className="table-fixed w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2 sticky top-0 bg-white border">
                  Site Name
                </th>
                <th className="px-4 py-2 sticky top-0 bg-white border">
                  Electrician Name
                </th>
                <th className="px-4 py-2 sticky top-0 bg-white border">
                  Assignment Date
                </th>
                <th className="px-4 py-2 sticky top-0 bg-white border">
                  Grievance Site
                </th>
                <th className="px-4 py-2 sticky top-0 bg-white border">
                  Is Grievance Electrician?
                </th>
              </tr>
            </thead>
            <tbody>
              {flattenedData.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2">{entry.electricianName}</td>
                  <td className="border px-4 py-2">{entry.siteName}</td>
                  <td className="border px-4 py-2">{entry.assignmentDate}</td>
                  <td className="border px-4 py-2">{entry.isGrievanceSite}</td>
                  <td className="border px-4 py-2">
                    {entry.isGrievanceElectrician}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-black uppercase">
              🌵 No Assignments for{" "}
              <span className="bg-black p-1 text-white">{dateQuery}</span> yet
            </h2>
          </>
        )}
        <Link
          href={{
            pathname: "/",
          }}
        >
          <button className="bg-white border border-black font-semibold py-2 px-4 rounded hover:bg-black hover:text-white uppercase mt-5">
            ⬅️ Go Back to Homepage
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center">
          <h1 className="text-red-500 font-extrabold text-3xl">
            👎Access this page from the{" "}
            <span className="font-normal uppercase text-xl text-black rounded border-2 border-black p-2">
              Auto Assign ✨
            </span>{" "}
            button in{" "}
            <Link
              className="font-normal text-3xl text-blue-700 hover:underline"
              href={"/"}
            >
              homepage
            </Link>{" "}
            to use this feature
          </h1>
        </div>
      </>
    );
  }
}
