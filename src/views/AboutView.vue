<template>
    <main class="container text-white">
        <div class="pt-2 mb-8">ABOUT</div>
        <div class="text-center">
            <h1 class="text-2xl font-semibold mb-4">Memory Game</h1>
    
            <div class="grid grid-cols-4 gap-4">
                <input type="checkbox" id="checkbox1" class="hidden">
                <label for="checkbox1" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition-transform hover:scale-105"></label>
    
                <input type="checkbox" id="checkbox2" class="hidden">
                <label for="checkbox2" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer transition-transform hover:scale-105"></label>
    
                <input type="checkbox" id="checkbox3" class="hidden">
                <label for="checkbox3" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer transition-transform hover:scale-105"></label>
    
                <input type="checkbox" id="checkbox4" class="hidden">
                <label for="checkbox4" class="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer transition-transform hover:scale-105"></label>
    
                <!-- Add more pairs of checkboxes and labels as needed -->
            </div>
        </div>
        <input type="text" class="pt-2 mb-5 w-full mt-5 border-2 rounded-lg" placeholder="Write All Za Color Above Here 👍">
        <button @click="nothingHappenClick" type="button" class="text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
    </main>
</template>

<script setup>
const nothingHappenClick = () => {
    alert("nothingHappenClick");
}
</script>

<style scoped>
input:checked + label {
    background-color: #718096; /* Change color when checked */
}
</style>