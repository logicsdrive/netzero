<template>
    <div class="typeHead">
        <simple-typeahead
            :class="{toggleRadius : isSuggestionsOpen}"
            id="typeahead_id"
            placeholder="Start writing..."
            :items="options"
            :minInputLength="1"
            @selectItem="selectItemEventHandler"
            @onInput="inputEventHandler"
            ref="inputRef"
        >
        </simple-typeahead>        
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
// import { AutoComplete } from 'vue3-fancy-autocomplete'
// import 'vue3-autocomplete/dist/vue3-autocomplete.css'
import Autocomplete from 'vue3-autocomplete'
import 'vue3-autocomplete/dist/vue3-autocomplete.css'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' 
export default defineComponent({
    props:{
        options:{
            type: Array
        }
    },  
    data(){
        return{
            result: '',
            isSuggestionsOpen: false,
            template: {
                keys: ["title"],
            },
        }
    },
    components: {
        Autocomplete,
        SimpleTypeahead
    },
    methods:{
        selectItemEventHandler(item: String){
            const typeComp = this.$refs.inputRef as InstanceType<typeof SimpleTypeahead>
            typeComp.clearInput();
            this.isSuggestionsOpen = false
            this.$emit("selected", item)
        },
        inputEventHandler(){
            const typeComp = this.$refs.inputRef as InstanceType<typeof SimpleTypeahead>
            if(typeComp.isListVisible){
                this.isSuggestionsOpen = true
            }
            else{
                this.isSuggestionsOpen = false
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.typeHead{
    ::v-deep {
        .simple-typeahead-input{
            width: 100% !important;
            color: #232426;
            width: 100%;
            appearance: none;
            background-color: #fff;
            border: 1px solid hsla(0,0%,44%,.12) !important;
            border-radius: 1rem;
            height: 2rem;
            padding: 0 1rem;
            font-size:rem(14px);
            margin-top:rem(9.8px);
            margin-bottom:rem(10px);
            box-shadow:none !important;
            outline:none !important;
            &::placeholder{
                color:#dfdee0;
            }
            &.toggleRadius{
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom: 0 !important;
            }
        }
        .simple-typeahead-list{
            border: 1px solid hsla(0,0%,44%,.12) !important;
            border-radius: 0px 0px 5px 5px;
        }
        .simple-typeahead-list-item{
            background:#fff !important;
            border:none !important;
        }
    }
}
</style>