import React, { Component } from 'react';
import TextInput from './TextInput';
import ShowTask from './ShowTask';
import Select from 'react-select-plus';
import Menu, {SubMenu, MenuItem} from 'rc-menu';
// import 'react-select-plus/dist/react-select-plus.css';
import '../Style.css';
// import 'react-select-plus/dist/react-select-plus.css';
// import 'rc-menu/assets/index.css'
// import '../Hidden.css';
// import '../DictSelect.css';
// import '../DictSelectMenu.css';
// import '../SelectElement.css';
// import '../MenuElement.css';
import '../rc-menu.css';
import '../react-select-plus.css';
// import Dictionary from './Dictionary';

// const file = require('../dictionary/project_gutenberg_top100.txt');
// var util = require('util');
// var isError;

class Boyarin extends Component {
  state = {
    text: 'the quick brown fox jumps over the lazy dog',
    dictionary: 'the quick brown fox jumps over the lazy dog',
    toCheck: null,
    // currentText: null,
    error: null,
    // myTxt: null,
    newDictionary: null,
    file: require('../dictionary/rui_top200.txt'),
    inputValue: '',
    value: 'Русский интернет-корпус топ 200'
  }

  

  componentDidMount() {
    this.loadText(this.state.file);
  }

  handleDictSelect = (selectedOption) => {
    this.setState({ file: selectedOption.value }, () => this.loadText(this.state.file));
    this.setState({value: selectedOption.label})
    // console.log(`Selected: ${selectedOption.label}`);
    // console.log(this.state.file);
  }

  handleSelect = (selectedOption) => {
    this.setState({ file: selectedOption.key }, () => this.loadText(this.state.file));
    // this.setState({value: selectedOption.title})
    console.log(selectedOption.title);
    this.setState({value: selectedOption.item.props.children})
    console.log(`Selected: ${selectedOption.item.props.children}`);
    // console.log(util.inspect(selectedOption));
    // console.log(this.state.file);
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
    const taskLength = 17;
    const newDict = preTask.split(/\r?\n/g);
    var preReadyDict = newDict[firstRandomElement] + ' ';
    for (let i = 1; i < taskLength; i++) {
      const randomElement = Math.floor(Math.random() * (dictLength - 2)) + 1;
      if (i !== (taskLength-1)) {
      preReadyDict = preReadyDict + newDict[randomElement] + ' ';
      } else {
        preReadyDict = preReadyDict + newDict[randomElement];
      }
    }
    this.setState({dictionary: preReadyDict});
  }

  textCheckHandler = event => {
    const enteredValue = event.target.value
    this.setState({
      toCheck: enteredValue,
      inputValue: enteredValue,
    });
    const dictionary = this.state.dictionary;
    const dictLength = dictionary.length;
    const enteredLength = enteredValue.length;
    const toCheck = dictionary.substr(0, enteredLength);

    // if (dictLength >= enteredLength && !dictionary.includes(enteredValue)){
    if (dictLength >= enteredLength && toCheck !== enteredValue){
    // if (toCheck !== enteredValue){
      this.setState({ error: 'Error' });
      // console.log(dictionary, enteredValue)
    } else if (dictLength< enteredLength && !enteredValue.includes(dictionary)){
      this.setState({error: 'Error'})
    } else {
      this.setState({error: null});
      // console.log(enteredValue, dictionary)
      if (dictLength < enteredLength) {
        // console.log('--', dictLength, enteredValue.length, enteredValue, dictionary)
        this.grabDictionary('newtext');
        this.setState({inputValue: ''});
      }
    }
  }

