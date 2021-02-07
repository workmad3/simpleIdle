import Decimal from 'break_infinity.js'

const createClicker = (name, cost, scaling, target) => {
  return {
    count: new Decimal(0),
    name,
    cost,
    scaling,
    target,
  }
}

const initialGameState = {
  clicks: createClicker('Click', new Decimal(0), new Decimal(0), null),
  autoClickerOne: createClicker('AutoClicker 1', Decimal.pow(10, 1), new Decimal(1.5), 'clicks'),
  autoClickerTwo: createClicker('AutoClicker 2', Decimal.pow(10, 2), new Decimal(2), 'autoClickerOne'),
  autoClickerThree: createClicker('AutoClicker 3', Decimal.pow(10, 4), new Decimal(2.5), 'autoClickerTwo'),
  autoClickerFour: createClicker('AutoClicker 4', Decimal.pow(10, 8), new Decimal(3), 'autoClickerThree'),
  autoClickerFive: createClicker('AutoClicker 5', Decimal.pow(10, 16), new Decimal(3.5), 'autoClickerFour'),
  ticks: new Decimal(0)
}

let tickInterval = null

const clickTarget = (clicks, clicker) => {
  if (clicks.count.gte(clicker.cost)) {
    return [
      {
        ...clicks,
        count: clicks.count.sub(clicker.cost)
      },
      {
        ...clicker,
        count: clicker.count.add(1),
        cost: clicker.cost.mul(clicker.scaling)
      }
    ]
    
  }
  return {
    clicks,
    clicker
  }
}

const autoClick = (clicker, target) => {
  return {
    ...target,
    count: target.count.add(clicker.count)
  }
}

const autoClicks = (game) => {
  const clickers = [
    game.autoClickerOne,
    game.autoClickerTwo,
    game.autoClickerThree,
    game.autoClickerFour,
    game.autoClickerFive
  ]

  return clickers.reduce((updatedGame, clicker) => {
    updatedGame[clicker.target] = autoClick(clicker, game[clicker.target])
    return updatedGame
  }, {})
}

const reducer = (state = initialGameState, action) => {
  switch(action.type) {
    case 'CLICK':
      if (action.target === 'clicks') {
        return {
          ...state,
          clicks: {
            ...state.clicks,
            count: state.clicks.count.add(1)
          }
        }
      }

      const [clicks, target] = clickTarget(state.clicks, state[action.target])
      const updatedState = {
        ...state,
        clicks
      }

      updatedState[action.target] = target

      return updatedState
    case 'TICK': 
      return {
        ...state,
        ...autoClicks(state),
        ticks: state.ticks.add(1)
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

export const stopTicks = () => {
  if (tickInterval) {
    clearInterval(tickInterval)
    tickInterval = null
  }
  return {
    type: 'STOP_TICKS'
  }
}

export const click = (target) => {
  return {
    type: 'CLICK',
    target
  }
}
