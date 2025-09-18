import { useState, useMemo } from "react";
import leadsData from "../data/leads.json";
import type { Lead } from "../types/lead";

export function LeadList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  const filteredLeads = useMemo(() => {
    let filtered = leadsData as Lead[];

    // Search by name or company
    if (search) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase()) ||
          lead.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Sort by score
    filtered.sort((a, b) =>
      sortDesc ? b.score - a.score : a.score - b.score
    );

    return filtered;
  }, [search, statusFilter, sortDesc]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leads List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or company"
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
        </select>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={() => setSortDesc(!sortDesc)}
        >
          Sort by Score {sortDesc ? "⬇" : "⬆"}
        </button>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Company</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Source</th>
              <th className="border p-2 text-left">Score</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border p-2">{lead.name}</td>
                  <td className="border p-2">{lead.company}</td>
                  <td className="border p-2">{lead.email}</td>
                  <td className="border p-2">{lead.source}</td>
                  <td className="border p-2">{lead.score}</td>
                  <td className="border p-2 capitalize">{lead.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border p-4 text-center text-gray-500"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
