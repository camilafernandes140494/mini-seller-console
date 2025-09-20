import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getLeads } from "../api/leads.api";
import type { Lead } from "../types/lead";
import { type Column, Table } from "./Table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LeadListProps {
	onSelectLead: (lead: Lead) => void;
}

export function LeadList({ onSelectLead }: LeadListProps) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sortDesc, setSortDesc] = useState(true);

	const {
		data: leads,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["leads"],
		queryFn: getLeads,
	});

	const columns: Column<Lead>[] = [
		{ key: "name", label: "Name" },
		{ key: "company", label: "Company" },
		{ key: "email", label: "Email" },
		{ key: "score", label: "Score" },
		{
			key: "status",
			label: "Status",
			render: (lead) => <span className="capitalize">{lead.status}</span>,
		},
	];
	const filteredLeads = useMemo(() => {
		if (!leads) return [];

		let filtered = [...leads];

		if (search) {
			filtered = filtered.filter(
				(lead) =>
					lead.name.toLowerCase().includes(search.toLowerCase()) ||
					lead.company.toLowerCase().includes(search.toLowerCase()),
			);
		}

		if (statusFilter) {
			filtered = filtered.filter((lead) => lead.status === statusFilter);
		}

		filtered.sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

		return filtered;
	}, [leads, search, statusFilter, sortDesc]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Leads</h1>
			<div className="flex flex-wrap gap-4 mb-6">
				<input
					type="text"
					placeholder="Search by name or company"
					className="
      border border-gray-300 dark:border-gray-600 
      rounded-md px-4 py-2 
      flex-1 min-w-[200px] 
      focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 
      placeholder-gray-400 dark:placeholder-gray-500
      transition
    "
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select
					className="
      border border-gray-300 dark:border-gray-600 
      rounded-md px-4 py-2 
      focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400
      transition
    "
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
					className="
      bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 
      text-white px-4 py-2 rounded-md 
      transition
      flex items-center gap-2
    "
					onClick={() => setSortDesc(!sortDesc)}
					type="button"
				>
					Sort by Score
					{sortDesc ? (
						<ChevronDown className="w-4 h-4" />
					) : (
						<ChevronUp className="w-4 h-4" />
					)}
				</button>
			</div>
			<Table
				columns={columns}
				data={filteredLeads || []}
				onRowClick={onSelectLead}
				isLoading={isLoading}
				isError={isError}
			/>
		</div>
	);
}
