const initialGameState = {
  clicks: 0,
  autoClickers: {

  },
  ticks: 0
}

let tickInterval = null

const reducer = (state = initialGameState, action) => {
  switch(action.type) {
    case 'CLICK':
      return {
        ...state,
        clicks: state.clicks + 1
      }
    case 'TICK': 
      return { 
        ...state, 
        ticks: state.ticks + 1 
      }
    default:
      return state
  }
}

export default reducer

export const startTicks = (ticksPerSecond) => {
  const interval = Math.round(1000 / ticksPerSecond)
  if (tickInterval) {
    clearInterval(tickInterval)
    tickInterval = null
  }

  return async (dispatch) => {
    tickInterval = setInterval(() => dispatch({ type: 'TICK' }), interval)  
  }
}

export const click = () => {
  return {
    type: 'CLICK'
  }
}
