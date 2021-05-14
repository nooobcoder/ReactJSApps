import { Router, useRouter } from "next/router";

function ClientProjectsPage() {
	const router = useRouter();
	console.log(router.query);

	const loadProjectHandler = () => {
		// Load Data...
		// router.push(`/clients/ankur/projecta`);
		router.push({
			pathname: "/clients/[id]/[clientprojectid]",
			query: { id: "ankur", clientprojectid: "projecta" },
		});
	};

	return (
		<div>
			<h1>The Projects of a given Client.</h1>
			<button onClick={loadProjectHandler}>Load Project A</button>
		</div>
	);
}

export default ClientProjectsPage;
