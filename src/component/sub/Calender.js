import Layout from "../common/Layout"
import { useState, useEffect, useCallback } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

function Calender() {
  const publicFolder = process.env.PUBLIC_URL
  const [Change, setChange] = useState(new Date())
  const [DateReal, setDateReal] = useState([])
  const [Medicine, setMedicine] = useState([])
  const [Shot, setShot] = useState([])

  const fetchListsHandler = useCallback(async () => {
    const response = await fetch('https://react-health-ef569-default-rtdb.firebaseio.com/healthList.json')
    const data = await response.json()
    if(data === null) return
    const year = []
    const month = []
    const date = []
    const dateReal = []
    const dateMedicine = []
    const dateShot = []
    for (const keyYear in data) {
      const dataYear = data[keyYear]
      year.push(dataYear)
      for (const keyMonth in dataYear) {
        const dataMonth = dataYear[keyMonth]
        month.push(dataMonth)
        for (const keyDate in dataMonth) {
          const dataDate = dataMonth[keyDate]
          date.push(dataDate)
        }
      }
    }
    date.forEach((el) => {
      dateReal.push(el.date)
      if(el.medicine === "yes") {
        dateMedicine.push(el.date)
      }
      if(el.shot === "yes") {
        dateShot.push(el.date)
      }
    })
    setDateReal(dateReal)
    setMedicine(dateMedicine)
    setShot(dateShot)
  }, []);
  
  useEffect(() => {
    fetchListsHandler()
  }, [fetchListsHandler])

  return (
    <Layout>
      <Calendar
        onChange={setChange}
        value={Change}
        tileContent={({ date, view }) => {
          let html = [];
          if(Medicine.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<img key={`medicine${moment(date)}`} src={`${publicFolder}/assets/img/icon/medicine.png`} alt="약 아이콘" className="calender__icon" />)
          }
          if(Shot.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<img key={`shot${moment(date)}`} src={`${publicFolder}/assets/img/icon/shot.png`} alt="주사 아이콘" className="calender__icon" />)
          }
          if(DateReal.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<img key={`note${moment(date)}`} src={`${publicFolder}/assets/img/icon/note.png`} alt="노트 아이콘" className="calender__icon" />)
          }
          return (
            <div className="calender__icon-wrap">
              {html}
            </div>
          );
        }}
      />
    </Layout>
  )
}

export default Calender