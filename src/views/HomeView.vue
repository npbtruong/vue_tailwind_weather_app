<template>
  <main class="container text-white">
    <div class="pt-4 mb-8">HOME
      <input 
      type="text" 
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city or state" 
      class="text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-900"
      />  
      <ul v-if="mapboxSearchResults" class=" bg-weather-secondary text-white w-full shadow-md p-2 top-67 border-gray-300 rounded-md">

        <p v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>

        <p v-if="!serverError && mapboxSearchResults.length === 0">
          No resulst match your query, try a different term
        </p>

        <template v-else>
          <li v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id" class="py-2 cursor-pointer"
          @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>

      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList></CityList>
          <template #fallback>
            <CityCardSkeleton/>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(',');
  
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ",""), city: city},
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview:true,
    },
  })

};

const mapboxAPIKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);//lazy search
  queryTimeout.value = setTimeout(async () => {
    if(searchQuery.value !== '') {
        try {
          const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
          mapboxSearchResults.value = result.data.features;
          console.log(mapboxSearchResults.value);
        } catch (error) {
          searchError.value=true;
        }
        return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>