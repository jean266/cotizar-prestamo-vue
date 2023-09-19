
<script setup>
  import { ref, computed, watch  } from "vue";
  import Header from "./components/Header.vue"
  import Buttons from "./components/Buttons.vue"
  import { calculateTotalPay } from "./helpers"

  const amount = ref(10000000);
  const month = ref(6);
  const total = ref(calculateTotalPay(0))
  const MIN = 500000;
  const MAX = 20000000;
  const STEP = 100000;

  const formatMoney = (value) => {
    const formatter = new Intl.NumberFormat("en-ES", {
      style : "currency",
      currency : "COP"
    });

    return formatter.format(value);
  };

  watch([amount, month], () => {
    total.value = calculateTotalPay(amount.value, month.value)
  });

  const payMonthly = computed(() => {
    return total.value / month.value;
  })

  const handleClickDecrement = () => {
    const value = amount.value - STEP;

    if(value < MIN) {
      alert("Cantida no valida");
      return;
    }

    amount.value = value;
  }
  
  const handleClickIncrement = () => {
    const value = amount.value + STEP;
    
    if(value > MAX) {
      alert("Cantida no valida");
      return;
    }
    
    amount.value = value;
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />

    <div class="flex justify-between mt-10">
      <Buttons 
        :operator="'-'"
        @handleClick="handleClickDecrement"
        />
      <Buttons 
        :operator="'+'"
        @handleClick="handleClickIncrement"
      />
    </div>

    <div class="my-5">
      <input 
        type="range" 
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="amount"
      /> 

      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatMoney(amount)  }}</p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span class="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select 
        class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
        v-model="month"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

    </div>

    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-100 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span class="text-indigo-600">de pagos</span>
      </h2>

      <p class="text-xl text-gray-500 font-bold text-center">{{ month }} Meses</p>
      <p class="text-xl text-gray-500 font-bold text-center">Total a pagar: {{ formatMoney(total) }}</p>
      <p class="text-xl text-gray-500 font-bold text-center">Mensual: {{ formatMoney(payMonthly) }}</p>
    </div>

    <p v-else class="text-center">Añade una cantidad y un plazo a pagar</p>

  </div>
</template>
