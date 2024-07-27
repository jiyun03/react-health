import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";

import Layout from "../common/Layout";
import Calendar from "react-calendar";
import Alert from "../common/Alert";
import Dim from "../common/Dim";

import "react-calendar/dist/Calendar.css";
import moment from "moment";

function Calender() {
  const publicFolder = process.env.PUBLIC_URL;
  const [Change, setChange] = useState(new Date());
  const [DateReal, setDateReal] = useState([]);
  const [Medicine, setMedicine] = useState([]);
  const [Shot, setShot] = useState([]);
  const [DataMedicineKey, setDataMedicineKey] = useState([]);
  const [DataShotKey, setDataShotKey] = useState([]);
  const [MedicineLink, setMedicineLink] = useState([]);
  const [ShotLink, setShotLink] = useState([]);

  const fetchListsHandler = useCallback(async () => {
    const response = await fetch(
      "https://react-health-32d31-default-rtdb.firebaseio.com/healthList.json"
    );
    const data = await response.json();
    if (data === null) return;
    const year = [];
    const month = [];
    const date = [];
    const dateReal = [];
    const dateMedicine = [];
    const dateShot = [];
    const dateMedicineKey = [];
    const dateShotKey = [];
    const dateMedicineLink = [];
    const dateShotLink = [];
    for (const keyYear in data) {
      const dataYear = data[keyYear];
      year.push(dataYear);
      for (const keyMonth in dataYear) {
        const dataMonth = dataYear[keyMonth];
        month.push(dataMonth);
        for (const keyDate in dataMonth) {
          const dataDate = dataMonth[keyDate];
          date.push(dataDate);
          if (dataDate.medicine === "yes") {
            dateMedicineKey.push(keyDate);
          }
          if (dataDate.shot === "yes") {
            dateShotKey.push(keyDate);
          }
        }
      }
    }
    date.forEach((el) => {
      const year = el.date.slice(0, 4);
      const month = el.date.slice(5, 7);
      dateReal.push(el.date);
      if (el.medicine === "yes") {
        dateMedicine.push(el.date);
        dateMedicineLink.push({
          year: year,
          month: month,
        });
      }
      if (el.shot === "yes") {
        dateShot.push(el.date);
        dateShotLink.push({
          year: year,
          month: month,
        });
      }
    });
    setDateReal(dateReal);
    setMedicine(dateMedicine);
    setShot(dateShot);

    setDataMedicineKey(dateMedicineKey);
    setDataShotKey(dateShotKey);
    setMedicineLink(dateMedicineLink);
    setShotLink(dateShotLink);
  }, []);

  useEffect(() => {
    fetchListsHandler();
  }, [fetchListsHandler]);

  const [Graph, setGraph] = useState(true);
  const [DimOpen, setDimOpen] = useState(false);

  const alertReady = () => {
    setGraph(false);
    setDimOpen(true);
  };

  const btnOk = () => {
    setGraph(true);
    setDimOpen(false);
  };

  return (
    <Layout>
      <div className="calender__nav-wrap">
        <div className="calender__nav s-active">달력</div>
        <div className="calender__nav" onClick={alertReady}>
          그래프
        </div>
      </div>
      {!Graph && (
        <Alert
          type="default"
          clickHandler={btnOk}
          title="확인해 주세요"
          content="준비중 입니다."
        />
      )}
      {DimOpen && (
        <Dim
          setDimOpen={setDimOpen}
          setDefault={setGraph}
          setSubmit={setGraph}
        />
      )}
      <Calendar
        onChange={setChange}
        value={Change}
        tileContent={({ date, view }) => {
          let html = [];
          if (Medicine.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(
              <img
                key={`medicine${moment(date)}`}
                src={`${publicFolder}/assets/img/icon/medicine.png`}
                alt="약 아이콘"
                className="calender__icon"
              />
            );
          }
          if (Shot.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(
              <img
                key={`shot${moment(date)}`}
                src={`${publicFolder}/assets/img/icon/shot.png`}
                alt="주사 아이콘"
                className="calender__icon"
              />
            );
          }
          if (DateReal.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(
              <img
                key={`note${moment(date)}`}
                src={`${publicFolder}/assets/img/icon/note.png`}
                alt="노트 아이콘"
                className="calender__icon"
              />
            );
          }
          return <div className="calender__icon-wrap">{html}</div>;
        }}
      />
      <div className="calender-detail">
        {Medicine && (
          <div className="calender-detail__item">
            <div className="calender-detail__title">
              <img
                src={`${publicFolder}/assets/img/icon/medicine.png`}
                alt="약 아이콘"
                className="calender-detail__icon"
              />
              약 복용 날짜
            </div>
            <div className="calender-detail__date-wrap">
              {Medicine.map((medi, mediIdx) => {
                if (MedicineLink.length !== 0) {
                  return (
                    <NavLink
                      key={DataMedicineKey[mediIdx]}
                      className="calender-detail__date"
                      to={`/view/${DataMedicineKey[mediIdx]}?year=${MedicineLink[mediIdx].year}&month=${MedicineLink[mediIdx].month}`}
                    >
                      {medi}
                    </NavLink>
                  );
                }
              })}
            </div>
          </div>
        )}
        {Shot && (
          <div className="calender-detail__item">
            <div className="calender-detail__title">
              <img
                src={`${publicFolder}/assets/img/icon/shot.png`}
                alt="주사 아이콘"
                className="calender-detail__icon"
              />
              주사 맞은 날짜
            </div>
            <div className="calender-detail__date-wrap">
              {Shot.map((sht, shtIdx) => {
                if (ShotLink.length !== 0) {
                  return (
                    <NavLink
                      key={DataShotKey[shtIdx]}
                      className="calender-detail__date"
                      to={`/view/${DataShotKey[shtIdx]}?year=${ShotLink[shtIdx].year}&month=${ShotLink[shtIdx].month}`}
                    >
                      {sht}
                    </NavLink>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Calender;
