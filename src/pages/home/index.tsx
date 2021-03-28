import React from "react"
import Layout from "../../components/Layout"
import Head from "../../components/Head"
import Features from "../../pageComponents/home/Features"

export default function Home() {
  return (
    <Layout>
      <Head title="Macondo Games" />
      <Features/>
    </Layout>
  )
}