  render () {

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    var placeholder = <span>{this.state.value}</span>;

    const DictSelectMenu = (
      <Menu
        // className='MenuElement'
        multiple
        onClick={this.handleSelect}
        // onDeselect={handleDeselect}
        // defaultSelectedKeys={['2', '1-1']}
        triggerSubMenuAction={'click'}
      >
        <SubMenu title={placeholder} key="1" className='rc-menu-main'>
          <SubMenu title='Списки частотности/Русский интернет-корпус' key="5" className='MenuElement'>
            <MenuItem key={require('../dictionary/rui_top100.txt')}>Русский интернет-корпус топ 100</MenuItem>
            <MenuItem key={require('../dictionary/rui_top200.txt')}>Русский интернет-корпус топ 200</MenuItem>
            <MenuItem key={require('../dictionary/rui_top500.txt')}>Русский интернет-корпус топ 500</MenuItem>
            <MenuItem key={require('../dictionary/rui_top1000.txt')}>Русский интернет-корпус топ 1000</MenuItem>
            <MenuItem key={require('../dictionary/rui_top2000.txt')}>Русский интернет-корпус топ 2000</MenuItem>
            <MenuItem key={require('../dictionary/rui_top5000.txt')}>Русский интернет-корпус топ 5000</MenuItem>
          </SubMenu>
          <SubMenu title='Списки частотности/Национальный корпус русского языка' key="2" className='MenuElement'>
            <MenuItem key={require('../dictionary/rlnc_top100.txt')}>Национальный корпус русского языка топ 100</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top200.txt')}>Национальный корпус русского языка топ 200</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top500.txt')}>Национальный корпус русского языка топ 500</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top1000.txt')}>Национальный корпус русского языка топ 1000</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top2000.txt')}>Национальный корпус русского языка топ 2000</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top5000.txt')}>Национальный корпус русского языка топ 5000</MenuItem>
            <MenuItem key={require('../dictionary/rlnc_top10000.txt')}>Национальный корпус русского языка топ 10000</MenuItem>
          </SubMenu>
          <SubMenu title='Frequency lists/Contemporary fiction' key="3" className='MenuElement'>
            <MenuItem key={require('../dictionary/contemp_fiction_top100.txt')}>Contemporary fiction top 100</MenuItem>
            <MenuItem key={require('../dictionary/contemp_fiction_top200.txt')}>Contemporary fiction top 200</MenuItem>
            <MenuItem key={require('../dictionary/contemp_fiction_top300.txt')}>Contemporary fiction top 300</MenuItem>
            <MenuItem key={require('../dictionary/contemp_fiction_top500.txt')}>Contemporary fiction top 500</MenuItem>
            <MenuItem key={require('../dictionary/contemp_fiction_top1000.txt')}>Contemporary fiction top 1000</MenuItem>
            <MenuItem key={require('../dictionary/contemp_fiction_top2000.txt')}>Contemporary fiction top 2000</MenuItem>
          </SubMenu>
          <SubMenu title='Frequency lists/Project Gutenberg' key="4" className='MenuElement'>
            <MenuItem key={require('../dictionary/project_gutenberg_top100.txt')}>Project Gutenberg top 100</MenuItem>
            <MenuItem key={require('../dictionary/project_gutenberg_top1000.txt')}>Project Gutenberg top 1000</MenuItem>
            <MenuItem key={require('../dictionary/project_gutenberg_top2000.txt')}>Project Gutenberg top 2000</MenuItem>
            <MenuItem key={require('../dictionary/project_gutenberg_top5000.txt')}>Project Gutenberg top 5000</MenuItem>
            <MenuItem key={require('../dictionary/project_gutenberg_top10000.txt')}>Project Gutenberg top 10000</MenuItem>
          </SubMenu>

          {/* <MenuItem key="1-2">0-2</MenuItem>
          <MenuItem key="1-3">0-1</MenuItem>
          <MenuItem key="1-4">0-1</MenuItem> */}
        </SubMenu>
        
        
        
        
      </Menu>
    );

    // const rui = [
    //   { value: require('../dictionary/rui_top100.txt'), label: 'Русский интернет-корпус топ 100', className: 'SelectElement' },
    //   { value: require('../dictionary/rui_top200.txt'), label: 'Русский интернет-корпус топ 200', className: 'SelectElement' },
    //   { value: require('../dictionary/rui_top500.txt'), label: 'Русский интернет-корпус топ 500', className: 'SelectElement' },
    //   { value: require('../dictionary/rui_top1000.txt'), label: 'Русский интернет-корпус топ 1000', className: 'SelectElement' },
    //   { value: require('../dictionary/rui_top2000.txt'), label: 'Русский интернет-корпус топ 2000', className: 'SelectElement' },
    //   { value: require('../dictionary/rui_top5000.txt'), label: 'Русский интернет-корпус топ 5000', className: 'SelectElement' },
    // ]

    // const rlnc = [
    //   { value: require('../dictionary/rlnc_top100.txt'), label: 'Национальный корпус русского языка топ 100', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top200.txt'), label: 'Национальный корпус русского языка топ 200', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top500.txt'), label: 'Национальный корпус русского языка топ 500', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top1000.txt'), label: 'Национальный корпус русского языка топ 1000', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top2000.txt'), label: 'Национальный корпус русского языка топ 2000', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top5000.txt'), label: 'Национальный корпус русского языка топ 5000', className: 'SelectElement' },
    //   { value: require('../dictionary/rlnc_top10000.txt'), label: 'Национальный корпус русского языка топ 10000', className: 'SelectElement' },
    // ]
    // const pg=[
    //   { value: require('../dictionary/project_gutenberg_top100.txt'), label: 'Project Gutenberg top 100', className: 'SelectElement' },
    //   { value: require('../dictionary/project_gutenberg_top1000.txt'), label: 'Project Gutenberg top 1000', className: 'SelectElement' },
    //   { value: require('../dictionary/project_gutenberg_top2000.txt'), label: 'Project Gutenberg top 2000', className: 'SelectElement' },
    //   { value: require('../dictionary/project_gutenberg_top5000.txt'), label: 'Project Gutenberg top 5000', className: 'SelectElement' },
    //   { value: require('../dictionary/project_gutenberg_top10000.txt'), label: 'Project Gutenberg top 10000', className: 'SelectElement' },
    // ];
  
    // const cf=[
    //   { value: require('../dictionary/contemp_fiction_top100.txt'), label: 'Contemporary fiction top 100', className: 'SelectElement' },
    //   { value: require('../dictionary/contemp_fiction_top200.txt'), label: 'Contemporary fiction top 200', className: 'SelectElement' },
    //   { value: require('../dictionary/contemp_fiction_top300.txt'), label: 'Contemporary fiction top 300', className: 'SelectElement' },
    //   { value: require('../dictionary/contemp_fiction_top500.txt'), label: 'Contemporary fiction top 500', className: 'SelectElement' },
    //   { value: require('../dictionary/contemp_fiction_top1000.txt'), label: 'Contemporary fiction top 1000', className: 'SelectElement' },
    //   { value: require('../dictionary/contemp_fiction_top2000.txt'), label: 'Contemporary fiction top 2000', className: 'SelectElement' },
    // ];

    const options = [
      { value: require('../dictionary/contemp_fiction_top100.txt'), label: 'Contemporary fiction top 100', className: 'SelectElement' },
      { value: require('../dictionary/contemp_fiction_top200.txt'), label: 'Contemporary fiction top 200', className: 'SelectElement' },
      { value: require('../dictionary/contemp_fiction_top300.txt'), label: 'Contemporary fiction top 300', className: 'SelectElement' },
      { value: require('../dictionary/contemp_fiction_top500.txt'), label: 'Contemporary fiction top 500', className: 'SelectElement' },
      { value: require('../dictionary/contemp_fiction_top1000.txt'), label: 'Contemporary fiction top 1000', className: 'SelectElement' },
      { value: require('../dictionary/contemp_fiction_top2000.txt'), label: 'Contemporary fiction top 2000', className: 'SelectElement' },
      { value: require('../dictionary/project_gutenberg_top100.txt'), label: 'Project Gutenberg top 100', className: 'SelectElement' },
      { value: require('../dictionary/project_gutenberg_top1000.txt'), label: 'Project Gutenberg top 1000', className: 'SelectElement' },
      { value: require('../dictionary/project_gutenberg_top2000.txt'), label: 'Project Gutenberg top 2000', className: 'SelectElement' },
      { value: require('../dictionary/project_gutenberg_top5000.txt'), label: 'Project Gutenberg top 5000', className: 'SelectElement' },
      { value: require('../dictionary/project_gutenberg_top10000.txt'), label: 'Project Gutenberg top 10000', className: 'SelectElement' },
      { value: require('../dictionary/rui_top100.txt'), label: 'Русский интернет-корпус топ 100', className: 'SelectElement' },
      { value: require('../dictionary/rui_top200.txt'), label: 'Русский интернет-корпус топ 200', className: 'SelectElement' },
      { value: require('../dictionary/rui_top500.txt'), label: 'Русский интернет-корпус топ 500', className: 'SelectElement' },
      { value: require('../dictionary/rui_top1000.txt'), label: 'Русский интернет-корпус топ 1000', className: 'SelectElement' },
      { value: require('../dictionary/rui_top2000.txt'), label: 'Русский интернет-корпус топ 2000', className: 'SelectElement' },
      { value: require('../dictionary/rui_top5000.txt'), label: 'Русский интернет-корпус топ 5000', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top100.txt'), label: 'Национальный корпус русского языка топ 100', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top200.txt'), label: 'Национальный корпус русского языка топ 200', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top500.txt'), label: 'Национальный корпус русского языка топ 500', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top1000.txt'), label: 'Национальный корпус русского языка топ 1000', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top2000.txt'), label: 'Национальный корпус русского языка топ 2000', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top5000.txt'), label: 'Национальный корпус русского языка топ 5000', className: 'SelectElement' },
      { value: require('../dictionary/rlnc_top10000.txt'), label: 'Национальный корпус русского языка топ 10000', className: 'SelectElement' },

    ]

    const menuItemStyle = {
      backgroundColor: '#252c35',
      color: '98c359',
    }

    return (
      <div>
           {/* <div className='Table'>
           <div className='Menu'>
             <div className='rc-menu'>{DictSelectMenu}</div>
              <div className='Empty div'>Выберите режим</div> 

             <div className='react-select-plus'>
               <Select 
              className='react-select-plus'
                 value={value}
                 placeholder={placeholder}
                onChange={this.handleDictSelect}
                 options={options}
                 searchable={false}
                 />
               </div>
             </div>
           </div>  */}
      <div className='Menu'>
          <div className='rc-menu'>{DictSelectMenu}</div>
      </div>

          <TextInput
            isError={this.state.error}
            changed={(event) => {
              this.textCheckHandler(event)
              }}
            value={this.state.inputValue}
          />

        <div className='App'>
          <ShowTask task = {this.state.dictionary} />
        </div>

        <div className="App" >
          <div>
            {this.state.error}
          </div>
        </div>

      </div>
    )
  }
}

export default Boyarin;