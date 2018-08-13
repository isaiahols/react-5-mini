import React, { Component } from "react";
import "./App.css";

// need Connect from react-redux
import { connect } from 'react-redux';
// need increment from ./ducks/counter';
import { increment, decrement, undoing, redoing } from './ducks/counter'


class App extends Component {
  render() {
    const { currentValue, previousValues, futureValues, increment, decrement, undoing, redoing } = this.props

    let disableUndo = previousValues.length?false:true;
    let disableRedo = futureValues.length?false:true;


    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => increment(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={disableUndo}
              onClick={() => undoing()}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={disableRedo}
              onClick={() => redoing()}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
        </section>
      </div>
    );
  }
}



// needs to know what we want from redux state
function getStateFromRedux(appState) {
  return {
    // Any properties here are put on this.props
    currentValue: appState.currentValue,
    futureValues: appState.futureValues,
    previousValues: appState.previousValues
  }
}

// needs to know what action builders we will use to talk back to redux
const actionOutputs = {
  increment,
  decrement,
  undoing,
  redoing
}
// connect redux to our component (App)
const connectToRedux = connect(getStateFromRedux, actionOutputs);

export default connectToRedux(App);
