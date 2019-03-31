import Component from '../../framework/Component'

export default class Temperature extends Component {
  constructor(host, props){
    super(host, props)
  }

  render() {
    return `${this.props.temerature}deg ${this.props.units}`
  }
}
