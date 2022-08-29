import React from 'react'
import Layout from "../common/Layout"

function Write() {
  return (
    <Layout>
      <div className="inputBox">
        <input type="text" placeholder="제목을 입력하세요"/>
        <textarea
          cols="30"
          rows="5"
          placeholder="본문을 입력하세요"></textarea>
        <div className="btnSet">
          <button>CANCEL</button>
          <button>WRITE</button>
        </div>
      </div>
    </Layout>
  )
}

export default Write