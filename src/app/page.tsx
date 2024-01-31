'use client';
import Todolist from '@/components/Todolist';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Todolist />
		</QueryClientProvider>
	);
}
