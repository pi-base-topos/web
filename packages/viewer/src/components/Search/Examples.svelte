<script lang="ts">
  export let select: (search: string) => void

  const examples = [
    {
      label: 'Boolean toposes',
      search: 'Boolean',
    },
    {
      label: 'A Common Non-Theorem',
      search: 'WLPO + ~LPO',
    },
  ]
</script>

<p><b>Not sure where to start?</b> Try one of the following searches:</p>
{#each examples as { label, search } (label)}
  <article>
    <h5>{label}</h5>
    <pre
      class="example"
      on:click={() => select(search)}
      on:keydown={() => select(search)}>{search}</pre>
  </article>
{/each}
