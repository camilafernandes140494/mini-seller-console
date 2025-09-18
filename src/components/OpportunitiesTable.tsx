import type { Opportunity } from "../types/opportunity";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Stage</th>
              <th className="border p-2 text-left">Amount</th>
              <th className="border p-2 text-left">Account Name</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.length > 0 ? (
              opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-gray-50">
                  <td className="border p-2">{opp.name}</td>
                  <td className="border p-2 capitalize">{opp.stage}</td>
                  <td className="border p-2">
                    {opp.amount ? `$${opp.amount.toFixed(2)}` : "-"}
                  </td>
                  <td className="border p-2">{opp.accountName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border p-4 text-center text-gray-500">
                  No opportunities yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
