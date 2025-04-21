import { api } from "@/lib/api"
import { CategoryResponse } from "@/types/category";

export async function getCategoriesByType(type: string): Promise<CategoryResponse[]> {
    try {
        const response = await api.get(`category/type/${type}`);

        return response.data;
    } catch (error) {
        throw error
    }
}