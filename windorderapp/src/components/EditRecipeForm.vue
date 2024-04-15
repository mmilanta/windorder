<script setup>
import { NInput, NSelect, NSpace } from 'naive-ui';
import { defineProps, ref } from 'vue'
const props = defineProps(['recipe']);
console.log("props")
const edited_recipe = ref(props.recipe)
const selectOptions = [
  {
    label: "Secondi di Carne",
    value: 'secondi_di_carne',
  },
  {
    label: 'Torte Salate',
    value: 'torte_salate'
  },
  {
    label: 'Dolci',
    value: 'dolci'
  },
  {
    label: 'Pane & Co.',
    value: 'pane_&_co'
  },
  {
    label: 'Sughi',
    value: 'sughi'
  },
  {
    label: "Salse",
    value: 'salse',
  },
  {
    label: 'Secondi di Pesce',
    value: 'secondi_di_pesce'
  },
  {
    label: 'Verdure',
    value: 'verdure'
  },
  {
    label: 'Creme Dolci',
    value: 'creme_dolci'
  },
  {
    label: 'Paste Base',
    value: 'paste_base'
  },
  {
    label: 'Antipasti',
    value: 'antipasti'
  }
];
const themeOverrides = {
    common: {
      primaryColor: '#000000',
      primaryColorHover: "#000000",
      primaryColorPressed: "#000000",
      textColorBase: "#000000"
    }
  };
</script>

<template>
    <n-space vertical style="padding: 10px 20px 10px 20px">
          <n-input class="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-mono bg-inherit focus:bg-inherit" v-model:value="edited_recipe.title" placeholder="Basic Input" type="textarea" :autosize="{minRows: 1}" :theme-overrides="themeOverrides"/>
          <n-select class="text-lg bg-inherit focus:bg-inherit" v-model:value="edited_recipe.category" :options="selectOptions" :theme-overrides="themeOverrides"/>
          <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ingredienti</p>
          <n-input class="font-mono text-lg bg-inherit focus:bg-inherit" v-model:value="edited_recipe.ingredients" type="textarea" placeholder="Ingredienti" :autosize="{minRows: 3}" :theme-overrides="themeOverrides"/>
          <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ricetta</p>
          <n-input class="font-mono text-lg bg-inherit focus:bg-inherit" v-model:value="edited_recipe.steps" type="textarea" placeholder="Ricetta" :autosize="{minRows: 3}" :theme-overrides="themeOverrides"/>
          <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Note</p>
          <n-input class="font-mono text-lg bg-inherit focus:bg-inherit" v-model:value="edited_recipe.notes" type="textarea" placeholder="Note" :autosize="{minRows: 3}" :theme-overrides="themeOverrides"/>
        <n-space>
          <button class="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded" @click="$emit('SaveRecipe', edited_recipe)">
          Save
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" @click="$emit('DiscardRecipe')">
          Discard
        </button>
        </n-space>
      </n-space>
  </template>