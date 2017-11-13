import * as React from 'react';
import ReactMapboxGl, { Layer, Feature } from '../../../';

// tslint:disable-next-line:no-var-requires
const data = require('./heatmapData.json');
// tslint:disable-next-line:no-var-requires
const { token, styles } = require('./config.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  flex: 1
};

export interface Props {
  // tslint:disable-next-line:no-any
  onStyleLoad?: (map: any) => any;
}

const layerPaint = {
  'heatmap-weight': {
    property: 'averagePrice',
    type: 'exponential',
    stops: [
        [0, 0],
        [6, 1]
    ]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [
          [0, 1],
          [9, 3]
      ]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': {
    stops: [
          [0, 'rgba(33,102,172,0)'],
          [0.2, 'rgb(103,169,207)'],
          [0.4, 'rgb(209,229,240)'],
          [0.6, 'rgb(253,219,199)'],
          [0.8, 'rgb(239,138,98)'],
          [1, 'rgb(178,24,43)']
      ]
  },
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [
        [0, 2],
        [9, 20]
    ]
  }
};

export default class Heatmap extends React.Component<Props> {
  private center = [-0.109970527, 51.52916347];

  // tslint:disable-next-line:no-any
  private onStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  public render() {
    return (
      <Map
        style={styles.dark}
        center={this.center}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoad}
      >
        <Layer
          type="heatmap"
          paint={layerPaint as any}
        >
          {
            data.map((el: any) => (
              <Feature
                coordinates={el.latlng}
                properties={el}
              />
            ))
          }
        </Layer>
      </Map>
    );
  }
}
