import React from 'react';
import PromiseFileReader from 'promise-file-reader';
import Dropzone from 'react-dropzone';
// import pako from 'pako';
import './App.css';
import Chromosomes from './Chromosomes.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variants: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    // When debugging auto-load sample files
    if (window.location.hostname === 'localhost') {
      // fetch('samples/TEST_R1.fastq.gz')
      //   .then(file => file.blob())
      //   .then(blob => this.parseFASTQFile(blob))
      //   .catch(error => console.log(error));
      fetch('samples/color.json')
        .then(file => file.blob())
        .then(text => this.parseColorFile(text))
        .catch(error => console.log(error));
    }
  }

  onDrop(files) {
    files.forEach((file) => {
      if (file.name.endsWith('json')) {
        this.parseColorFile(file);
      // if (file.name.endsWith('fastq.gz')) {
      //   this.parseFASTQFile(file);
      } else {
        /* eslint no-alert: 0 */
        window.alert('Unknown file type, must be clinical .xlsx or genomic .xml');
      }
    });
  }

  parseColorFile(file) {
    console.log('Parsing Color JSON file');
    PromiseFileReader.readAsText(file)
      .then(text => JSON.parse(text))
      .then((color) => {
        if (color.type !== 'gene_report.released') {
          throw new Error('Illegal argument: ');
        }
        const variants = color.data.variants.map(variant => variant.chgvs);
        this.setState({ variants });
      })
      .catch(error => console.log(error));
  }

  // parseFASTQFile(file) {
  //   // See https://github.com/robertaboukhalil/fastq.bio/blob/master/fastq.bio.js
  //   PromiseFileReader.readAsArrayBuffer(file)
  //     .then((arrayBuffer) => {
  //       console.log('Parsing FASTQ file');
  //       const data = new Uint8Array(arrayBuffer);
  //       const inflated = pako.inflate(data);
  //       const fastq = new TextDecoder('utf-8').decode(inflated).split('\n');
  //       console.log(fastq[0]);
  //       // const reads = fastq.slice(0, 4) : [];
  //       const reads = fastq.filter((value, index) => index % 4 === 1);
  //       this.setState({ reads });
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">iGene</h1>
        </header>
        <Chromosomes variants={this.state.variants} />
        <Dropzone
          onDrop={this.onDrop}
          style={{ width: '100%', height: '50%', border: '2px dashed black' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>Drag and drop files, or click for a file dialog to import.</p>
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default App;
