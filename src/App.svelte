<script lang="ts">
  import { currentDate, type NasaResponse } from "./apiCall";
  import { onMount } from "svelte";
  import loadImage from "./apiCall";
  import Gallery from "./components/Gallery.svelte";


  export let newDate = "";
  let isLoading = false;
  let image: NasaResponse | null = null;

  onMount(async () => {
    isLoading = true;
    const loadedImage = await loadImage(currentDate);
    isLoading = false;
    if (loadedImage)
      image = loadedImage;
    else return console.log("error");
  });

  const reload = async () => {
    isLoading = true;
    const loadedImage = await loadImage(newDate);
    isLoading = false;
    if (loadedImage)
      image = loadedImage;
    else return console.log("error")
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

    {#if newDate < currentDate && image}
    <img src={image.hdurl} alt={image.title} />
    <h2>Title: {image.title}</h2>
    <h3>Copyright: {image.copyright}</h3>
    <p>{image.explanation}</p>
     {:else} <p>No pictures from the future, select another date!</p>
    {/if}
  </section>

  <Gallery />
  
</main>

<style>
  h1 {
    font-size: 5vw;
  }
  h2 {
    font-size: 4vw;
  }
  p {
    font-size: 2vw;
  }

  section {
    margin: 3rem;
    padding: 3rem;
    border: 2px solid grey;
  }
  img {
    max-width: 50vw;
  }
</style>
