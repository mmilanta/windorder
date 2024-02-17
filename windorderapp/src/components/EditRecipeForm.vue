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
    label: 'Secondi di Pesce',
    value: 'secondi_di_pesce'
  }
]
</script>

<template>
    <n-space vertical style="padding: 10px 20px 10px 20px">
          <n-input class="txt_box" v-model:value="edited_recipe.title"/>
          <n-select v-model:value="edited_recipe.category" :options="selectOptions"/>
          <n-thing title="Ingredienti"/>
          <n-input v-model:value="edited_recipe.ingredients" type="textarea" placeholder="Autosizable" :autosize="{minRows: 3}"/>
          <n-thing title="Ricetta"/>
          <n-input v-model:value="edited_recipe.steps" type="textarea" placeholder="Autosizable" :autosize="{minRows: 3}"/>
          <n-thing title="Note"/>
          <n-input v-model:value="edited_recipe.notes" type="textarea" placeholder="Autosizable" :autosize="{minRows: 3}"/>
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
<style>
.txt_box {
  font-size: 30px;   
  height: fit-content;
}
</style> 