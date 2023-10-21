<script>
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import Courses from './Courses.svelte';
  import { marked } from 'marked';

  import pLimit from 'p-limit';

  export let qa_url;
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Courses {qa_url} {marked} {pLimit}/>
</QueryClientProvider>
