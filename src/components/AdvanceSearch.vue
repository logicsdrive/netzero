<template>
    <div class="modal fade">
        <div class="modal-content">
            <div class="modal-body d-flex advancedFilters">
                <div class="modal__left advancedFilters__types">
                    <div class="advancedFilters__types--item selected">OVERVIEW</div>
                    <div class="advancedFilters__types--item">ACTIVITY SECTORS</div>
                    <div class="advancedFilters__types--item">IMPACT METRICS</div>
                    <div class="advancedFilters__types--item">FUNDING ROUNDS</div>
                    <div class="advancedFilters__types--item">WILDCARD MATCH</div>
                    <div class="advancedFilters__types--item">CUSTOM FILTERS</div>
                </div>
                <div class="modal__right flex-column d-flex justify-content-between advancedFilters__inner">
                    <div class="d-flex flex-column justify-content-between h-100 overflow-auto">
                        <c-scrollbar>
                            <div class="flex-fill p-30 m-10">
                                <div class="form-group">
                                    <label class="control-label">
                                        <span>
                                            Location
                                        </span>
                                    </label>
                                    <div class="col-4">
                                        <BaseAutoCompleteVue :options="getCountries" @selected="selectedLocation" />
                                    </div>
                                </div>
                                <div class="form-group founded-year">
                                    <label class="control-label">
                                        <span>
                                            Founded Year
                                        </span>
                                    </label>
                                    <div class="col-4">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <base-input type="number" placeholder="2010" class="w-100" v-model:value="filter.fromYear"></base-input>
                                            </div>
                                            <div class="col-auto">to</div>
                                            <div class="col-auto">
                                                <base-input type="number" placeholder="2022" class="w-100" v-model:value="filter.toYear"></base-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        <span>
                                            Size
                                        </span>
                                    </label>
                                    <div>
                                        <ul class="list-unstyled sizes-list">
                                            <li v-for="size in sizes" :key="size">
                                                <div class="checkbox">
                                                    <input type="checkbox" :id="size" :value="size" name="sizes" v-model="filter.sizes">
                                                    <label :for="size">{{size}}</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        <span>
                                            Stage
                                        </span>
                                    </label>
                                    <div>
                                        <ul class="list-unstyled stages-list">
                                            <li v-for="stage in stages" :key="stage">
                                                <div class="checkbox">
                                                    <input type="checkbox" :id="stage" :value="stage" v-model="filter.stages">
                                                    <label :for="stage">{{stage}}</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </c-scrollbar>
                        <div class="advancedFilters__inner--selection px-30">
                            <ul class="list-inline py-15" v-if="filter">
                                <li class="list-inline-item" v-for="country in filter.location" :key="country">
                                    <div class="selected__item">
                                        <span>{{country}}</span>
                                        <div class="remove-filter" @click="removeLocation(country)"></div>
                                        <div class="exclude-filter" @click="excludeFilter"></div>
                                    </div>
                                </li>
                                <li class="list-inline-item" v-if="filter.fromYear!='' || filter.toYear!=''">
                                    <div class="selected__item" >
                                        <span>{{getFoundedYear}}</span>
                                        <div class="remove-filter" @click="removeYear()"></div>
                                        <div class="exclude-filter" @click="excludeFilter"></div>
                                    </div>
                                </li>
                                <li class="list-inline-item" v-for="size in filter.sizes" :key="size">
                                    <div class="selected__item" >
                                        <span>{{size}}</span>
                                        <div class="remove-filter" @click="removeSize(size)"></div>
                                        <div class="exclude-filter" @click="excludeFilter"></div>
                                    </div>
                                </li>
                                <li class="list-inline-item" v-for="stage in filter.stages" :key="stage">
                                    <div class="selected__item" >
                                        <span>{{stage}}</span>
                                        <div class="remove-filter" @click="removeStage(stage)"></div>
                                        <div class="exclude-filter" @click="excludeFilter"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer py-10 justify-content-between px-30">
                        <span>0 Results</span>
                        <ul class="list-inline m-0">
                            <li class="list-inline-item">
                                <input type="button" class="btn btn-primary" value="Apply" />
                            </li>
                            <li class="list-inline-item">
                                <input type="button" class="btn btn-secondary" @click="clearFilters" value="Clear All" />
                            </li>
                            <li class="list-inline-item">
                                <input type="button" class="btn btn-secondary cancel" @click="hideModal" value="Cancel" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import {CScrollbar} from 'c-scrollbar';
import { defineComponent } from 'vue';
import {locations} from '../data/location.json'
import BaseAutoCompleteVue from './base/BaseAutoComplete.vue';
import BaseInput from './base/BaseInput.vue';

