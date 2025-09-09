import React from 'react';
import axios from 'axios';
import { Product } from '@/../utility/ProductsInterfce';
import Card from '../components/Card';
import { headers } from 'next/headers';
import api from '@/lib/axios';

export const dynamic = 'force-dynamic'; 

interface SearchPageProps {
  searchParams: Promise<{
    word?: string;
  }>;
}

const getSearchData = async (word: string): Promise<Product[]> => {
  if (!word.trim()) return [];

  try {
    const headersList = await headers();
    const cookie = headersList.get('cookie') || '';
    const token = cookie.split('userToken=')[1]?.split(';')[0] || '';

    const res = await api.post(
      "/home/search",
      { word },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );

    return res.data?.data || [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return [];
      }
      console.error('API error:', err.response?.status, err.response?.data);
    } else if (err instanceof Error) {
      console.error('Unexpected error:', err.message);
    } else {
      console.error('Unknown error:', err);
    }

    return [];
  }
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { word = '' } = await searchParams;
  const results = await getSearchData(word);

  return (
    <div className="container mx-auto p-4">
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405M19.5 19.5A7.5 7.5 0 1011 4.5a7.5 7.5 0 008.5 15z"
            />
          </svg>
          <p className="text-lg font-medium">No results found for this search.</p>
          <p className="text-sm text-gray-500 mt-2">Try another keyword or check for typos.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item, index) => (
            <Card key={index} product={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
