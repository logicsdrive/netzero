<template>
    <div class="form-group">
        <label v-if="label != null" class="control-label"><span>{{ label }}</span></label>
        <input :type="type" class="form-control" :class="className" :placeholder="placeholder" :value="value" @input="input" />
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
    props:{
        placeholder:{
            type: String
        },
        type:{
            required: true,
            type: String as PropType<string>
        },
        label:{
            type: String
        },
        value: {
            type: String,
            default: null
        },
        className:{
            type: String
        }
    },
    emits: ['update:value'],
    methods:{
        input(e: Event) {
            const target = e.target as InstanceType<typeof HTMLInputElement>
            this.$emit("update:value", target.value);
        },
    }
})
</script>

<style lang="" scoped>

</style>