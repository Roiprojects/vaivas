"use client";

import React, { useState } from "react";
import { History, Search, Filter, RefreshCw, Clock, User, ShieldAlert } from "lucide-react";

interface LogItem {
  id: string;
  userId: string | null;
  userName: string | null;
  action: string;
  module: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  adminUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

interface AdminActivityLogsViewerProps {
  initialLogs: LogItem[];
}

export default function AdminActivityLogsViewer({ initialLogs }: AdminActivityLogsViewerProps) {
  const [logs, setLogs] = useState<LogItem[]>(initialLogs);
  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedModule !== "ALL") params.append("module", selectedModule);
      if (search) params.append("search", search);
      const res = await fetch(`/api/admin/activity-logs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (mod: string) => {
    setSelectedModule(mod);
  };

  const modules = ["ALL", "JOBS", "APPLICATIONS", "RECRUITMENT", "CONTENT", "SETTINGS", "USERS", "ADS", "ENQUIRIES"];

  const filteredLogs = logs.filter((log) => {
    const matchesModule = selectedModule === "ALL" || log.module === selectedModule;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      log.action.toLowerCase().includes(q) ||
      (log.userName && log.userName.toLowerCase().includes(q)) ||
      (log.details && log.details.toLowerCase().includes(q));
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Platform Activity & Audit Logs</h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Real-time chronological record of administrative actions, status updates, and CMS modifications.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Feed
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by action, user, or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Module Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Modules:
          </span>
          {modules.map((mod) => (
            <button
              key={mod}
              onClick={() => handleFilterChange(mod)}
              className={`px-3 py-1 rounded-full font-medium transition ${
                selectedModule === mod
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Log Feed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Module</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Administrator</th>
                <th className="px-6 py-3">Description / Details</th>
                <th className="px-6 py-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No activity logs recorded matching these criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {new Date(log.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-blue-600">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-medium text-slate-800">
                          {log.userName || log.adminUser?.name || "System Automated"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-xs text-slate-600">
                      {log.details || "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                Audit Log Details
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold uppercase">Action ID</span>
                <p className="font-mono text-slate-800 break-all">{selectedLog.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Module</span>
                  <p className="font-semibold text-slate-800">{selectedLog.module}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Action</span>
                  <p className="font-mono font-semibold text-blue-600">{selectedLog.action}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Administrator</span>
                  <p className="font-semibold text-slate-800">
                    {selectedLog.userName || selectedLog.adminUser?.name || "System"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Exact Time</span>
                  <p className="text-slate-700">
                    {new Date(selectedLog.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold uppercase">Detailed Context</span>
                <div className="mt-1 p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {selectedLog.details || "No extended metadata logged"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
