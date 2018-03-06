import React from 'react';
import Ideogram from 'ideogram';


class Chromosomes extends React.Component {
  componentDidMount() {
    return new Ideogram({
      organism: 'human',
      dataDir: 'https://unpkg.com/ideogram@0.13.0/dist/data/bands/native/',
      container: '#ideo-container',
    });
  }

  render() {
    return (
      <div id="ideo-container" />
    );
  }
}

export default Chromosomes;
