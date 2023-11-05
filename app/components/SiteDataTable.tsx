"use client";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Toast from "./Toast";

const SiteDataTable = ({
  initialSiteData,
}: {
  initialSiteData: SiteData[];
}) => {
  const [data, setData] = useState(initialSiteData);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");

  // // * / FETCH: updated site data
  // useEffect(() => {
  //   // */ GET request to fetch updated data
  //   fetch("/api/site", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Internal Server Error");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  //*/ optimistically update UI then send a PUT req to server
  const handleUpdateDate = (siteName: string, newDate: string) => {
    //*/ finding the particular site from its `name` passed upwards from the `DatePicker` component
    const siteIndex = data.findIndex((site) => site.name === siteName);
    if (siteIndex !== -1) {
      const updatedSites = [...data];
      updatedSites[siteIndex].InstallationDate = newDate;
      //*/ setting local data for the site data table component
      setData(updatedSites);

      // sending the PUT request
      fetch("/api/site", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSites),
      })
        .then((res) => {
          if (res.ok) {
            //*/ making toast visible on successful change of date
            setToastVisible(true);
            //*/ setting a message in the toast
            setMessage("Updated date successfully");
          } else {
            setMessage("500 Internal Server Error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="bg-white rounded p-4 border border-black mb-4">
      {toastVisible && (
        <Toast
          message={message}
          duration={3000}
          onClose={() => setToastVisible(false)}
        />
      )}
      <h2 className="text-xl font-semibold mb-2 bg-black text-white inline-block p-2 uppercase">
        Site Data
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sticky top-0 bg-white py-2 border">Name</th>
              <th className="px-4 sticky top-0 bg-white py-2 border">Phone</th>
              <th className="px-4 sticky top-0 bg-white py-2 border">City</th>
              <th className="px-4 sticky top-0 bg-white py-2 border">
                Installation Date
              </th>
              <th className="px-4 sticky top-0 bg-white py-2 border">
                Grievance
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((site, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border px-4 py-2">{site.name}</td>
                <td className="border px-4 py-2">{site.phone}</td>
                <td className="border px-4 py-2">{site.city}</td>
                <td className="border px-4 py-2">
                  <DatePicker
                    key={site.name}
                    site={site}
                    onUpdateDate={handleUpdateDate}
                  />
                </td>
                <td className="border px-4 py-2">
                  {site.grievance ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiteDataTable;
