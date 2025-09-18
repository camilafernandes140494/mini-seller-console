import { useState, useEffect } from "react";
import type { Lead } from "../types/lead";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
}

export function LeadDetailPanel({ lead, onClose, onSave }: LeadDetailPanelProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
      setError("");
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    onSave({ ...lead, email, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="bg-white w-full max-w-md p-6 h-full overflow-y-auto shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Lead Detail</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <p>{lead.name}</p>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Company</label>
          <p>{lead.company}</p>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
