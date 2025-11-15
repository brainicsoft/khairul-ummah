/* Small Reusable Components */
export default function DetailItem({ label, value }: { label: string; value: any }) {
    // Function to format date
    const formatDate = (dateStr: string) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // fallback if invalid
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };
  
    // If the label includes "date" or "birth", format it
    const displayValue =
      label.toLowerCase().includes("birth") || label.toLowerCase().includes("date")
        ? formatDate(value)
        : value;
  
    return (
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-base font-semibold mt-1">{displayValue}</p>
      </div>
    );
  }
  