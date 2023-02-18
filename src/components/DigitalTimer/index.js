// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStarted: false, minutes: 25, seconds: 0}

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    const {minutes, seconds} = this.state
    const isTimeCompleted = seconds === minutes * 60
    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  changeState = () => {
    const {isStarted, minutes, seconds} = this.state
    const timeCompleted = seconds === minutes * 60
    if (timeCompleted) {
      this.setState({seconds: 0})
    }
    if (isStarted) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.startTimer, 1000)
    }

    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  resetClicked = () => {
    this.clearTimeInterval()
    this.setState({isStarted: false, minutes: 25, seconds: 0})
  }

  increaseTime = () => {
    const {isStarted, minutes} = this.state

    this.setState({minutes: minutes + 1})
  }

  decreaseTime = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const totalRemainingSeconds = minutes * 60 - seconds
    const totalMinutes = Math.floor(totalRemainingSeconds / 60)
    const totalSeconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes =
      totalMinutes > 9 ? totalMinutes : `0${totalMinutes}`
    const stringifiedSeconds =
      totalSeconds > 9 ? totalSeconds : `0${totalSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStarted, minutes, seconds} = this.state
    const timerState = isStarted ? 'Running' : 'Paused'
    const stateUrl = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const stateAlt = isStarted ? 'pause icon' : 'play icon'
    const stateText = isStarted ? 'Pause' : 'Start'
    const isDisabled = seconds > 0

    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <div className="timer-bg-image">
            <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
            <p>{timerState}</p>
          </div>
          <div>
            <button type="button" onClick={this.changeState}>
              <img src={stateUrl} alt={stateAlt} />
              {stateText}
            </button>
            <button type="button" onClick={this.resetClicked}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              Reset
            </button>
            <p>Set Timer limit</p>
          </div>
          <div>
            <button
              type="button"
              onClick={this.decreaseTime}
              disabled={isDisabled}
            >
              -
            </button>
            <p>{minutes}</p>
            <button
              type="button"
              onClick={this.increaseTime}
              disabled={isDisabled}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
