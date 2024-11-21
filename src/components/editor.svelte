<script lang="ts">
  import ButtonView from './button-view.svelte'
  import ButtonEditor from './button-editor.svelte'
  import EditorTextarea from './editor-textarea.svelte'
  import ViewMarkdown from './view-markdown.svelte'

  type EditorMode = 'editor' | 'view'
  let mode: EditorMode = $state('editor')

  let note: string = $state('')
</script>

<article class="ml-2 w-full border-r border-neutral-600 h-screen pr-2">
  <header class="mt-3">
    {#if mode === 'editor'}
      <ButtonView onClick={() => mode = 'view'}/>
    {:else}
      <ButtonEditor onClick={() => mode = 'editor'}/>
    {/if}
  </header>

  {#if mode === 'editor'}
    <EditorTextarea onChange={(e: Event) => note = (e.target as HTMLTextAreaElement).value} value={note}/>
  {:else}
    <ViewMarkdown source={note}/>
  {/if}
</article>
