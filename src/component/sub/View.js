import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import Layout from "../common/Layout";
import LoadingLayer from "../common/LoadingLayer";
import Alert from "../common/Alert";
import Dim from "../common/Dim";

function View() {
  const publicFolder = process.env.PUBLIC_URL;
  const [Loading, setLoading] = useState(true);
  const [View, setView] = useState({});
  const params = useLocation().search;
  const year = new URLSearchParams(params).get("year");
  const month = new URLSearchParams(params).get("month");
  const pathname = useLocation();
  const viewKey = pathname.pathname.split("/");

  const viewHandler = useCallback(async () => {
    const response = await fetch(
      `https://react-health-32d31-default-rtdb.firebaseio.com/healthList/year${year}/month${month}/${viewKey[2]}.json`
    );
    const data = await response.json();
    setView(data);
  }, [year, month, viewKey]);

  useEffect(() => {
    viewHandler();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // toolkit
  const toolkit = useRef("");

  // 삭제
  const [DeleteComplete, setDeleteComplete] = useState(false);
  const [DimOpen, setDimOpen] = useState(false);
  const deleteHandler = () => {
    setDeleteComplete(true);
    setDimOpen(true);
    const response = fetch(
      `https://react-health-32d31-default-rtdb.firebaseio.com/healthList/year${year}/month${month}/${viewKey[2]}.json`,
      {
        method: "DELETE",
      }
    );
    return response;
  };

  return (
    <>
      <Layout className="layout--view">
        {!Loading ? (
          <div className="view">
            <div className="view__head">
              <div className="view__title-wrap">
                <div className="view__title">{View.title}</div>
                <div className="view__date">
                  {View.date}-{View.dateWeek}
                </div>
              </div>
              <div className="view__icon-wrap">
                <div
                  className="view__icon"
                  onClick={() => {
                    toolkit.current.classList.toggle("s-active");
                  }}
                >
                  <img
                    src={`${publicFolder}/assets/img/icon/ellipsis.png`}
                    alt="툴팁 아이콘"
                  />
                </div>
                <div className="view__tooltip-wrap" ref={toolkit}>
                  <NavLink
                    to={`/write?key=${viewKey[2]}&year=${year}&month=${month}`}
                    className="view__tooltip"
                  >
                    수정
                  </NavLink>
                  <div className="view__tooltip" onClick={deleteHandler}>
                    삭제
                  </div>
                </div>
              </div>
            </div>
            <div className="view__detail">
              <div className="view__detail-item">
                <div className="view__detail-title">분류</div>
                <div className="view__detail-content">
                  {View.categoryEtc ? View.categoryEtc : View.category}
                </div>
              </div>
              <div className="view__detail-item">
                <div className="view__detail-title">약 복용 여부</div>
                <div className="view__detail-content">
                  {View.medicine === "yes" ? "예" : "아니오"}
                  {View.medicineInput && (
                    <div className="view__detail-detail">
                      {View.medicineInput}
                    </div>
                  )}
                </div>
              </div>
              <div className="view__detail-item">
                <div className="view__detail-title">주사 여부</div>
                <div className="view__detail-content">
                  {View.shot === "yes" ? "예" : "아니오"}
                  {View.shotInput && (
                    <div className="view__detail-detail">{View.shotInput}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="view__body">
              {View.content &&
                View.content.split("\n").map((line, lineIdx) => {
                  return (
                    <span key={lineIdx}>
                      {line}
                      <br />
                    </span>
                  );
                })}
            </div>
            <div className="view__btn-wrap">
              <NavLink to="/list" className="view__btn">
                목록
              </NavLink>
            </div>
          </div>
        ) : (
          <LoadingLayer />
        )}
      </Layout>
      {DeleteComplete && (
        <Alert
          type="submit"
          title="확인해 주세요"
          content="일지가 삭제 되었습니다."
        />
      )}
      {DimOpen && <Dim setDimOpen={setDimOpen} setList={DeleteComplete} />}
    </>
  );
}

export default View;
