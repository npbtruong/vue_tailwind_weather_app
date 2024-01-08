<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)"></CityCard>
    </div>

    <p v-if="savedCities.length === 0">
        No locations added 🤔. To start tracking a location, search in
        the field above.☝️
    </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);

// getCities Hàm này có nhiệm vụ lấy dữ liệu về thời tiết từ OpenWeatherMap API cho các thành phố đã lưu trữ.
const getCities = async () => {
    //nếu có dữ liệu đã lưu trong localStorage, nó sẽ được lấy và gán cho savedCities.value.
   if (localStorage.getItem('savedCities')) { 
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
   };

   //Sau đó, nó sử dụng axios để tạo một mảng các yêu cầu HTTP để lấy dữ liệu thời tiết từ API cho từng thành phố.
   const requests = [];
   savedCities.value.forEach((city) => {
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
        );
   });

   //Sử dụng Promise.all để chờ tất cả các yêu cầu hoàn thành và nhận được một mảng dữ liệu thời tiết.
   const weatherData = await Promise.all(requests);

   // Flicker Delay
   await new Promise((res) => setTimeout(res,500));

   //Cuối cùng, với mỗi thành phố, nó gán dữ liệu thời tiết tương ứng từ mảng weatherData vào thuộc tính weather của savedCities.value.
   weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
   })
};
//Sử dụng await để đảm bảo rằng hàm getCities đã hoàn thành trước khi tiếp tục thực hiện các dòng mã khác trong component.
await getCities()

//Tóm lại, đoạn mã này thực hiện việc lấy dữ liệu về thời tiết cho các thành phố đã lưu 
//và cập nhật savedCities với thông tin thời tiết tương ứng từ API.


const router = useRouter() //Vue Router để thực hiện chuyển hướng trang
const goToCityView = (city) => {
    //router.push là một phương thức của Vue Router, được sử dụng để thực hiện chuyển hướng đến một route khác.
    router.push({
        name: "cityView",//Trong trường hợp này, chúng ta đang chuyển hướng đến route có tên là "cityView".
        params: { state: city.state, city: city.city },
        query: {id: city.id, lat: city.coords.lat, lng: city.coords.lng}// thuộc tính của đối tượng 
    })
}
</script>

