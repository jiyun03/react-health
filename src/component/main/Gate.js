import GateItem from './GateItem'

function Gate() {
  const publicFolder = process.env.PUBLIC_URL
  const gateItem = [
    {
      title: '일정 목록보기',
      subtitle: '차곡차곡 쌓아가는 나의 건강일지',
      link: '/list',
      tag: '리스트',
      img: publicFolder+'/assets/img/main/gate_0.png',
      className: 'blue',
    },
    {
      title: '일정 작성하기',
      subtitle: '나만의 건강일지를 작성해봐요',
      link: '/write',
      tag: '작성',
      img: publicFolder+'/assets/img/main/gate_1.png',
      className: 'pink',
    },
    {
      title: '일지 모아보기',
      subtitle: '당신은 요즘 건강하신가요?',
      link: '/calender',
      tag: '달력',
      img: publicFolder+'/assets/img/main/gate_2.png',
      className: 'green',
    },
  ]
  
  return (
    <div className="gate">
      <div className="gate__title">바로가기</div>
      <ul className="gate-item-wrap">
        {gateItem.map((el, index) => {
          return (
            <GateItem
              key={`gate${index}`}
              title={el.title}
              subtitle={el.subtitle}
              link={el.link}
              tag={el.tag}
              img={el.img}
              className={el.className} />
          )
        })}
      </ul>
    </div>
  )
}

export default Gate