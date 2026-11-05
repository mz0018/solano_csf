import { useState } from "react";
import { useGetLoginHistory } from "../../../hooks/useGetLoginHistory";
import { TableUI } from "../../../ui/form/TableUI";
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
      <div className="w-full">
      <TableUI className="w-full min-w-[44rem] @2xl:min-w-0">
        <thead>
          <tr>
            <th className="whitespace-nowrap">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <img src="/icons/security.svg" alt="" aria-hidden="true" className="h-4 w-4" />
                IP Address
              </span>
            </th>
            <th className="whitespace-nowrap">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <img src="/icons/monitor.svg" alt="" aria-hidden="true" className="h-4 w-4" />
                Device / Browser
              </span>
            </th>
            <th className="whitespace-nowrap">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <img src="/icons/date-time.svg" alt="" aria-hidden="true" className="h-4 w-4" />
                Date & Time
              </span>
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.history.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center">
                <div className="flex flex-col items-center justify-center px-4 text-center">
                  <img
                    src="/icons/records.svg"
                    alt=""
                    aria-hidden="true"
                    className="mb-3 h-8 w-8 sm:h-9 sm:w-9"
                  />
                  <p className="text-base font-semibold text-slate-500 sm:text-lg">
                    No login history found
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data?.history.map((entry, index) => (
              <tr key={index}>
                <td className="font-mono">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <img src="/icons/security.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                    {entry.ip}
                  </span>
                </td>
                <td>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <img src="/icons/monitor.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                    {parseUserAgent(entry.userAgent)}
                  </span>
                </td>
                <td className="whitespace-nowrap">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <img src="/icons/date-time.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                    {formatDate(entry.loginAt)}
                  </span>
                </td>
                <td>
                  <span className={`inline-flex items-center gap-2 whitespace-nowrap font-medium ${
                    entry.success ? "text-green-700" : "text-red-700"
                  }`}>
                    <img
                      src={entry.success ? "/icons/done.svg" : "/icons/pending.svg"}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0"
                    />
                    {entry.success ? "Success" : "Failed"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </TableUI>
      </div>
    <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 @sm:flex-row">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1 || isLoading}
        className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 @sm:w-auto"
      >
        Previous
      </button>
      <span className="text-sm text-slate-500">Page {data?.page} of {data?.totalPages}</span>
      <button
        onClick={() => setPage(p => Math.min(data?.totalPages ?? 1, p + 1))}
        disabled={page === data?.totalPages || isLoading}
        className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 @sm:w-auto"
      >
        Next
      </button>
    </div>
    </>
  );
};