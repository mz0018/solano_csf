import { useState } from "react";
import { useGetLoginHistory } from "../../../hooks/useGetLoginHistory";
import { TableUI } from "../../../ui/form/TableUI";
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer";
import { ErrorText } from "../../../ui/form/ErrorText";
import { InlineLoader } from "../../../components/Loader";

export const LoginHistory = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useGetLoginHistory(page);
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const parseUserAgent = (ua: string) => {
    let browser = 'Unknown', os = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';
    return `${browser} on ${os}`;
  };
  if (isLoading) {
    return <InlineLoader message="Loading login history..." />;
  }
  if (isError) {
    return <ErrorText message={(error as Error).message} />;
  }
  return (
    <>
      <AdminResponsiveContainer>
        <TableUI className="w-full text-sm">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Device / Browser</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.history.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  No login history found
                </td>
              </tr>
            ) : (
              data?.history.map((entry, index) => (
                <tr key={index}>
                  <td className="font-mono">{entry.ip}</td>
                  <td>{parseUserAgent(entry.userAgent)}</td>
                  <td className="whitespace-nowrap">{formatDate(entry.loginAt)}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      entry.success
                        ? 'text-green-700 bg-green-50'
                        : 'text-red-700 bg-red-50'
                    }`}>
                      {entry.success ? (
                        <>Success on attempt</>
                      ) : (
                        <>Failed attempt</>
                      )}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableUI>
      
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 text-sm font-medium text-[#1f2937] bg-white border border-[#e5e7eb] rounded-md hover:bg-[#f3f4f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          Previous
        </button>
        <span className="text-sm text-[#6b7280]">Page {data?.page} of {data?.totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(data?.totalPages ?? 1, p + 1))}
          disabled={page === data?.totalPages || isLoading}
          className="px-4 py-2 text-sm font-medium text-[#1f2937] bg-white border border-[#e5e7eb] rounded-md hover:bg-[#f3f4f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          Next
        </button>
      </div>
      </AdminResponsiveContainer>
    </>
  );
};