import { useRouter } from "next/router";

function BlogPostsPage() {
	console.log(useRouter().query);
	return (
		<div>
			<h1>The Blog Posts</h1>
		</div>
	);
}

export default BlogPostsPage;
