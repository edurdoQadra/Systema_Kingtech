<script setup>
import {onMounted, ref} from 'vue'

defineProps(['modalVue','options']);
defineEmits(['update:modalVue']);

const input = ref(null);

onMounted(()=>{
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
})

defineExpose({focus: ()=>input.value.focus()});
</script>

<template>
    <select
    class="form-select"
    :value="modalValue"
    @change="$emit('update:modalValue',$event.target.value)"
    ref="input"
    >
    <option v-for="op in options" :key="op.i" :value="op.id">
    {{ op.PROVINCIA }}
    </option>
    </select>
</template>