<script lang="ts">
  import type { Space } from 'src/models'
  import { Aliases, Link, References, Tabs, Typeset } from '../Shared'
  import Counterexamples from './Counterexamples.svelte'
  import Properties from './Properties.svelte'

  export let space: Space
  export let tab: 'properties' | 'theorems' | 'references'
  export let rel: string | undefined = undefined

  const tabs = ['properties', 'theorems', 'references'] as const
</script>

<h3>Topos <Link.Space {space} content="idLong" /></h3>

<h1>
  <Typeset body={space.name} />
  {#if space?.aliases}
    <Aliases aliases={space.aliases} />
  {/if}
</h1>

<section class="description">
  <Typeset body={space.description} />
</section>

<Tabs {tabs} {tab} {rel} />

{#if tab === 'properties'}
  <Properties {space} />
{:else if tab === 'theorems'}
  <Counterexamples {space} />
{:else if tab === 'references'}
  <References references={space.refs} />
{/if}
