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
    //marginLeft: '50px',
    //marginTop: '20px',
    //marginRight: '50px'
}
const search = {
    fontFamily: 'Impact',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
}

const result = {
    display: 'flex',
    justifyContent: 'center',
    borderStyle: 'double',
    marginLeft: '400px',
    marginTop: '30px',
    marginRight: '400px',
    borderRadius: '10px'
}

const cellHead = {
    //backgroundColor : 'grey'
}

export default class ZipSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            zip: '',
        };
    }
    

    handleSubmit = event => {

        event.preventDefault();

        this.setState({ els:[] });
        this.setState({ cities:[] });


        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip).then(results => {
                this.setState({ cities: results.data });
            }).catch(function (err) {
                alert("Zip code not found.");
            }
        );
    }

    handleChange = event => {
        this.setState({ zip: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <div style={boxColor}>
                    <div style={divStyle} >
                       Zip Code Search 
                    </div>
                </div>

                <form style={search} onSubmit={this.handleSubmit}>
                    <label >
                        Zip Code: <input type="text" name="zip" onChange={this.handleChange} />
                    </label>
                </form>
             
                <div>
                    {this.state.cities.map(city =>
                        <div key={city.RecordNumber} style={result}>
                            <header style={cellHead}>{city.City},{city.State}</header>
                            <ul>
                                <li>State: {city.State}</li>
                                <li>Location: ({city.Lat},{city.Long})</li>
                                <li>Population (estimated): {city.EstimatedPopulation}</li>
                                <li>Total wages: {city.TotalWages}</li>

                            </ul>
                        </div>)
                    }
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
