const API_URL = "http://localhost:3000/categories";

export async function getCategoriesByParentId(parentId) {
  const response = await fetch(`${API_URL}?parentId=${parentId}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
}