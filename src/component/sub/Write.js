import { useEffect, useRef, useState } from 'react'
import Layout from "../common/Layout"
import Alert from "../common/Alert"
import Dim from "../common/Dim"
import { disableBodyScroll } from 'body-scroll-lock';

function Write() {
  const inputTitle = useRef('')
  const inputDate = useRef('')
  const inputContent = useRef('')
  const inputCategory = useRef('')
  const inputCategoryEtc = useRef('')
  const inputRadioMedicine = useRef('')
  const inputRadioShot = useRef('')
  // const inputFile = useRef('')
  const [SelectInput, setSelectInput] = useState(false)
  const [RadioMedicine, setRadioMedicine] = useState("no")
  const [RadioShot, setRadioShot] = useState("no")

  // 작성완료
  const [WriteComplete, setWriteComplete] = useState(false)

  // 유효성 검사
  const [Valid, setValid] = useState(true)

  // 딤
  const [DimOpen, setDimOpen] = useState(false)

  // 라디오
  const radioHandler = (e) => {
    if (e.target.name === "medicine") {
      setRadioMedicine(e.target.value)
    } else if (e.target.name === "shot") {
      setRadioShot(e.target.value)
    }
  }

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10)
    inputDate.current.value = today
  }, [])

  // category
  const category = ["내과", "치과", "내분비과", "산부인과", "소아과", "정형외과", "이비인후과", "안과", "신경외과", "성형외과", "비뇨기과", "신경과", "정신의학과", "피부과", "재활의학과", "가정의학과", "기타"]
  const selectEtc = () => {
    if(inputCategory.current.value === "기타") {
      setSelectInput(true)
    }else {
      setSelectInput(false)
    }
  }

  // 폼 실패 / 전송
  const submitHandler = (event) => {
    event.preventDefault()
    if(
      inputTitle.current.value.trim() === "" ||
      inputDate.current.value === "" ||
      inputContent.current.value.trim() === ""
    ) {
      setValid(false)
      setDimOpen(true)
      disableBodyScroll(event)
    }else {
      createPost()
      setDimOpen(true)
      setWriteComplete(true)
    }
  }

  // firebase post 전송
  const createPost = () => {
    // 요일 계산
    const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일')
    const today = new Date(inputDate.current.value).getDay()
    const todayLabel = week[today]

    const healthList = {
      title: inputTitle.current.value,
      date: inputDate.current.value,
      dateWeek: todayLabel,
      content: inputContent.current.value,
      category: inputCategory.current.value,
      medicine: RadioMedicine,
      shot: RadioShot,
    }
    if(inputCategoryEtc.current !== null) {
      healthList.categoryEtc = inputCategoryEtc.current.value
    }
    if(inputRadioMedicine.current !== null) {
      healthList.medicineInput = inputRadioMedicine.current.value
    }
    if(inputRadioShot.current !== null) {
      healthList.shotInput = inputRadioShot.current.value
    }
    const listYear = healthList.date.slice(0, 4)
    const listMonth = healthList.date.slice(5, 7)
    
    const response = fetch(`https://react-health-ef569-default-rtdb.firebaseio.com/healthList/year${listYear}/month${listMonth}.json`, {
      method: 'POST',
      body: JSON.stringify(healthList),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  return (
    <>
      <Layout>
        <form className="form" onSubmit={submitHandler}>
          <div className="form__item-wrap">
            {/* 제목 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="title" className="form__label">제목</label>
              </div>
              <div className="form__input-wrap">
                <input
                  type="text"
                  id="title"
                  ref={inputTitle}
                  placeholder="제목을 입력해 주세요."
                  className="form__input"/>
              </div>
            </div>
            {/* 날짜 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="date" className="form__label">날짜</label>
              </div>
              <div className="form__input-wrap">
                <input
                  type="date"
                  id="date"
                  ref={inputDate}
                  className="form__input form__input--date"/>
              </div>
            </div>
            {/* 분류 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="category" className="form__label">분류</label>
              </div>
              <div className="form__input-wrap form__input-wrap--select">
                <select
                  className="form__input"
                  ref={inputCategory}
                  onChange={selectEtc}>
                  {category.map((key, idx) => <option key={idx} value={key}>{key}</option>)}
                </select>
              </div>
              <div className="form__input-wrap">
                {SelectInput && <input type="text" id="categoryEtc" ref={inputCategoryEtc} placeholder="기타 분류를 입력해 주세요. (선택)" className="form__input" />}
              </div>
            </div>
            {/* 내용 */}
            <div className="form__item">
              <div className="form__label-wrap">
                <label htmlFor="content" className="form__label">내용</label>
              </div>
              <div className="form__input-wrap">
                <textarea
                  id="content"
                  rows="10"
                  ref={inputContent}
                  placeholder="본문을 입력하세요."
                  className="form__input"></textarea>
              </div>
            </div>
            {/* 약복용 */}
            <div className="form__item form__item--radio">
              <div className="form__flex">
                <div className="form__label-wrap">
                  <div className="form__label">약 복용 여부</div>
                </div>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="medicine"
                    value="no"
                    className="form__input--radio"
                    checked={RadioMedicine === "no"}
                    onChange={radioHandler}/>
                  아니오
                </label>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="medicine"
                    value="yes"
                    className="form__input--radio"
                    checked={RadioMedicine === "yes"}
                    onChange={radioHandler} />
                  예
                </label>
              </div>
              <div className="form__input-wrap">
                {RadioMedicine === "yes" && <input type="text" id="medicineInput" ref={inputRadioMedicine} placeholder="복용약과 용량을 입력해 주세요. (선택)" className="form__input" />}
              </div>
            </div>
            {/* 주사 여부 */}
            <div className="form__item form__item--radio">
              <div className="form__flex">
                <div className="form__label-wrap">
                  <div className="form__label">주사 여부</div>
                </div>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="shot"
                    value="no"
                    className="form__input--radio"
                    checked={RadioShot === "no"}
                    onChange={radioHandler} />
                  아니오
                </label>
                <label className="form__radio">
                  <input
                    type="radio"
                    name="shot"
                    value="yes"
                    className="form__input--radio"
                    checked={RadioShot === "yes"}
                    onChange={radioHandler} />
                  예
                </label>
              </div>
              <div className="form__input-wrap">
                {RadioShot === "yes" && <input type="text" id="shotInput" ref={inputRadioShot} placeholder="메모를 입력해 주세요. (선택)" className="form__input" />}
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
            <button type="submit" className="form__btn">작성하기</button>
          </div>
          {!Valid && <Alert type="default" setValid={setValid} setDimOpen={setDimOpen} title="확인해 주세요." content="필수 값을 작성해주세요." />}
        </form>
      </Layout>
      {WriteComplete && <Alert type="submit" title="확인해 주세요." content="작성이 완료 되었습니다." />}
      {DimOpen && <Dim setDimOpen={setDimOpen} setValid={setValid}/>}
    </>
  )
}

export default Write