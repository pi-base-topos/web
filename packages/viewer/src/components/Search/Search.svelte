<script lang="ts">
  import { writable } from 'svelte/store'

  import type { Formula, Property } from '@/models'
  import urlSearchParam from '@/stores/urlSearchParam'
  import Examples from './Examples.svelte'
  import FormulaInput from '../Shared/Formula/Input'
  import Results from './Results.svelte'
  import Cite from '../Shared/Cite.svelte'

  const text = writable('')
  const rawFormula = writable('')
  const formula = writable<Formula<Property> | undefined>(undefined)

  // HACK: the existing formula input decides whether or not to show suggestions
  // by subscribing to changes to rawFormula. Because of this, there's no way to
  // distinguish between a user-typed change (which should trigger suggestions)
  // and one applied by selecting an example (which shouldn't, as it's known to
  // be complete). This gives us a gross way of manually masking those out.
  //
  // It really feels like we don't have the right architecture for this formula
  // state.
  const suggest = writable(false)
  rawFormula.subscribe(_ => ($suggest = true))
  function selectExample(example: string) {
    $rawFormula = example
    $suggest = false
  }

  urlSearchParam('text', text)
  urlSearchParam('q', rawFormula, () => ($suggest = false))

  let title: string
  $: if ($rawFormula.length > 0) {
    if ($text.length > 0) {
      title = `π-Base, Search for \`${$rawFormula}\` matching \`${$text}\``
    } else {
      title = `π-Base, Search for \`${$rawFormula}\``
    }
  } else {
    if ($text.length > 0) {
      title = `π-Base, Search matching \`${$text}\``
    } else {
      title = 'π-Base, Explore'
    }
  }
</script>

<div class="row">
  <div class="col-md-4">
    <div class="form-group">
      <label class="form-label" for="text">Filter by Text</label>
      <input
        class="form-control"
        name="text"
        placeholder="e.g. realizability"
        bind:value={$text}
      />
    </div>
    <div class="form-group">
      <label class="form-label" for="formula">Filter by Formula</label>
      <FormulaInput
        name="q"
        placeholder="e.g. WLPO + ~LPO"
        raw={rawFormula}
        suggest={$suggest}
        {formula}
      />
    </div>
  </div>
  <div class="col-md-8">
    {#if $text || $formula}
      <Results text={$text} formula={$formula} />
    {:else}
      <Examples select={selectExample} />
    {/if}
  </div>
</div>
<div>
  {#key [$rawFormula, $text]}<Cite {title} />{/key}
</div>
