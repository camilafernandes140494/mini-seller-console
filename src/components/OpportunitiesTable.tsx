import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../api/leads.api";
import type { Opportunity } from "../types/opportunity";
import { type Column, Table } from "./Table";

export function OpportunitiesTable() {
	const columns: Column<Opportunity>[] = [
		{ key: "name", label: "Name" },
		{ key: "id", label: "ID" },
		{ key: "stage", label: "Stage" },
		{ key: "amount", label: "Amount" },
		{
			key: "accountName",
			label: "AccountName",
		},
	];

	const {
		data: opportunitiesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["opportunities"],
		queryFn: getOpportunities,
	});

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Opportunities</h1>

			<Table columns={columns} data={opportunitiesData || []} />
		</div>
	);
}
