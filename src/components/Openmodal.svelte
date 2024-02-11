<script lang="ts">
import { fly } from 'svelte/transition'
import Gallery from './Gallery.svelte';
let images

</script>

<main>
<div class="overlay">
    <div class="popup" transition:fly={{ duration: 700, y: -1000, opacity: 0.5}}>
      <img src={image.hdurl} alt={image.title} on:click={() => {visible = !visible}}>
    </div>

  </div>

</main>

<style>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  max-width: 80%;
}

</style>