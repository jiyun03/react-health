import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import Layout from "../common/Layout";
import Alert from "../common/Alert";
import Dim from "../common/Dim";

function Write() {
  const params = useLocation().search;
  const yearView = new URLSearchParams(params).get("year");
  const monthView = new URLSearchParams(params).get("month");
  const keyView = new URLSearchParams(params).get("key");
  const inputTitle = useRef("");
  const inputDate = useRef("");
  const inputContent = useRef("");
  const inputCategory = useRef("");
  const inputCategoryEtc = useRef("");
  const radioMedicine = useRef("");
  const inputRadioMedicine = useRef("");
  const radioShot = useRef("");
  const inputRadioShot = useRef("");
  // const inputFile = useRef('')
  const [SelectInput, setSelectInput] = useState(false);
  const [RadioMedicine, setRadioMedicine] = useState("no");
  const [RadioShot, setRadioShot] = useState("no");

  // 작성완료
  const [WriteComplete, setWriteComplete] = useState(false);

  // 유효성 검사
  const [Valid, setValid] = useState(true);

  // 딤
  const [DimOpen, setDimOpen] = useState(false);

  // 라디오
  const radioHandler = (e) => {
    if (e.target.name === "medicine") {
      setRadioMedicine(e.target.value);
    } else if (e.target.name === "shot") {
      setRadioShot(e.target.value);
    }
  };

  // category
  const category = [
    "내과",
    "치과",
    "내분비과",
    "산부인과",
    "소아과",
    "정형외과",
    "이비인후과",
    "안과",
    "신경외과",
    "성형외과",
    "비뇨기과",
    "신경과",
    "정신의학과",
    "피부과",
    "재활의학과",
    "가정의학과",
    "기타",
  ];
  const selectEtc = () => {
    if (inputCategory.current.value === "기타") {
      setSelectInput(true);
    } else {
      setSelectInput(false);
    }
  };

  // 폼 실패 / 전송
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      inputTitle.current.value.trim() === "" ||
      inputDate.current.value === "" ||
      inputContent.current.value.trim() === ""
    ) {
      setValid(false);
      setDimOpen(true);
      disableBodyScroll(event);
    } else {
      createPost();
      setDimOpen(true);
      setWriteComplete(true);
    }
  };

  // firebase post 전송
  const createPost = () => {
    // 요일 계산
    const week = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const today = new Date(inputDate.current.value).getDay();
    const todayLabel = week[today];

    const healthList = {
      title: inputTitle.current.value,
      date: inputDate.current.value,
      dateWeek: todayLabel,
      content: inputContent.current.value,
      category: inputCategory.current.value,
      medicine: RadioMedicine,
      shot: RadioShot,
    };
    if (inputCategoryEtc.current !== null) {
      healthList.categoryEtc = inputCategoryEtc.current.value;
    }
    if (inputRadioMedicine.current !== null) {
      healthList.medicineInput = inputRadioMedicine.current.value;
    }
    if (inputRadioShot.current !== null) {
      healthList.shotInput = inputRadioShot.current.value;
    }
    const listYear = healthList.date.slice(0, 4);
    const listMonth = healthList.date.slice(5, 7);

    if (!params) {
      // 작성
      createPostFetch(listYear, listMonth, healthList);
    } else {
      // 수정모드
      editPut(listYear, listMonth, healthList, keyView);
    }
  };

  // 생성
  const createPostFetch = (listYear, listMonth, healthList) => {
    const response = fetch(
      `https://react-health-32d31-default-rtdb.firebaseio.com/healthList/year${listYear}/month${listMonth}.json`,
      {
        method: "POST",
        body: JSON.stringify(healthList),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };

  // 수정
  const [EditState, setEditState] = useState({});

  // 불러오기
  const editView = useCallback(async () => {
    if (params) {
      const response = await fetch(
        `https://react-health-32d31-default-rtdb.firebaseio.com/healthList/year${yearView}/month${monthView}/${keyView}.json`
      );
      const data = await response.json();
      setEditState(data);
    } else {
      setEditState({});
    }
  }, [params, yearView, monthView, keyView]);

  const editPut = (listYear, listMonth, healthList, keyView) => {
    const response = fetch(
      `https://react-health-32d31-default-rtdb.firebaseio.com/healthList/year${listYear}/month${listMonth}/${keyView}.json`,
      {
        method: "PUT",
        body: JSON.stringify(healthList),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };

  useEffect(() => {
    editView();
  }, [params, editView]);

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);

    // date
    if (EditState.date !== undefined || today !== undefined) {
      if (EditState.date !== undefined) {
        inputDate.current.value = EditState.date;
      } else {
        inputDate.current.value = today;
      }
    }
    // inputCategory
    if (EditState.category !== undefined) {
      inputCategory.current.value = EditState.category;
    } else {
      inputCategory.current.value = category[0];
    }

    // radioMedicine
    if (EditState.medicine === "yes") {
      setRadioMedicine("yes");
    } else {
      setRadioMedicine("no");
    }
    // radioShot
    if (EditState.shot === "yes") {
      setRadioShot("yes");
    } else {
      setRadioShot("no");
    }
  }, [EditState]);

  // alert 함수
  const btnOk = (e) => {
    setValid(true);
    setDimOpen(false);
    enableBodyScroll(e);
  };

  return (
    <>
      <Layout>
        <form className="form" onSubmit={submitHandler}>
          <div className="form__item-wrap">
            {/* 제목 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="title" className="form__label">
                  제목
                </label>
              </div>
              <div className="form__input-wrap">
                <input
                  type="text"
                  id="title"
                  ref={inputTitle}
                  defaultValue={
                    EditState.title !== undefined ? EditState.title : ""
                  }
                  placeholder="제목을 입력해 주세요."
                  className="form__input"
                />
              </div>
            </div>
            {/* 날짜 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="date" className="form__label">
                  날짜
                </label>
              </div>
              <div className="form__input-wrap">
                <input
                  type="date"
                  id="date"
                  ref={inputDate}
                  className="form__input form__input--date"
                />
              </div>
            </div>
            {/* 분류 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="category" className="form__label">
                  분류
                </label>
              </div>
              <div className="form__input-wrap form__input-wrap--select">
                <select
                  className="form__input"
                  ref={inputCategory}
                  onChange={selectEtc}
                >
                  {category.map((key, idx) => (
                    <option key={idx} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__input-wrap">
                {SelectInput && (
                  <input
                    type="text"
                    id="categoryEtc"
                    ref={inputCategoryEtc}
                    placeholder="기타 분류를 입력해 주세요. (선택)"
                    className="form__input"
                  />
                )}
              </div>
            </div>
            {/* 내용 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="content" className="form__label">
                  내용
                </label>
              </div>
              <div className="form__input-wrap">
                <textarea
                  id="content"
                  rows="10"
                  ref={inputContent}
                  placeholder="본문을 입력하세요."
                  defaultValue={
                    EditState.content !== undefined ? EditState.content : ""
                  }
                  className="form__input"
                ></textarea>
              </div>
            </div>
            {/* 약복용 */}
            <div className="form__item form__item--radio">
              <div className="form__flex">
                <div className="form__label-wrap">
                  <div className="form__label">약 복용 여부</div>
                </div>
                <label className="form__radio" ref={radioMedicine}>
                  <input
                    type="radio"
                    name="medicine"
                    value="no"
                    className="form__input--radio"
                    checked={RadioMedicine === "no"}
                    onChange={radioHandler}
                  />
                  아니오
                </label>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="medicine"
                    value="yes"
                    className="form__input--radio"
                    checked={RadioMedicine === "yes"}
                    onChange={radioHandler}
                  />
                  예
                </label>
              </div>
              <div className="form__input-wrap">
                {RadioMedicine === "yes" && (
                  <input
                    type="text"
                    id="medicineInput"
                    ref={inputRadioMedicine}
                    defaultValue={
                      EditState.medicineInput !== undefined
                        ? EditState.medicineInput
                        : ""
                    }
                    placeholder="복용약과 용량을 입력해 주세요. (선택)"
                    className="form__input"
                  />
                )}
              </div>
            </div>
            {/* 주사 여부 */}
            <div className="form__item form__item--radio">
              <div className="form__flex">
                <div className="form__label-wrap">
                  <div className="form__label">주사 여부</div>
                </div>
                <label className="form__radio" ref={radioShot}>
                  <input
                    type="radio"
                    name="shot"
                    value="no"
                    className="form__input--radio"
                    checked={RadioShot === "no"}
                    onChange={radioHandler}
                  />
                  아니오
                </label>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="shot"
                    value="yes"
                    className="form__input--radio"
                    checked={RadioShot === "yes"}
                    onChange={radioHandler}
                  />
                  예
                </label>
              </div>
              <div className="form__input-wrap">
                {RadioShot === "yes" && (
                  <input
                    type="text"
                    id="shotInput"
                    ref={inputRadioShot}
                    defaultValue={
                      EditState.shotInput !== undefined
                        ? EditState.shotInput
                        : ""
                    }
                    placeholder="메모를 입력해 주세요. (선택)"
                    className="form__input"
                  />
                )}
              </div>
            </div>
            {/* 사진 첨부
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="file" className="form__label">사진 첨부</label>
              </div>
              <div className="form__input-wrap">
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  placeholder="제목을 입력해 주세요."
                  accept="image/*"
                  multiple={true}
                  className="form__input form__input--file"/>
              </div>
            </div> */}
          </div>
          {/* 버튼 */}
          <div className="form__btn-wrap">
            <button type="submit" className="form__btn">
              {EditState.title !== undefined ? "수정" : "작성"}하기
            </button>
          </div>
          {!Valid && (
            <Alert
              type="default"
              clickHandler={btnOk}
              title="확인해 주세요"
              content="필수 값을 작성해주세요."
            />
          )}
        </form>
      </Layout>
      {WriteComplete && (
        <Alert
          type="submit"
          title="확인해 주세요"
          content="작성이 완료 되었습니다."
        />
      )}
      {DimOpen && (
        <Dim
          setDimOpen={setDimOpen}
          setDefault={setValid}
          setSubmit={setValid}
          setList={WriteComplete}
        />
      )}
    </>
  );
}

export default Write;
