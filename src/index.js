import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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

const result = {
    display: 'flex',
    justifyContent: 'center'
}

export default class ZipSearch extends React.Component{
    state = {
        cities: [],
        zip : '11435'
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip).
            then(results => {
                this.setState({ cities: results.data });
                console.log(this.state.cities);
            });
    }

    handleChange = event => {
        this.setState({ zip: event.target.value });
    };

    /*constructor(props) {
        super(props);
        this.url = "http://ctp-zip-api.herokuapp.com/zip/10016";
        this.state = {
           // zip: "",
            cities: []
        };
    }

    

    componentDidMount() {
        axios.get(this.props.url + this.state.zip)
            .then(res => {
                const cityList = res.data;
                this.setState({ cityList });
            })




                
    }*/

    render() {
        return (
            <React.Fragment>
                {/* --------------------------- */}
                <div style={boxColor}>
                    <div style={divStyle} >
                        Zip Code Search
                    </div>
                </div>

                <form style={search} onSubmit={this.handleSubmit}>
                    <label >
                        Zip Code: <input type="text" name="zip" onChange={this.handleChange}/>
                    </label>
                </form>

                <div>
                    {this.state.cities.map(city => <p style={result}>{city.City},{city.State}</p>)}
                </div>

            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <ZipSearch />,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
