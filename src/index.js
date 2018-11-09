import React from "react";
import ReactDOM from "react-dom";

const CountContext = React.createContext(0);

class Displayer extends React.Component {
  static contextType = CountContext;
  render() {
    return <div>value: {this.context.count}</div>;
  }
}

function DisplayerF() {
  return (
    <CountContext.Consumer>
      {value => <div>value: {value.count}</div>}
    </CountContext.Consumer>
  );
}

class Button extends React.Component {
  static contextType = CountContext;
  render() {
    return <button onClick={() => this.context.add(1)}>Click 1</button>;
  }
}

function ButtonF() {
  return (
    <CountContext.Consumer>
      {value => <button onClick={() => value.add(2)}>Click 2</button>}
    </CountContext.Consumer>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.add = num => {
      this.setState(state => ({
        count: state.count + num
      }));
    };

    this.state = {
      count: 0,
      add: this.add
    };
  }

  render() {
    return (
      <CountContext.Provider value={this.state}>
        <Displayer />
        <DisplayerF />
        <Button />
        <ButtonF />
      </CountContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
