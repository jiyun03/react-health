import React from 'react'
import Layout from "../common/Layout"

function Setting() {
  return (
    <Layout>
      <div className="setting">
        <div className="setting__box">
          <div className="setting__title">
            일반
          </div>
          <div className="setting__item-wrap">
            <div className="setting__item">
              프리미엄 구매
            </div>
            <div className="setting__item">
              잠금
            </div>
            <div className="setting__item">
              일지 쓰기 알리미
            </div>
          </div>
        </div>
        <div className="setting__box">
          <div className="setting__title">
            백업하기
          </div>
          <div className="setting__item-wrap">
            <div className="setting__item">
              백업 및 복구
            </div>
            <div className="setting__item">
              자동 백업 알림
            </div>
          </div>
        </div>
        <div className="setting__box">
          <div className="setting__title">
            회원
          </div>
          <div className="setting__item-wrap">
            <div className="setting__item">
              로그인
            </div>
            <div className="setting__item">
              회원가입
            </div>
          </div>
        </div>
        <div className="setting__box setting__box--content">
          <div className="setting__title--content">
            개발자에게 문의하기
          </div>
          <div className="setting__item--content">
            sprare06@dfy.co.kr
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Setting