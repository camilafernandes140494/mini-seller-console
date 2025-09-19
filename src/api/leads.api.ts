import leadsData from "../data/leads.json";
import type { Lead } from "../types/lead";
import type { Opportunity } from "../types/opportunity";

// simula atraso de rede
const simulateDelay = (ms = 800) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const leads = [...(leadsData as Lead[])];

export async function getLeads(): Promise<Lead[]> {
	await simulateDelay();
	return leads;
}

export async function getOpportunities(): Promise<Opportunity[]> {
	await simulateDelay();
	return [];
}
export async function updateLead(updated: Lead): Promise<Lead> {
	await simulateDelay();

	const index = leads.findIndex((l) => l.id === updated.id);
	if (index !== -1) {
		leads[index] = updated;
	}

	return updated;
}

export async function createOpportunityFromLead(lead: Lead) {
	await simulateDelay();

	// simula criar oportunidade
	return {
		id: Date.now(),
		name: lead.name,
		accountName: lead.company,
		stage: "Prospecting",
		amount: Math.floor(Math.random() * 10000) + 1000, // valor fake
	};
}
