import { useState } from "react";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { LeadList } from "../components/LeadList";
import { OpportunitiesTable } from "../components/OpportunitiesTable";
import type { Lead } from "../types/lead";

export function Dashboard() {
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

	return (
		<div className="p-6 grid grid-cols-2 gap-6">
			<div>
				<LeadList onSelectLead={setSelectedLead} />
			</div>
			<div>
				<OpportunitiesTable />
			</div>

			<LeadDetailPanel
				lead={selectedLead}
				onClose={() => setSelectedLead(null)}
				onSave={() => {}}
			/>
		</div>
	);
}
