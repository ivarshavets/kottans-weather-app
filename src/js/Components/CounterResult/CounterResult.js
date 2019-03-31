import Component from '../../framework/Component'
import AppState from '../../Services/AppState'

export default class CounterResult extends Component {
  constructor(host, props){
    super(host, props)
    AppState.watch('COUNT', this.updateComponent)
  }

  init() {
    this.updateComponent = this.updateComponent.bind(this)
    this.state = {...this.props}
  }

  updateComponent(newState) {
    this.updateState(newState)
  }

  render() {
    return this.state.counterValue !== undefined ? [
      {
        tag: 'div',
        content: this.state.counterValue
      }
    ] : ''
  }
}
