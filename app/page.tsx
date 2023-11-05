import { getData } from "./utils";
import SiteDataTable from "./components/SiteDataTable";
import AutoAssignButton from "./components/AutoAssign";

export default async function Home() {
  //*/ FETCH: site and electrician data from server
  const electricianData: ElectricianData[] = await getData(
    `https://api.jsonbin.io/v3/b/${process.env.ELECTRICIAN_DATA_BIN}`
  );
  const siteData: SiteData[] = await getData(
    `https://api.jsonbin.io/v3/b/${process.env.SITE_DATA_BIN}`
  );

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4 bg-black p-2 text-white uppercase">
          Electrician Allocation System ⚡
        </h1>
        <AutoAssignButton />
      </div>

      {/* Electrician Data Table */}
      <div className="bg-white rounded p-4 border border-black mb-4">
        <h2 className="text-xl font-semibold mb-2 bg-black text-white inline-block p-2 uppercase">
          Electrician Data
        </h2>
        <table className="table-fixed w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 sticky top-0 bg-white border">Name</th>
              <th className="px-4 py-2 sticky top-0 bg-white border">
                Phone Number
              </th>
              <th className="px-4 py-2 sticky top-0 bg-white border">Zone</th>
              <th className="px-4 py-2 sticky top-0 bg-white border">
                Grievance Electrician
              </th>
            </tr>
          </thead>
          <tbody>
            {electricianData.map((electrician, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border px-4 py-2">{electrician.name}</td>
                <td className="border px-4 py-2">{electrician.phoneNumber}</td>
                <td className="border px-4 py-2">
                  {electrician.zone.join(", ") || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {electrician.grievanceElectrician ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SiteDataTable initialSiteData={siteData} />
    </>
  );
}
