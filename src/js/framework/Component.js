export default class Component {
  constructor(host, props = {},) {
    this.host = host
    this.props = props
    this.init()
    this._render()
  }

  init() {}

  updateState(newProps) {
    this.state = Object.assign({}, this.state, newProps)
    this._render()
  }

  render() {
    return 'framework components render'
  }
  
  _render() {
    this.host.innerHTML = ""

    let content = this.render()

    if (!Array.isArray(content)) {
      content = [ content ]
    }

    content.map(el => this._vDomPrototypeElementToHtmlElement(el))
      .forEach(htmlEl => {
        this.host.appendChild(htmlEl)
      })
  }

  _vDomPrototypeElementToHtmlElement(element) {
    if (typeof element === 'string') {
      let container
      const isHtml = element.trim().replace(/<([A-Z][a-zA-Z]*)(.*)\/>/g)

      if (isHtml) {
        container = document.createElement('div')
        container.innerHTML = element
      } else {
        container = document.createTextNode(element)
      }
      return container
    } else {
      if (element.tag) {
        if (typeof element.tag === 'function') {
          const container = document.createElement('div') //createDocumentFragment()
          new element.tag(container, element.props)

          return container
        } else {
          const container = document.createElement(element.tag)

          if (element.content !== undefined) {
            container.innerHTML = element.content
          }

          ['classList', 'attributes', 'children'].forEach(item => {
            if (element[item] && !Array.isArray(element[item])) {
              element[item] = [element[item]]
            }
          })

          if (element.classList) {
            container.classList.add(...element.classList)
          }

          if (element.attributes) {
            element.attributes.forEach(attr => {
              container.setAttribute(attr.name, attr.value)
            })
          }

          if (element.children) {
            element.children.forEach(child => {
              const htmlChildEl = this._vDomPrototypeElementToHtmlElement(child)
              container.appendChild(htmlChildEl)
            })
          }

          if (element.eventHandlers) {
            Object.keys(element.eventHandlers).forEach(eventType => {
              container.addEventListener(eventType, element.eventHandlers[eventType])
            })
          }
          return container
        }
      }
      return element //not container?
    }
  }
}
