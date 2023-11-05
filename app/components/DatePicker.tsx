import { useEffect, useState } from "react";
import { formatDate } from "../utils";

const DatePicker = ({
  site,
  onUpdateDate,
}: {
  site: SiteData;
  onUpdateDate: (name: string, date: string) => void;
}) => {
  const [newDate, setNewDate] = useState(formatDate(site.InstallationDate));

  //*/ checking if the user actually picked a new date , then only allow sending a PUT request
  const hasDateChanged = newDate !== site.InstallationDate;

  useEffect(() => {
    setNewDate(site.InstallationDate);
  }, [site.InstallationDate]);

  const handleDateChange = (event: any) => {
    setNewDate(event.target.value);
  };

  const handleSaveDate = () => {
    if (hasDateChanged) {
      onUpdateDate(site.name, newDate);
    }
  };

  return (
    <div>
      <p className="bg-black text-white mb-2 uppercase p-2 rounded">
        Date: {formatDate(site.InstallationDate)}
      </p>
      <input
        className="border-gray-600 border mb-2 p-1 rounded cursor-pointer block"
        type="date"
        value={newDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      {hasDateChanged && (
        <button
          className="border-black border bg-white p-2 text-xs uppercase hover:bg-black hover:text-white rounded cursor-pointer disabled:text-gray-500 disabled:cursor-wait disabled:border-gray-500"
          onClick={handleSaveDate}
        >
          Change Date
        </button>
      )}
    </div>
  );
};

export default DatePicker;
