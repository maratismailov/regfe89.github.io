import React from "react";

class Dictionary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: null,
      preTask: 'lkaeirlskd'
    };
  }
  
  componentDidMount() {
    this.loadText(this.props.file);
  }

  loadText = path => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      const allText = xhr.responseText;
      // console.log(allText);
      this.setState({preTask: allText}, () => this.grabDictionary());
    }
    xhr.send(null);
  }

  grabDictionary = () => {
    const preTask = this.state.preTask
    const dictLength = preTask.split('\n').length;
    const firstRandomElement = Math.floor(Math.random() * (dictLength - 2)) + 1;
    const taskLength = 2;
    const newDict = preTask.split(/\r?\n/g);
    var preReadyDict = newDict[firstRandomElement] + ' ';
    for (let i = 1; i < taskLength; i++) {
      const randomElement = Math.floor(Math.random() * (dictLength - 2)) + 1;
      if (i !== (taskLength-1)) {
      preReadyDict = preReadyDict + newDict[randomElement] + ' ';
      } else {
        preReadyDict = preReadyDict + newDict[randomElement];
      }
      // console.log(newDict[randomElement]);
      // console.log(newDict[randomElement]);
      // console.log(randomElement);
    }
    this.props.triggerParentUpdate(preReadyDict);
    this.setState({task: preReadyDict});
    // console.log(preReadyDict);
  }

  render() {
    return (
      <div>
        {this.state.task}
      </div>
    );
  }
}

export default Dictionary;