import { useState, useEffect, useCallback } from 'react'
import Layout from "../common/Layout"
import { useLocation } from 'react-router'

function View() {
  const [View, setView] = useState({})
  const params = useLocation().search
  const year = new URLSearchParams(params).get('year')
  const month = new URLSearchParams(params).get('month')
  const pathname = useLocation()
  const viewKey = pathname.pathname.split("/")

  const viewHandler = useCallback(async () => {
    const response = await fetch(`https://react-health-ef569-default-rtdb.firebaseio.com/healthList/year${year}/month${month}/${viewKey[2]}.json`)
    const data = await response.json()
    setView(data)
  }, [year, month, viewKey])

  useEffect(() => {
    viewHandler()
  }, [viewHandler])

  return (
    <Layout>
      <div className="view__title">
        {View.title}
        {View.date}
        {View.dateWeek}
        {View.category}
        {View.medicine}
        {View.shot}
        {View.content && View.content.split("\n").map((line, lineIdx) => { 
          return (
            <div key={lineIdx}>{line}</div>
          )
        })}
      </div>
    </Layout>
  )
}

export default View