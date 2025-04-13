export default async function ProductList({
	searchParams,
}: {
	searchParams?: Promise<{
		page?: string;
		categoryId?: string;
		subcategory?: string;
		search?: string;
	}>;
}) {
	return <p>Product List</p>;
}
