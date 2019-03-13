import React from 'react';
import Ideogram from 'ideogram';


class Chromosomes extends React.Component {
  constructor(props) {
    super(props);
    this.ideogram = null;
    // this.drawAnnotations = this.drawAnnotations.bind(this);
  }

  componentDidMount() {
    this.ideogram = new Ideogram({
      organism: 'human',
      dataDir: 'https://unpkg.com/ideogram@0.13.0/dist/data/bands/native/',
      container: '#ideo-container',
      onLoad: this.drawAnnotations,
    });
    return this.ideogram;
  }

  drawAnnotations = () => {
    console.log('Drawing...');
    console.log(this);
    console.log(this.props);
    console.log(this.props.variants);
    // this.state.variants.map(variant => <pre> {variant} </pre>)} </p>
  }

  render() {
    return (
      <div id="ideo-container" />
    );
  }
}

export default Chromosomes;
