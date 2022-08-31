import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom'

import Layout from "../common/Layout"

// 이미지
import imgListsNone from "../../assets/img/icon/lists-none.png";

function List() {
  const publicFolder = process.env.PUBLIC_URL
  const [Years, setYears] = useState([]);

  const fetchListsHandler = useCallback(async () => {
    const response = await fetch('https://react-health-ef569-default-rtdb.firebaseio.com/healthList.json');
    const data = await response.json();
    if(data === null) return
    const dataSort = Object.fromEntries(
      Object.entries(data).sort(([a],[b]) => a > b? -1 : 1)
    );
    const year = []
    for (const keyYear in dataSort) {
      const montSort = Object.fromEntries(
        Object.entries(data[keyYear]).sort(([a],[b]) => a > b? -1 : 1)
      );
      year.push({
        id: keyYear,
        month: montSort
      })
    }
    setYears(year)
  }, []);

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  return (
    <Layout className={Years.length === 0 && "layout--none"}>
      <div className="lists">
        {Years.length !== 0 ? Years.map((yearEach, yearIdx) => {
          const monthArray = []
          for (const keyMonth in yearEach.month) {
            monthArray.push({
              id: keyMonth,
              month: yearEach.month[keyMonth]
            })
          }
          const year = yearEach.id.substring(4);

          return (
            <div key={`${yearEach.id}${yearIdx}`} className="lists__year-wrap">
              <div className="lists__year">
                {year}년
              </div>
              <div className="lists__month-wrap">
                {monthArray.map((monthEach, monthIdx) => {
                  const listsArray = []
                  for (const keyLists in monthEach.month) {
                    listsArray.push({
                      id: keyLists,
                      lists: monthEach.month[keyLists]
                    })
                  }
                  const month = monthEach.id.substring(5);
                  const dateSort = (a,b) => {
                    const x = a.lists.date.toLowerCase()
                    const y = b.lists.date.toLowerCase()
                    if ( x < y ) return 1
                    if ( x > y ) return -1
                    return 0
                  }
                  listsArray.sort(dateSort)

                  return (
                    <div key={`month${monthIdx}`} className="lists__month-item">
                      <div className="lists__month">
                        {month}월
                      </div>
                      <div className="lists__list-wrap">
                        {listsArray.map((listsEach, listsIdx) => {
                          const date = listsEach.lists.date.substring(8)
                          return (
                            <NavLink key={`lists${listsIdx}`} to={`/view/${listsEach.id}?year=${year}?month=${month}`} className="lists__list-item">
                              <div className="lists__date-wrap">
                                <div className="lists__date lists__date--month">
                                  {month}.{date}
                                </div>
                                <div className="lists__date lists__date--week">
                                  {listsEach.lists.dateWeek}
                                </div>
                                <div className="lists__icon-wrap">
                                  {listsEach.lists.medicine === "yes" && <img src={`${publicFolder}/assets/img/icon/medicine.png`} alt="약 아이콘" className="lists__icon" />}
                                  {listsEach.lists.shot === "yes" && <img src={`${publicFolder}/assets/img/icon/shot.png`} alt="약 아이콘" className="lists__icon" />}
                                </div>
                              </div>
                              <div className="lists__title-wrap">
                                <div className="lists__title">
                                  {listsEach.lists.title}
                                </div>
                                <div className="lists__content">
                                  {listsEach.lists.content}
                                </div>
                              </div>
                            </NavLink>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }) :
        <div className="lists__none-wrap">
          <div className="lists__none-img">
            <img src={imgListsNone} alt="리스트 없는 아이콘" />
          </div>
          <div className="lists__none-title">
            일지를 작성해 보세요
          </div>
        </div>}
      </div>
    </Layout>
  )
}

export default List