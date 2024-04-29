<script lang="ts">
  import Title from '@/components/Shared/Title.svelte'
  import { List } from '@/components/Spaces'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<Title title="Toposes" />

<h1>Toposes</h1>

<List spaces={data.spaces} />
