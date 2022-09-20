<template>
  <div class="container">
  	<ul class="nav">
		<li>
			<a href="javascript:void(0);" class="locations" @click="openDropdown">Location</a>
				<div class="dropdown">
                    <div class="dropdown__overlay" @click="closeDropdown"></div>
                    <div class="countries-list">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="title">Country</div>
                            <img src="@/assets/images/Filter_Green.png" class="img-fluid" alt="">
                        </div>
                        <base-input type="text" placeholder="Type to search" v-model:value="country" />
                        <c-scrollbar height="170px">
                            <ul class="list-unstyled">
                                <li v-for="country in getCountries" :key="country">
                                    <div class="checkbox">
                                        <input type="checkbox" :id="country" :value="country">
                                        <label :for="country">{{country}}</label>
                                    </div>
                                </li>
                            </ul>
                        </c-scrollbar>
                    </div>
                    <div class="py-15"></div>
                    <div class="regions-list">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="title">Region</div>
                            <img src="@/assets/images/Filter_Green.png" class="img-fluid" alt="">
                        </div>
                        <base-input type="text" placeholder="Type to search" v-model:value="region" />
                        <c-scrollbar height="170px">
                            <ul class="list-unstyled">
                                <li v-for="region in getRegions" :key="region">
                                    <div class="checkbox">
                                        <input type="checkbox" :id="region" :value="region">
                                        <label :for="region">{{region}}</label>
                                    </div>
                                </li>
                            </ul>
                        </c-scrollbar>
                    </div>
				</div>
		</li>
		<li>
			<a href="javascript:void(0);" class="filters" @click="toggleAdvanceSearch">Advanced filters</a>
		</li>
	</ul>
  </div>
  <AdvanceSearch :show="showAdvanceSearch" @closeSearch="closeSearch" />
</template>

<script lang="ts">
import {CScrollbar} from 'c-scrollbar';
import { defineComponent, ref } from 'vue';
import BaseInput from './components/base/BaseInput.vue';
import AdvanceSearch from './components/AdvanceSearch.vue';
import { locations } from './data/location.json'
export default defineComponent({
    name: 'App',
    data(){
        return{
            countries: locations.countries as Array<string>,
            regions: locations.regions as Array<string>,
            showAdvanceSearch: false,
            country: '',
            region: ''
        }
    },
    components: {
        AdvanceSearch,
        CScrollbar,
        BaseInput,
        locations
    },
    computed:{
        getCountries(): Array<string> {
            return this.countries.filter((item)=>{
                return item.toLowerCase().includes(this.country.toLowerCase())
            })
        },
        getRegions(): Array<string> {
            return this.regions.filter((item)=>{
                return item.toLowerCase().includes(this.region.toLowerCase())
            })
        },
    },

    methods:{
        toggleAdvanceSearch(){
            this.showAdvanceSearch=!this.showAdvanceSearch
        },
        openDropdown(){
            let dropdown = document.querySelector(".dropdown")
            if(dropdown!=null){
                dropdown.classList.add('active')
                document.addEventListener("click",this.closeIfClickedOutside)
            }
        },
        closeDropdown(){
            let dropdown = document.querySelector(".dropdown")
            if(dropdown!=null){
                dropdown.classList.remove('active')
            }
        },
        closeIfClickedOutside(e: Event){
            const target = e.target as Element
            if(!target.matches(".dropdown") && !target.matches("a")){
                this.closeDropdown()
            }
        },
        closeSearch(){
            this.showAdvanceSearch=false
        }
    },
    
});
</script>

<style lang="scss" scoped>

.dropdown{
    position:absolute;
    background-color: #fff;
    border-radius: 1rem;
    list-style: none;
    overflow: hidden;
    border: 1px solid hsla(0,0%,44%,.12);
    width:250px;
    padding: 0.5rem 0.75rem 1.25rem 0.75rem;
    margin-top:0.5rem;
    font-size: 0.90rem;
    font-weight: 600;
    opacity:0;
    $self: &;
    &__overlay{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background:transparent;
        z-index: -1;
        display:none;
    }
    &.active{
        opacity:1;
        #{$self}__overlay{
            display:block;
        }
    }
    .checkbox{
        &:hover{
            background-color: #c4ffcf;
        }
    }
    ul{
        &:not(:lsat-child){
            margin-bottom:0.625rem;
        }
    }
    .d-flex{
        padding: 0.438rem 0.75rem;
        img{
            width: 0.75rem;
        }
    }
    ::v-deep{
        .form-group{
            margin-bottom: 0px;
        }
    }
    
    
}
</style>
