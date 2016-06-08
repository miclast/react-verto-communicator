import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, PhoneIconSVG, RemoveIconSVG, DeleteIconSVG } from './svgIcons';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string,
  lastNumber : React.PropTypes.string
};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {number: this.props.nbrToDial, inputFocused: false, lcDisplayed: false};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: "column",
        maxWidth: "500px",
        '@media (max-width: 768px)': {
          width: '90vw'
        },
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)'
      },
      header: {
        //zIndex: '-1',
        //position: 'relative',
        //background: "#eee",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        width: '100%',
        padding: '15px',
        borderBottom: '2px solid #ccc'
      },
      callhist : {
        width: "24px",
        height: "24px",
        fill: "green"
      },
      span : {
        width: '24px'
      },
      // lastcall: {
      //   display: /* this.state.redialing ? 'flex' : */'none',
      //   zIndex: /* this.state.redialing ? 'auto' : */'-1',
      //   position: 'absolute',
      //   right: '500px',
      //   padding: '0px 20px 0px 20px',
      //   backgroundColor: '#fff',
      //   borderRadius: '2px'
      // },
      // lctriangle: {
      //   display: 'none',
      //   content: '" "',
      //   width: '0px',
      //   height: '0px',
      //   borderStyle: 'solid',
      //   borderWidth: '8px 0px 8px 16px',
      //   borderColor:  'transparent transparent transparent ' + '#fff',
      //   position: 'absolute',
      //   top: '10px',
      //   right: '-8px'
      // },
      input: {
        backgroundColor: 'transparent',
        color: '#4a4a4a',
        width: '80%',
        padding: '10px',
        border: 'none',
        outline: 'none',
        fontSize: '3em',
        '@media (max-width: 768px)': {
          fontSize: '1em'
        }
      },
      remove : {
        display: this.state.number ? 'block' : 'none',
        width: "24px",
        height: "24px",
        fill: "#ccc",
        cursor: 'pointer'
      },
      back : {
        width: "24px",
        height: "24px",
        fill: "#ccc",
        cursor: 'pointer'
      },
      bar: {
        zIndex: this.state.inputFocused ? 'auto' : '-1',
        position: 'relative',
        bottom: '2px',
        padding: '0px 14px 0px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        content: '" "',
        height: '2px',
        borderWidth: '2px',
        borderColor: '#ccc',
        width: '101%',
        backgroundColor: '#ccc'
      },
      left: {
        content: '" "',
        height: '2px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : this.state.inputFocused ? 'left 1s' : 'left 0s',
        left: this.state.inputFocused ?  '0%' : '50%',
        right: '50%'
      },
      right: {
        content: '" "',
        height: '2px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : this.state.inputFocused ? 'right 1s' : 'right 0s',
        right: this.state.inputFocused ?  '0%' : '50%',
        left: '50%'
      },
      bodycont: {
        width: '100%'
      },
      callcont: {
        width: '100%',
        paddingTop: '15px',
        paddingBottom: '15px',
        display: 'flex',
        justifyContent: 'center'
      },
      callbg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#4caf50",
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        cursor: 'pointer'
      },
      call: {
        width: "24px",
        height: "24px",
        fill: "#fff",
        transformOrigin: '50% 50%'
        }

    };

    return (styles[styleName]);
  }

  makeCall(){
    if(this.state.number) {
      // makes a call if there is a number entered.
      this.props.cbCall(this.state.number);
    } else {
      // if there is NOT a number it gets the last number dialed.
      this.setState({...this.state, number: this.props.lastNumber, redialing: true });
      // setTimeout(()=>{
      //   this.setState({...this.state, redialing: false});
      // }, 5000);
    }
  }

  changingNumber(e){
    //TODO convert letter to numeric
    this.setState({ ...this.state, number: e.target.value });
  }

  dialNumber(k) {
    this.setState({ ...this.state, number: this.state.number + k });
  }

  render() {


    return (
      <div
            style={{...this.getDefaultStyle('container')}}
            onKeyPress={(e)=>{
              if(e.which == 13 || e.keyCode == 13) {
                this.makeCall();
                return false;
              }}}
          >
        <div style={{...this.getDefaultStyle('header')}}>
          <span
              style={{...this.getStyle('span')}}
              onClick={()=>{}}
          >
            <CallHistoryIconSVG
              svgStyle={{...this.getDefaultStyle('callhist')}} />
          </span>
          <input
              placeholder="Enter an extension"
              style={{...this.getDefaultStyle('input')}}
              value={this.state.number}
              onChange={this.changingNumber.bind(this)}
              onFocus={()=>{
                this.setState({...this.state,'inputFocused': true});
              }}
              onBlur={()=>{
                this.setState({...this.state,'inputFocused': false});
              }}
          />
          <span
              style={{...this.getStyle('span')}}
              onClick={()=>{
                const number = this.state.number;
                const newNumber = number.slice(0, number.length - 1);
                this.setState({...this.state,'number': newNumber });
              }}
          >
            <DeleteIconSVG svgStyle={{...this.getDefaultStyle('back')}}
          />
          </span>
        </div>
        <div style={{...this.getStyle('bar')}}>
          <span className="left" style={{...this.getStyle('left')}}> &nbsp;</span>
          <span className="right" style={{...this.getStyle('right')}}>&nbsp; </span>
        </div>
        <Numberpad cbClick={this.dialNumber.bind(this)} />
        <div
            onFocus={()=>{
              this.setState({...this.state,'inputFocused': false});
            }}
            style={{...this.getDefaultStyle('callcont')}}>
          <div
              onClick={this.makeCall.bind(this)}
              style={{...this.getDefaultStyle('callbg')}} >
            <PhoneIconSVG
                svgStyle={{...this.getDefaultStyle('call')}}
                svgTransform="rotate(15)"
            />
          </div>
        </div>
      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Radium(Dialpad);
