"use client"

import styles from "../../styles/Signup.module.css";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/userApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useEffect, useState } from "react";
import  Head  from "next/head";
import { Header } from "@/components/Header/Header";
import { InputField } from "@/components/inputField/inputField";
import { Button } from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const SignUp = (data: Props) =>{
    const {tenant,setTenant} = useAppContext();
    useEffect(() =>{
      setTenant(data.tenant);
    }, [] );

    const router = useRouter (); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
    }

    const handleSignUp = () => {     
   router.push(`/${data.tenant.slug}/signup`)
    } 

  return (
    <div className={styles.container}> 
       <Head>
         <title> Cadastro | {data.tenant.name}</title>
       </Head>
       <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} title={""} subtitle={""}/>
       <div className={styles.header}>{data.tenant.name}</div>

       <div 
          className={styles.subtitle}
          style={{borderBottomColor: data.tenant.mainColor}}  
      > Preencha os campos para criar o seu cadatastro.
      </div>
      
       <div className={styles.line}></div>

       <div className={styles.formArea}>

          <div className={styles.inputArea}>
              <InputField
              color={data.tenant.mainColor}
              placeholder="Digite seu nome"
              value={name}
              onChange={setName}
            />
          </div>
          <div className={styles.inputArea}>
              <InputField
              color={data.tenant.mainColor}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className={styles.inputArea}>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Digite sua senha"
                value={password}
                onChange={setPassword}
                password
            />
          </div>
          <div className={styles.inputArea}>
              <Button
                  color={data.tenant.mainColor}
                  label="Cadastrar"
                  onClick={handleSubmit}
                  fill
              />
          </div>
       </div>
       <div className={styles.forgetArea} >
         Já tem cadastro? <Link href={`/${data.tenant.slug}/login`}
           style={{color: data.tenant.mainColor}}  
         >Fazer Login</Link>
       </div>
       

       
    </div>
  )
}
export default SignUp;

type Props ={
  tenant:Tenant
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

      return{
        props:{
            tenant  
        }
       }
}