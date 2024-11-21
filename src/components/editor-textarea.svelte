<script lang="ts">
  import '@fontsource-variable/montserrat'

  export let onChange: (e: Event) => void = () => {};
  export let value: string = '';
</script>

<label>
  <textarea
    class="bg-black/25 w-full h-[92%] border-0 resize-none focus:outline-none rounded-lg p-2"
    placeholder="Escribe aquí tu nota..."
    on:input={onChange}
    bind:value={value}
  ></textarea>
</label>

<style>
  textarea {
    font-family: 'Montserrat Variable', sans-serif;
  }
</style>
