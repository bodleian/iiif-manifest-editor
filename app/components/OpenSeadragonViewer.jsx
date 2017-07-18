import React from 'react'
import OpenSeadragonControls from 'OpenSeadragonControls'
import OpenSeadragon from 'openseadragon'

export default class OpenSeadragonViewer extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
        let { include_controls, include_navigator } = this.props
        let controls  = (include_controls)  ? <OpenSeadragonControls /> : ''
        let id = this.props.config.id ? this.props.config.id : this.props.default_config.id
        return (
                <div className="osd col-md-12">
                  <div className="openseadragon" id={id}>
                    {controls}
                  </div>
                </div>
        )
    }

    initSeaDragon(){
      OpenSeadragon(this._config())
    }

    componentDidMount(){
      this.initSeaDragon()
    }
     shouldComponentUpdate(nextProps, nextState){
        return false
    }

    _config() {
      return Object.assign(this.props.default_config, this.props.config)
    }
}

OpenSeadragonViewer.defaultProps = {  include_navigator: true,
                                      include_controls: true,
                                      default_config: {
                                        showNavigator: true,
                                        id: 'osd-viewer',
                                        visibilityRatio: 1.0,
                                        constrainDuringPan: false,
                                        defaultZoomLevel: 1,
                                        minZoomLevel: 1,
                                        maxZoomLevel: 10,
                                        zoomInButton: 'zoom-in',
                                        zoomOutButton: 'zoom-out',
                                        homeButton: 'reset',
                                        fullPageButton: 'full-page',
                                        nextButton: 'next',
                                        previousButton: 'previous',
                                      }
                                    }

const propTypes = {
  include_controls: React.PropTypes.bool,
  include_navigator: React.PropTypes.bool,
  config: React.PropTypes.object.isRequired
}

OpenSeadragonViewer.propTypes = propTypes