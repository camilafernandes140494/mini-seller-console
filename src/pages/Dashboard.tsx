import { useEffect, useState } from "react";
import leadsData from "../data/leads.json";
import type { Lead } from "../types/lead";
import type { Opportunity } from "../types/opportunity";
import { OpportunitiesTable } from "../components/OpportunitiesTable";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { LeadList } from "../components/LeadList";

export function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    // Simula delay de carregamento
    setTimeout(() => {
      setLeads(leadsData);
    }, 500);
  }, []);

  const handleConvert = (lead: Lead) => {
    const newOpp: Opportunity = {
      id: opportunities.length + 1,
      name: lead.name,
      stage: "Prospecting",
      accountName: lead.company,
    };
    setOpportunities([...opportunities, newOpp]);
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      <div>
        {/* <h1 className="text-2xl font-bold mb-4">Leads</h1> */}
        {/* <LeadList leads={leads} onSelectLead={setSelectedLead} /> */}
        <LeadList />
 
      </div>
      <div>
        {/* <h1 className="text-2xl font-bold mb-4">Opportunities</h1> */}
        <OpportunitiesTable opportunities={opportunities} />

      </div>

          <LeadDetailPanel
             lead={selectedLead}
        onClose={() => setSelectedLead(null)}
            onSave={() => {}}
      />
    </div>
  );
}
