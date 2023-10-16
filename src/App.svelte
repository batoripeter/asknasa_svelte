<script lang="ts">
  import { currentDate, type NasaResponse } from "./apiCall";
  import { onMount } from "svelte";
  import loadImage from "./apiCall";
  import Gallery from "./components/Gallery.svelte";

  export let newDate = "";
  let isLoading = false;
  let image: NasaResponse = {};

  onMount(async () => {
    isLoading=true
    const loadedImage = await loadImage(currentDate);
    isLoading = false;
    if (!image) return console.error();
    image = loadedImage;
  });

  const reload = async () => {
    isLoading=true
    const loadedImage = await loadImage(newDate);
    isLoading = false;
    if (!image) return console.error();
    image = loadedImage;
  };
</script>

<main>
  <section>

    <p>Select date!</p>
    <input type="date" on:change={() => reload()} bind:value={newDate} />

    <h1>APOD by NASA</h1>
    {#if isLoading}
    <p>Loading...</p>
    {/if}
    <img src={image.hdurl} alt={image.title} />
    <h2>Title: {image.title}</h2>
    <h3>Copyright: {image.copyright}</h3>
    <p>{image.explanation}</p>

</section>
  <Gallery />
</main>

<style>
section{
    margin:30px;
    padding: 20px;
    border:2px solid grey;
  }
  img {
    max-width: 50vw;
  }
</style>
