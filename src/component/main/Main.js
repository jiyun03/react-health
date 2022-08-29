import React from 'react'
import Layout from "../common/Layout"
import Slide from "../main/Slide"
import Gate from "../main/Gate"

function Main() {
  return (
    <Layout className={"layout--main"}>
      <Slide />
      <Gate />
    </Layout>
  )
}

export default Main