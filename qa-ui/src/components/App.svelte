<script>
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import Courses from './Courses.svelte';
  export let qa_url;
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Courses {qa_url} />
</QueryClientProvider>
