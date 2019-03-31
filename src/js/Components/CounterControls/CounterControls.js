import Component from '../../framework/Component'
import AppState from '../../Services/AppState'

export default class CounterControls extends Component {
  constructor(host, props){
    super(host, props)
    AppState.watch('COUNT', this.updateComponent)
  }

  init() {
    ['increment', 'decrement', 'updateComponent'].forEach(methodName => this[methodName] = this[methodName].bind(this))

    this.state = {...this.props}
  }

  updateComponent(newState) {
    this.updateState(newState)
  }

  render() {
    return [
      {
        tag: 'button',
        content: '-',
        eventHandlers: {
          click: this.decrement,
        },
      },
      {
        tag: 'button',
        content: '+',
        eventHandlers: {
          click: this.increment,
        },
      }

    ];
  }

  increment() {
    AppState.update('COUNT', {
        counterValue: this.state.counterValue + this.state.counterQuantifier
      })

  }

  decrement() {
    AppState.update('COUNT', {
      counterValue: this.state.counterValue - this.state.counterQuantifier
    })
    // this.state.counterValue = this.state.counterValue - this.state.counterQuantifier
    // this._render()
  }
}
