function LoadingLayer() {
  return (
    <div className="loading">
      <div className="loading__icon-wrap">
        <div className="loading__icon"></div>
        <div className="loading__icon"></div>
        <div className="loading__icon"></div>
      </div>
      <div className="loading__title">
        Loading...
      </div>
    </div>
  )
}

export default LoadingLayer