export default defineComponent({
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            location: locations,
            sizes: ["1 - 10","11 - 50","51 - 100","101 - 200","201 - 500","501 - 1000","1001 - 5000","5001 - 10000","10000+"],
            stages: ["Ideation","Early","Growth","Scaling"],
            filter:{
                location: [] as Array<string>,
                fromYear: '',
                toYear: '',
                sizes: [] as Array<string>,
                stages: [] as Array<string>,
            }
        }
    },
    computed:{
        getCountries(){
            return this.location.countries
        },
        getFoundedYear(){
            if(this.filter.toYear=="" && this.filter.fromYear==""){
                return ''
            }
            else if(this.filter.toYear=='' && this.filter.fromYear!=''){
                return 'From ' + this.filter.fromYear
            }
            else if(this.filter.fromYear=='' && this.filter.toYear!=''){
                return 'To ' + this.filter.toYear
            }
            else{
                return this.filter.fromYear + '-' + this.filter.toYear
            }
        },
        
    },
    components:{
        BaseAutoCompleteVue,
        BaseInput,
        CScrollbar
    },
    methods:{
        selectedLocation(item: string){
            !this.filter.location.includes(item) ? this.filter.location.push(item) :  false
        },
        clearFilters(){
            this.filter.location = []
            this.filter.fromYear=''
            this.filter.toYear = ''
            this.filter.sizes = []
            this.filter.stages = []
        },
        removeLocation(country: string){
            this.filter.location.splice(this.filter.location.indexOf(country));
        },
        removeSize(size: string){
            this.filter.sizes.splice(this.filter.sizes.indexOf(size));
        },
        removeStage(stage: string){
            this.filter.stages.splice(this.filter.stages.indexOf(stage));
        },
        removeYear(){
            this.filter.fromYear=''
            this.filter.toYear=''
        },
        excludeFilter(e: Event){
            const target = e.target as Element
            const classes = target.parentElement?.classList;
            !classes?.contains("excluded") ? classes?.add("excluded") : classes.remove("excluded")
        },
        hideModal(){
            let modal = document.querySelector<HTMLElement>(".modal")!
            if(modal!=null){
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = 'none'
                }, 200);
            }
            this.$emit("closeSearch")
        }
    },
    watch:{
        show(){       
            if(this.show){
                let modal = document.querySelector<HTMLElement>(".modal")!
                if(modal!=null){
                    modal.classList.add("show");
                    setTimeout(() => {
                        modal.style.display = 'block'
                    }, 200);
                }
                
            }
        }
    },

})
</script>

<style lang="scss" scoped>
.c-scrollbar-bar.c-scrollbar-vertical{
    margin:10px;
}
.modal{
    // display: none;
    height: 100%;
    left: 0;
    outline: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1050;
    &.show{
        display:block !important;
    }
    &.fade {
        will-change: opacity;
        -webkit-transition: opacity .15s linear;
        transition: opacity .15s linear;
        &:not(.show){
            opacity: 0;
            display: none;
        }
    }
    &-content{
        background-color: #fff;
        height: 100%;
    }
    &-body{
        padding: 0px;
    }
    &__left{
        flex: 0 0 016%;
        max-width: 16%;
        background: #f8fcfc;
        border-right: 1px solid hsla(0,0%,44%,.12);
        padding: 1.75rem 1.25rem;
    }
    &__right{
        flex: 1;
        height: 100vh;
        overflow: inherit;
    }
    .sizes-list{
        columns: auto 3;
    }
    .stages-list{
        columns: auto 4;
    }
    .c-scrollbar{
        overflow: hidden auto;
    }
}

.advancedFilters{
    &__types{
        &--item{
            font-size: 0.875rem;
            margin: 1.25rem 0;
            line-height: 1.7;
            cursor: pointer;
            &.selected{
                color: var(--primary);
                font-weight: bold;
            }
        }
    }
    &__inner{
        &--selection{
            border-top:1px solid hsla(0deg, 0%, 44%, 0.12);
            ul{
                height: 8vh;
            }
        }
        .selected__item{
            border: 1px solid #d3d3d3;
            border-radius: 0.25rem!important;
            color: var(--text-dark);
            padding: 0.3125rem;
            cursor: pointer;
            position: relative;
            .remove-filter, .exclude-filter{
                position: absolute;
                right: 0;
                width: 16px;
                height: 16px;
                background: var(--primary);
                border-radius: 100%;
                top: -8px;
                right: -8px;
                padding: 4px;
                background: var(--primary) url('../assets/images/5.Cross_Icon.png') center center no-repeat;
                background-size: 8px;
                display: none;
            }
            .exclude-filter{
                top: auto;
                bottom: -8px;
                background: var(--primary) url('../assets/images/5.Minus_Icon.png') center center no-repeat;
                background-size: 8px;
            }
            &.excluded{
                .exclude-filter{
                    background: var(--primary) url('../assets/images/4.Plus_Icon_White.png') center center no-repeat;
                    background-size: 8px;
                }
            }
            &:hover{
                .remove-filter, .exclude-filter{
                    display: block;
                }
            }
            span{
                line-height: 18px;
                padding: 0px .3125rem!important;
            }
        }
    }
    
}
.founded-year ::v-deep .form-group{
    margin-bottom: 0;
}
.excluded{
    text-decoration: line-through;
}
</style>