'use client'
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import { getCategoriesByType } from '@/services/category';
import { CategoryType } from '@/enums/category';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesByType(CategoryType.COURSE);
        setCategories(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Category fetch failed');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
