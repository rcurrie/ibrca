import React from 'react';
import PromiseFileReader from 'promise-file-reader';
import Dropzone from 'react-dropzone';
import pako from 'pako';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastq: null,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    // When debugging auto-load sample files
    if (window.location.hostname === 'localhost') {
      fetch('samples/TEST_R1.fastq.gz')
        .then(file => file.blob())
        .then(blob => this.parseFASTQ(blob))
        .catch(error => console.log(error));
    }
  }

  onDrop(files) {
    files.forEach((file) => {
      if (file.name.endsWith('fastq.gz')) {
        this.parseFASTQ(file);
      } else {
        /* eslint no-alert: 0 */
        window.alert('Unknown file type, must be clinical .xlsx or genomic .xml');
      }
    });
  }

  parseFASTQ(file) {
    // See https://github.com/robertaboukhalil/fastq.bio/blob/master/fastq.bio.js
    PromiseFileReader.readAsArrayBuffer(file)
      .then((arrayBuffer) => {
        console.log('Parsing FASTQ file');
        const data = new Uint8Array(arrayBuffer);
        const inflated = pako.inflate(data);
        const fastq = new TextDecoder('utf-8').decode(inflated).split('\n');
        console.log(fastq[0]);
        this.setState({ fastq });
      })
      .catch(error => console.log(error));
  }

  render() {
    const reads = this.state.fastq ? this.state.fastq.slice(0, 4) : [];
    const listItems = reads.map(read => <p> {read} </p>);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">iBRCA</h1>
        </header>
        <Dropzone
          onDrop={this.onDrop}
          style={{ width: '100%', height: '100%', border: '2px dashed black' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>Drag and drop files, or click for a file dialog to import.</p>
          </div>
          <p>Reads: {this.state.fastq ? this.state.fastq.length / 4 : 0}</p>
          <div>{listItems}</div>
        </Dropzone>
      </div>
    );
  }
}

export default App;
