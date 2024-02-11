<script lang="ts">
  import http from "axios";
  import type { NasaResponse } from "../apiCall";
  import { fly } from 'svelte/transition';

  let isLoading = false;
  let visible = false;
  let imgsrc = "";
  let aDay = 86400000

  let startDate = new Date().toISOString().slice(0, 10);
  let endDate = new Date().toISOString().slice(0, 10);
  $: dayDifference = Math.floor(( Date.parse(endDate) - Date.parse(startDate) ) / 86400000)
  export let galleryImage: NasaResponse[] = [];



  const loadGallery = async (startDate: string, endDate: string) => {
    isLoading = true;
      let response = await http.get(
      "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&start_date=" +
        startDate +
        "&end_date=" +
        endDate
    );
    isLoading = false;
    if (!response) {
      return alert("Error in received data");
    }
    galleryImage = response.data;
    return galleryImage;
  };

  function openModal(imgurl: string) {
    visible = true;
    imgsrc = imgurl;
  }


</script>


<h1>Gallery of previous photos</h1>

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
  {:else if dayDifference >20}
  <p>Maximum 20 days difference!</p>

  {:else}
  <button on:click={() => loadGallery(startDate, endDate)}
    on:click={()=>(console.log(dayDifference))}>GO!</button>
{/if}

<div class="gallery">
  {#if isLoading}
    <p>Loading...</p>
  {/if}
  {#each galleryImage as image}
    <span>
      <img
        class="smallimage"
        src={image.hdurl}
        alt={image.title}
        on:click={() => {
          visible = !visible;
        }}
        on:click={() => openModal(image.hdurl)}
      />
    </span>

    {#if visible}
      <div id="myModal" transition:fly={{y: 800}}>
        <img
          class="modalimage"
          src={imgsrc}
          alt={image.title}
          on:click={() => {
            visible = !visible;
          }}
        />
      </div>
    {/if}
  {/each}
</div>

<br />

<style>
  #myModal {
    z-index: 9999999;
    background-color: black;
    position: fixed;
    width: 90vw;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

    .modalimage {
    max-height: 75vh;
    padding-top: 50px;
    margin: auto;
  }

  h1 {
    font-size: 5vw;
  }

  p {
    font-size: 2vw;
  }

  span {
    background-color: whitesmoke;
    padding: 10px;
    margin: 10px;
    border-radius: 10%;
  }
  .gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
  }

  .smallimage {
    width: 20vw;
    height: 20vh;
    object-fit: cover;
  }
</style>
