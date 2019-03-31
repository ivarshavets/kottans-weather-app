import Component from '../../framework/Component'
import { Temperature } from '../Temperature'
import { Counter } from '../Counter'
import { CounterControls } from '../CounterControls'
import { CounterResult } from '../CounterResult'

export default class App extends Component {
  constructor(host){
    super(host)
  }

  init() {
    this.state = {
      counterValue: 1,
      counterQuantifier: 2,
    }
  }

  render() {
    const temperatureEl = document.createElement('div')
    new Temperature(temperatureEl, {temerature: 'HTML', units: 'element'})

    return [
      { tag: Counter,
        props: {
          value: 5
        }
      },
      { tag: CounterControls,
        props: {
          counterValue: this.state.counterValue,
          counterQuantifier: this.state.counterQuantifier
        }
      },
      { tag: CounterResult,
        props: {
          counterValue: this.state.counterValue
        }
      },
      'This is a string',
      {
        tag: Temperature, //reference to class itself
        props: {
          temerature: 7,
          units: 'C'
        }
      },
      {
        tag: 'p',
        content: '<h4>Object - parent with children</h4>',
        classList: ['niceClass'],
        attributes: [{
          name: 'title',
          value: 'value of the div element'
        }],
        children: [
          {
            tag: Temperature,
            props: {
              temerature: 7,
              units: 'C'
            }
          },
        ]
      },
      temperatureEl, //html element
    ]
  }
}
