"use client"

import styles from "@/styles/Product-id.module.css";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/userApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/Button/Button";
import { useFormatter } from "@/libs/useformatter";
import { Quantity } from "@/components/Quantity/Quantity";



const Product = (data: Props) =>{
    const {tenant,setTenant} = useAppContext();

    useEffect(() =>{
      setTenant(data.tenant);
    }, [] );

const [qtCount, setQtCount] = useState(1);

const formatter = useFormatter();
    const handleAddToCart = () => {

    }
    const handleUpdateQt = (newCount: number) => {
        setQtCount (newCount);
    }
      
  return (
    <div className={styles.container}>
       <Head>
          <title>{data.product.name} | {data.tenant.name}</title>
       </Head>

       <div className={styles.headerArea}>
          <Header
                  color={data.tenant.mainColor}
                  backHref={`/${data.tenant.slug}`}
                  title="Produto" subtitle={""}   
                  invert
           />
       </div>

       <div className={styles.headerBg} style={{backgroundColor:data.tenant.mainColor}}>
          
       </div>

       <div className={styles.productImage}>
          <img src={data.product.image} alt=""/>
       </div>

       <div className={ styles.category}>{data.product.categoryName}</div>
       <div className={ styles.title} style={{borderBottomColor: data.tenant.mainColor}}>{data.product.name}</div>
       <div className={ styles.line}></div>
        
       <div className={ styles.description}>{data.product.description}</div>

       <div className={ styles.qtText}>Quantidade</div>
       <div className={ styles.area}>
            <div className={ styles.areaLeft}>
                <Quantity
                  color={data.tenant.mainColor}
                  count={qtCount}
                  onUpdateCount={handleUpdateQt}
                  min={1}
                 small
                />
            </div>
            <div 
               className={ styles.areaRight}
               style={{color: data.tenant.mainColor}}
               >{formatter.formatPrice(data.product.price)}</div>
       </div>
     
       <div className={ styles.buttonArea}>
        <Button
          color={data.tenant.mainColor}
          label="Adcionar a sacola"
          onClick={handleAddToCart} 
          fill
        />
       </div>
      
    </div>
  )
}
export default Product;

type Props ={
  tenant:Tenant,
  product: Product

}

export const getServerSideProps: GetServerSideProps = async (context) => {
     const { tenant: tenantSlug, id} = context.query;
    //  console.log('TENANT:' , tenantSlug);
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const api = useApi(tenantSlug as string);
   
     //Get Tenant
      const tenant = await api.getTenant();
       if(!tenant){
        return { redirect: {  destination:'/', permanent: false } }
       }

       //Get Product
      const product = await api.getProduct(id as string);

      return{
        props:{
            tenant,
            product
        }
       }
}