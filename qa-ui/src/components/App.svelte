<script>
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import Entry from './Entry.svelte';

  import pLimit from 'p-limit';

  export let qa_url, llm_url;
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Entry {qa_url} {llm_url} {pLimit} />
</QueryClientProvider>
