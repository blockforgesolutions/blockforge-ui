import { api } from "@/lib/api"
import { Category } from "@/types/category";

export async function getCategoriesByType(type: string): Promise<Category[]> {
    try {
        const response = await api.get(`category/type/${type}`);

        return response.data;
    } catch (error) {
        throw error
    }
}