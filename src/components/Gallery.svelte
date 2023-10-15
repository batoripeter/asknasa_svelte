<script lang="ts">
import http from "axios";
  import type { NasaResponse } from "../apiCall";

let startDate = new Date().toISOString().slice(0, 10);
let endDate = new Date().toISOString().slice(0, 10);
let galleryImage:NasaResponse[] = []

const loadGallery = async (startDate:string,endDate:string) => {
  const response = await http.get(
    "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&start_date="+ startDate +"&end_date="+endDate);

  if (!response) {
    return alert("Error in received data");
  }
  galleryImage = response.data
  return galleryImage
};
</script>


<hr />
<h2>
    Gallery of previous photos
</h2>

<label>Select start date!
<input type="date" bind:value={startDate} /></label>
<br />
<label>Select end date!
<input type="date"  bind:value={endDate} /></label>

<br />
<button on:click={()=>loadGallery(startDate,endDate)}>GO!</button>

{#each galleryImage as image}
<div class="gallery">
<img src={image.hdurl} alt={image.title} />
<h2>Title: {image.title}</h2>
<h3>
    {#if (image.copyright)}
    Copyright: {image.copyright}
    {/if}
</h3>
<p>{image.explanation}</p>
<p>{image.date}</p>
<hr />
</div>
{/each}

<br />

<style>
img {
    max-height: 45vh;
    }

  </style>