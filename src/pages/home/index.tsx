import React from "react"
import Layout from "../../components/Layout"
import Head from "../../components/Head"
import Hero from "../../pageComponents/home/Hero"
import Features from "../../pageComponents/home/Features"
import Footer from "../../pageComponents/home/Footer"

export default function Home() {
  return (
    <Layout>
      <Head title="Macondo Games" />
      <Hero/>
      <Features/>
      <Footer/>
    </Layout>
  )
}
