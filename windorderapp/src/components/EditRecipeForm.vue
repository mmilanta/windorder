<script setup>
import { NButton, NInput, NSelect, NSpace, NThing } from 'naive-ui';
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
]
</script>

<template>
    <n-space vertical style="padding: 10px 20px 10px 20px">
          <n-input style="font-size: 30px" v-model:value="edited_recipe.title" placeholder="Basic Input" />
          <n-select v-model:value="edited_recipe.category" :options="selectOptions"/>
          <n-thing title="Ingredienti"/>
          <n-input v-model:value="edited_recipe.ingredients" type="textarea" placeholder="Ingredienti" :autosize="{minRows: 3}"/>
          <n-thing title="Ricetta"/>
          <n-input v-model:value="edited_recipe.steps" type="textarea" placeholder="Ricetta" :autosize="{minRows: 3}"/>
          <n-thing title="Note"/>
          <n-input v-model:value="edited_recipe.notes" type="textarea" placeholder="Note" :autosize="{minRows: 3}"/>
        <n-space>
          <n-button type="primary" @click="$emit('SaveRecipe', edited_recipe)">
          Save
        </n-button>
        <n-button type="error" @click="$emit('DiscardRecipe')">
          Discard
        </n-button>
        </n-space>
      </n-space>
  </template>