import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class ZipSearch extends React.Component {
        state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`http://ctp-zip-api.herokuapp.com/zip/10016`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <div>
                {this.state.persons.map(person => <p>{person.City},{person.State}</p>)}
            </div>
        )
    }
}
/*
const divStyle = {
    fontSize: '300%',
    fontWeight: 'bold',
    fontFamily: "Times New Roman",
    color: '#ffffcc'
}

const boxColor = {
    paddingTop: '50px',
    paddingBottom: '40px',
    paddingLeft: '80px',
    backgroundColor: '#ff0066',
    marginLeft: '50px',
    marginTop: '20px',
    marginRight: '50px'
}
const search = {
    fontFamily: 'Impact',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
}

render(){
    <div>
        <div style={boxColor}>
            <div style={divStyle} >
                Zip Code Search
            </div>
        </div>
        <form style={search}>
            <label>
                Zip Code:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>}
);*/



ReactDOM.render(
    <ZipSearch />,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
