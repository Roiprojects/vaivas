"use client";

import React, { useState } from "react";
import {
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Plus,
  ArrowRight,
  ExternalLink,
  X,
  Loader2,
  UserCheck,
} from "lucide-react";

interface RecruitmentDataProps {
  requirements: any[];
  candidates: any[];
  matches: any[];
}

export default function AdminRecruitmentManager({
  requirements: initialReqs,
  candidates: initialCandidates,
  matches: initialMatches,
}: RecruitmentDataProps) {
  const [activeTab, setActiveTab] = useState<"REQUIREMENTS" | "CANDIDATES" | "MATCHES">("REQUIREMENTS");
  const [requirements, setRequirements] = useState(initialReqs);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [matches, setMatches] = useState(initialMatches);

  // Match Modal State
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedReqId, setSelectedReqId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [recruiterNotes, setRecruiterNotes] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);

  // Interview Schedule Modal
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [targetMatchId, setTargetMatchId] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewMode, setInterviewMode] = useState("Virtual / Google Meet");
  const [interviewRound, setInterviewRound] = useState("Technical Assessment");
  const [interviewerName, setInterviewerName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [interviewLoading, setInterviewLoading] = useState(false);

  // Candidate search
  const [candidateSearch, setCandidateSearch] = useState("");

  const handleRequirementStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "REQUIREMENT", id, status: newStatus }),
      });
      if (res.ok) {
        setRequirements(requirements.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMatchStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "MATCH", id, status: newStatus }),
      });
      if (res.ok) {
        setMatches(matches.map((m) => (m.id === id ? { ...m, status: newStatus } : m)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMatchLoading(true);
    try {
      const res = await fetch("/api/admin/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_MATCH",
          employerRequirementId: selectedReqId,
          candidateId: selectedCandidateId,
          recruiterNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMatches([data.match, ...matches]);
      setMatchModalOpen(false);
      setActiveTab("MATCHES");
    } catch (err: any) {
      alert(err.message || "Failed to create candidate match");
    } finally {
      setMatchLoading(false);
    }
  };

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterviewLoading(true);
    try {
      const res = await fetch("/api/admin/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SCHEDULE_INTERVIEW",
          candidateMatchId: targetMatchId,
          scheduledAt: interviewDate,
          mode: interviewMode,
          round: interviewRound,
          interviewerName,
          meetingLink,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Refresh matches local state
      setMatches(
        matches.map((m) =>
          m.id === targetMatchId
            ? {
                ...m,
                status: "INTERVIEW_SCHEDULED",
                interviews: [data.interview, ...(m.interviews || [])],
              }
            : m
        )
      );
      setInterviewModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to schedule interview");
    } finally {
      setInterviewLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    return (
      c.fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      (c.preferredRole && c.preferredRole.toLowerCase().includes(candidateSearch.toLowerCase())) ||
      (c.keySkills && c.keySkills.toLowerCase().includes(candidateSearch.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("REQUIREMENTS")}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
            activeTab === "REQUIREMENTS"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Employer Requirements ({requirements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("MATCHES")}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
            activeTab === "MATCHES"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Candidate-Role Matches ({matches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("CANDIDATES")}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
            activeTab === "CANDIDATES"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Unified Talent Pool ({candidates.length})</span>
        </button>
      </div>

      {/* 1. EMPLOYER REQUIREMENTS TAB */}
      {activeTab === "REQUIREMENTS" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6">Company / Contact</th>
                    <th className="py-3.5 px-4">Open Role</th>
                    <th className="py-3.5 px-4">Experience / Skills</th>
                    <th className="py-3.5 px-4">Timeline</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Matched Talent</th>
                    <th className="py-3.5 px-6 text-right">Match Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requirements.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 text-sm">{req.companyName}</div>
                        <div className="text-[11px] text-slate-500">
                          {req.contactPerson} • {req.email}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{req.jobRole}</div>
                        <div className="text-[10px] text-slate-500">
                          {req.location} • {req.openings} opening{req.openings > 1 ? "s" : ""}
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-medium text-slate-700">{req.experience}</div>
                        <div className="text-[10px] text-slate-500 truncate">{req.skills}</div>
                      </td>

                      <td className="py-4 px-4 text-slate-600">{req.hiringTimeline}</td>

                      <td className="py-4 px-4">
                        <select
                          value={req.status}
                          onChange={(e) => handleRequirementStatus(req.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                            req.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : req.status === "FILLED"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : req.status === "ON_HOLD"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_REVIEW">IN_REVIEW</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="ON_HOLD">ON_HOLD</option>
                          <option value="FILLED">FILLED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-mono font-bold text-slate-800">
                          {req.matches?.length || 0} candidates
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedReqId(req.id);
                            setMatchModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Match Candidate</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. CANDIDATE-ROLE MATCHES PIPELINE TAB */}
      {activeTab === "MATCHES" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6">Candidate</th>
                    <th className="py-3.5 px-4">Employer Requirement</th>
                    <th className="py-3.5 px-4">Pipeline Stage (Per Role)</th>
                    <th className="py-3.5 px-4">Latest Interview Round</th>
                    <th className="py-3.5 px-4">Resume</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matches.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No active candidate-role matches yet. Click &ldquo;Match Candidate&rdquo; from the Requirements tab.
                      </td>
                    </tr>
                  ) : (
                    matches.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-sm">
                            {m.candidate?.fullName}
                          </div>
                          <div className="text-[11px] text-slate-500">{m.candidate?.email}</div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-800">
                            {m.employerRequirement?.companyName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {m.employerRequirement?.jobRole}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <select
                            value={m.status}
                            onChange={(e) => handleMatchStatus(m.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                              m.status === "JOINED"
                                ? "bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold"
                                : m.status === "OFFERED" || m.status === "SELECTED"
                                ? "bg-blue-100 text-blue-900 border-blue-300"
                                : m.status === "INTERVIEW_SCHEDULED"
                                ? "bg-purple-100 text-purple-900 border-purple-300"
                                : m.status === "REJECTED" || m.status === "WITHDRAWN"
                                ? "bg-rose-100 text-rose-900 border-rose-300"
                                : "bg-amber-50 text-amber-900 border-amber-200"
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="SCREENING">SCREENING</option>
                            <option value="SHORTLISTED">SHORTLISTED</option>
                            <option value="INTERVIEW_SCHEDULED">INTERVIEW_SCHEDULED</option>
                            <option value="SELECTED">SELECTED</option>
                            <option value="OFFERED">OFFERED</option>
                            <option value="JOINED">JOINED (Confirmed)</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="WITHDRAWN">WITHDRAWN</option>
                          </select>
                        </td>

                        <td className="py-4 px-4">
                          {m.interviews && m.interviews.length > 0 ? (
                            <div>
                              <div className="font-semibold text-slate-800">
                                {m.interviews[0].round}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {new Date(m.interviews[0].scheduledAt).toLocaleDateString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400">None scheduled</span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          {m.candidate?.resumeUrl ? (
                            <a
                              href={`/api/admin/resumes/${m.candidate.resumeUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                            >
                              <Download className="w-3 h-3" />
                              <span>Resume</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">No file</span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setTargetMatchId(m.id);
                              setInterviewModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Schedule Round</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. UNIFIED TALENT POOL TAB */}
      {activeTab === "CANDIDATES" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by name, skill, or role..."
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <span className="text-xs text-slate-500">
              {filteredCandidates.length} profile{filteredCandidates.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6">Candidate</th>
                    <th className="py-3.5 px-4">Preferred Role</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Skills</th>
                    <th className="py-3.5 px-4">Resume</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                        <div className="text-[11px] text-slate-500">
                          {c.email} • {c.phone}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {c.preferredRole || "Open"}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {c.totalExperience || "Not specified"}
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate text-slate-500">
                        {c.keySkills || "General"}
                      </td>
                      <td className="py-4 px-4">
                        {c.resumeUrl ? (
                          <a
                            href={`/api/admin/resumes/${c.resumeUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:underline"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>
                        ) : (
                          <span className="text-slate-400">No file</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedCandidateId(c.id);
                            setMatchModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors"
                        >
                          Match to Opening
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MATCH CANDIDATE MODAL */}
      {matchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Match Candidate to Role</h3>
              <button onClick={() => setMatchModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Employer Requirement <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedReqId}
                  onChange={(e) => setSelectedReqId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                >
                  <option value="">Select Company & Role...</option>
                  {requirements.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.companyName} — {r.jobRole} ({r.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Candidate from Talent Pool <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                >
                  <option value="">Select Candidate...</option>
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.preferredRole || "Candidate"}) — {c.totalExperience || "Exp"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recruiter Screening Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes on candidate qualification, compensation alignment..."
                  value={recruiterNotes}
                  onChange={(e) => setRecruiterNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={matchLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5"
                >
                  {matchLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Match</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {interviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Schedule Interview Round</h3>
              <button onClick={() => setInterviewModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date & Time <span className="text-rose-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mode</label>
                  <select
                    value={interviewMode}
                    onChange={(e) => setInterviewMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="Virtual / Google Meet">Virtual / Google Meet</option>
                    <option value="Virtual / Zoom">Virtual / Zoom</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Telephonic">Telephonic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Round</label>
                  <input
                    type="text"
                    value={interviewRound}
                    onChange={(e) => setInterviewRound(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interviewer Name & Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Varma (Engineering VP)"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Meeting Link or Location
                </label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInterviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={interviewLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 flex items-center gap-1.5"
                >
                  {interviewLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save & Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
