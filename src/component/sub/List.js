import React, { useState, useEffect, useCallback } from 'react';
import Layout from "../common/Layout"

function List() {
  const [Years, setYears] = useState([]);
  // const [YearsEach, setYearsEach] = useState([]);
  const [Month, setMonth] = useState([]);
  const [MonthsEach, setMonthsEach] = useState([]);
  const [Lists, setLists] = useState([]);
  const [Data, setData] = useState({});

  const fetchListsHandler = useCallback(async () => {
    const response = await fetch('https://react-health-ef569-default-rtdb.firebaseio.com/healthList.json');
    const data = await response.json();
    setData(data)

    console.log(data)
    const year = []
    // const yearEach = []
    const month = []
    const listsArray = []

    for (const keyYear in data) {
      year.push({
        id: keyYear,
        month: data[keyYear]
      })
      // for (const keyMonth in yearEach) {
      //   month.push(keyMonth);
      //   monthEach.push({
      //     id: keyMonth,
      //     lists: data[keyMonth]
      //   })
      //   console.log(yearEach)
  
      //   for (const keyList in data[keyYear][keyMonth]) {
      //     listsArray.push({
      //       id: keyList,
      //       title: data[keyYear][keyMonth][keyList].title,
      //       date: data[keyYear][keyMonth][keyList].date,
      //       content: data[keyYear][keyMonth][keyList].content,
      //       category: data[keyYear][keyMonth][keyList].category,
      //       medicine: data[keyYear][keyMonth][keyList].medicine,
      //       shot: data[keyYear][keyMonth][keyList].shot,
      //       categoryEtc: data[keyYear][keyMonth][keyList].categoryEtc,
      //       medicineInput: data[keyYear][keyMonth][keyList].medicineInput,
      //       shotInput: data[keyYear][keyMonth][keyList].shotInput,
      //     });
      //   }
      // }
    }
    setYears(year)
    setMonth(month)
    setLists(listsArray)

    // setYearsEach(yearEach)
    // console.log(YearsEach)
  }, []);

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  return (
    <Layout>
      {Years.map((yearEach, yearIdx) => {
        const monthArray = []
        for (const keyMonth in yearEach.month) {
          monthArray.push({
            id: keyMonth,
            month: yearEach.month[keyMonth]
          })
        }
        return (
          <>
            <li key={`${yearEach.id}${yearIdx}`}>{yearEach.id}</li>
            {monthArray.map((monthEach, monthIdx) => {
              return (
                <li key={`month${monthIdx}`}>
                  {monthEach.id}
                </li>
              )
            })}
          </>
        )
      })}
      {/* {Years.map((year) => {
        return(
          <div key={year} className="lists__year-wrap">
            <div className="lists__year">
              {year}
            </div>
            {Month.map((month) => {
              return(
                <div className="lists__month-wrap">
                  <div key={month} className="lists__month">
                    {month}
                  </div>
                  {Lists.map((li, idx) => {
                    return(
                      <li className="" key={idx}>{li.title}</li>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })} */}
    </Layout>
  )
}

export default List