"use client"

import { SearchInput } from "@/components/SearchInput/SearchInput";
import styles from "../home.module.css";
import { Banner } from "@/components/Banner/Banner";
import { ProductItem } from "@/components/ProductItem/ProductItem";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/userApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useAuthContext } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { getCookie } from "cookies-next";
import { User } from "@/types/User";



const Home = (data: Props) =>{
    const { setToken, setUser } = useAuthContext();
    const {tenant, setTenant} = useAppContext();
   

    useEffect(() =>{
      setTenant(data.tenant);
      setToken(data.token);
      if(data.user) setUser(data.user);
    }, [] );

    const [products, setProducts] = useState<Product[]>(data.products);
    const [sidebarOpen, setSidebarOpen] = useState(false);

        const handleSearch =(searchValue: string) => {
          console.log(`Você está buscando por: ${searchValue}`);
        }    
  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <div className={styles.headerTop}>
              <div className={styles.headerTopLeft}>
                 <div className={styles.headerTitle}> Seja Bem Vindo (a) 👋 </div>
                 <div className={styles.headerSubtitle}> O que deseja para hoje? </div>
              </div>
              <div className={styles.headerTopRight}>
                 <div
                     className={styles.menuButton}
                     onClick={() => setSidebarOpen(true)}
                  >
                    <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                    <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                    <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                 </div>
                   <Sidebar
                   tenant={data.tenant}
                   open={sidebarOpen}
                   onClose={() => setSidebarOpen(false)}

                   />
              </div>
          </div>
          <div className={styles.headerBottom}>
            <SearchInput onSearch={handleSearch}
            />
          </div>
      </header>

      <Banner/>

      <div className={styles.grid}>        
           {products.map((item, index) => (
              <ProductItem 
              key={index}
              data={item}            
            />
           ))}         
        
      </div>
     
    </div>
  )
}
export default Home;

type Props ={
  tenant:Tenant;
  products: Product[];
  token: string;
  user: User | null;

}

export const getServerSideProps: GetServerSideProps = async (context) => {
     const { tenant: tenantSlug} = context.query;
    //  console.log('TENANT:' , tenantSlug);
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const api = useApi(tenantSlug as string);
   
     //Get Tenant
      const tenant = await api.getTenant();
       if(!tenant){
        return { redirect: {  destination:'/', permanent: false } }
       }

       //Get Logged User
      // const token = context.req.cookies.token;
       const token = getCookie('token', context);
       const user = await api.authorizeToken(token as string);

       //Get Products
      const products = await api.getAllProducts();

      return{
        props:{
            tenant,
            products,
            user,
            token
        }
       }
}

