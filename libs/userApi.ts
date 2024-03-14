import { Product } from "@/types/Product";
import { Tenant } from "@/types/Tenant";
import { User } from "@/types/User";

const TEMPORARYoneProduct: Product = {
     id: 1, 
     image:'/tmp/burger.png',
     categoryName:'Tradicional',
     name:'Texas Burger', price: 25.50,
     description: ' 2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal, '       
   
}

export const useApi = (tenantSlug: string) => ({

    getTenant: async ()  =>{
        switch(tenantSlug){
            case 'b7burger':
            return{
                slug:'b7burger',
                name:'B7Burger',
                mainColor:'#FF0000',
                secondColor:'#f5B385'
               }
               break;
               case 'b7pizza':
                return{
                    slug:'b7pizza',
                    name:'B7pizza',
                    mainColor:'#0000FF',
                    secondColor:'#00FF00'
                   }
                 
               break;
               default:return false;
        }
      
    },
       
    getAllProducts: async () => {
     let Products =[];
     for (let q = 0; q < 10; q++){
        Products.push(TEMPORARYoneProduct)
     }
     return Products
    },

    getProduct: async (id: string) => {
        return TEMPORARYoneProduct
    },

    authorizeToken: async (token: string): Promise<User | false> =>{
           if(!token) return false;

           return{
            name: 'Fabiano',
            email: 'admin@admin.com'
           }
    }

})