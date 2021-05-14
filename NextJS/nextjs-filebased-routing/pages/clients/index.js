import Link from "next/link";

function ClientsPage() {
	const clients = [
		{ id: "ankur", name: "Ankur Paul" },
		{ id: "aishi", name: "Aishi Paul" },
	];

	return (
		<div>
			<h1>The Clients Page</h1>
			<ul>
				{clients.map((client) => (
					// <Link key={client.id} href={`/clients/${client.name}`}>
					<Link
						key={client.id}
						href={{
							pathname: `/clients/[id]`,
							query: { id: client.id },
						}}
					>
						{client.name}
					</Link>
				))}
			</ul>
		</div>
	);
}

export default ClientsPage;
