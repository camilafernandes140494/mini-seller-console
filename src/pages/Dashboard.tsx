import { useState } from "react";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { LeadList } from "../components/LeadList";
import type { Lead } from "../types/lead";

export function Dashboard() {
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

	return (
		<>
			<LeadList onSelectLead={setSelectedLead} />

			<LeadDetailPanel
				lead={selectedLead}
				onClose={() => setSelectedLead(null)}
				onSave={() => {}}
			/>
		</>
	);
}
