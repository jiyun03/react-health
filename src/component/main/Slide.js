import { useRef } from 'react'
import Anime from "../../assets/js/anime.js"

function Slide() {
  const publicFolder = process.env.PUBLIC_URL
  const slideArray = [0,1,2,3]
  const slideWrap = useRef(null)
  const EnableClick = useRef(true)
  const slideNav = useRef(null)
  const Index = useRef(0)

  // 현재 활성화 된 패널과 순서 값, 전체 패널 개수를 리턴
  const init = () => {
    const slideItem = slideWrap.current.children
    const len = slideItem.length
    const currentEl = slideWrap.current.querySelector(".s-active")
    const current_index = Array.from(slideItem).indexOf(currentEl)
    return [currentEl, current_index, len]
  }

  // 클릭한 네비 버튼의 순번을 통해서 이전, 다음 패널을 보여줄지 결정
  const showNav = (index) => {
    const [currentEl, current_index] = init()
    const target_index = index

    if (!EnableClick.current) return
    if (target_index > current_index) showSlide(currentEl, target_index, 1)
    if (target_index < current_index) showSlide(currentEl, target_index, -1)
  }

  // 실제로 인수로 받은 순번을 활성화 시키면서 모션을 발생
  const showSlide = (el, index, direction) => {
    EnableClick.current = false
    const slideItem = slideWrap.current.children

    // 기존 활성화 패널 왼쪽 밖으로 모션 이동
    new Anime(el, {
      prop: "left",
      value: -direction * 100 + "%",
      duration: 300,
      callback: () => {
        el.classList.remove("s-active")
        el.style.opacity = "0"
      },
    })

    // 패널 오른쪽 밖으로
    slideItem[index].style.opacity = "1"
    slideItem[index].style.left =  `${direction * 100}%`

    // 앞으로 활성화 될 패널 프레임 안쪽으로 모션 이동
    new Anime(slideItem[index], {
      prop: "left",
      value: "0%",
      duration: 300,
      callback: () => {
        slideItem[index].classList.add("s-active")
        EnableClick.current = true
      },
    })

    Index.current = index
    activation(index)
  }

  // 현재 활성화 버튼 활성화
  const activation = (index) => {
    for (const el of slideNav.current.children) el.classList.remove("s-active")
    slideNav.current.children[index].classList.add("s-active")
  }

  return (
    <div className="slide">
      {/* 슬라이드 */}
      <ul ref={slideWrap}>
        {slideArray.map((idx) => {
          return (
            <li key={`slide_${idx}`} className={`slide__item ${idx === 0 ? 's-active' : ''}`}>
              <img src={`${publicFolder}/assets/img/main/slide_${idx}.jpg`} alt="" />
            </li>
          )
        })}
      </ul>
      {/* 네비게이션 */}
      <ul className="slide__nav-wrap" ref={slideNav}>
        {slideArray.map((idx) => {
          return (
            <li key={`nav_${idx}`} className={`slide__nav ${idx === 0 ? 's-active' : ''}`} onClick={() => {showNav(idx)}}></li>
          )
        })}
      </ul>
    </div>
  )
}

export default Slide