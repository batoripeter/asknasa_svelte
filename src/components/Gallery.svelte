<script lang="ts">
  import http from "axios";
  import type { NasaResponse } from "../apiCall";
  let isLoading = false
  

  let startDate = new Date().toISOString().slice(0, 10);
  let endDate = new Date().toISOString().slice(0, 10);
  let galleryImage: NasaResponse[] = [];

  const loadGallery = async (startDate: string, endDate: string) => {
    isLoading = true
    const response = await http.get(
      "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&start_date=" + startDate + "&end_date=" + endDate);
      isLoading=false
    if (!response) {
      return alert("Error in received data");
    }
    galleryImage = response.data;
    return galleryImage;
  };
</script>

<h2>Gallery of previous photos</h2>

<label
  >Select start date!
  <input type="date" bind:value={startDate} /></label>
<br />
<label
  >Select end date!
  <input type="date" bind:value={endDate} /></label>

<br />
{#if startDate > endDate}
<p>StartDate must be before EndDate</p>
{:else} 
<button on:click={() => loadGallery(startDate, endDate)}>GO!</button>
{/if}

<div class="gallery">
  {#if isLoading}
  <p>Loading...</p>
  {/if}
  {#each galleryImage as image}
   <span> <img src={image.hdurl} alt={image.title}/>
<p>{image.title}</p></span>
    <!-- <h3>
    {#if (image.copyright)}
    Copyright: {image.copyright}
    {/if}
</h3>
<p>{image.explanation}</p>
<p>{image.date}</p>-->
  {/each}
</div>

<br />
<style>
  span {
    background-color: whitesmoke;
    padding: 20px;
    margin: 10px;
    border-radius: 10%;
  }
  .gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  img {
    width:400px;
    height:400px;
    object-fit: cover;
  }
</style>
