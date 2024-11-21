<script lang="ts">
  import EyeIcon from './icons/eye-icon.svelte'

  export let onClick = () => {
  };
</script>

<button
  type="button"
  class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2 h-8 w-30"
  on:click={onClick}
>
  <EyeIcon/>
  Modo Vista
</button>
