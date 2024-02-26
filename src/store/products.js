import { defineStore } from 'pinia'
import axios from 'axios'

export const useProducts = defineStore({
    id: 'products',
    state: () => ({
        url: 'https://dummyjson.com/products',
        menProducts:null,
        menProducts:null,
        unisexProducts:null,
        regProducts:null,
    }),
    actions:{
      async getProducts(
        // {type}
        ){
        try {
           const res = await axios.get(`${this.url}`)
           const data = res.data.products
          //  this is js for preview u know
           this.regProducts = data
          //  this is ur websites function
          //  if (type == 'men') {
          //       this.menProducts = data
          //  } else if (type == 'women'){
          //       this.womenProducts = data
          //  }else{
          //   this.unisexProducts = data
          //  }
        }catch (error){
            console.error("error while getting popular movies", error)
        }
      }
    },
    getters:{}
})