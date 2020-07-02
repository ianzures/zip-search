import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.body.style = 'background: #ffffcc;';

const headBox = {
    paddingTop: '50px',
    paddingBottom: '40px',
    paddingLeft: '80px',
    backgroundColor: '#ff0066',
}

const title = {
    fontSize: '300%',
    fontFamily: "Times New Roman",
    fontWeight: 'bold',
    color: '#ffffcc'
}

const search = {
    fontFamily: 'Helvetica',
    fontWeight : 'bold',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px'
}

const result = {
    marginTop: '.5%',
    marginLeft: '40%',
    marginRight: '40%',
    borderStyle: 'solid',
    borderRadius: '10px',
    backgroundColor: '#fdfcfc'
}

const cellTitle = {
    fontSize: "110%",
    fontFamily: "Times New Roman",
    marginLeft: '4%'
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

        // Set cities to an empty list, so that the cities of the previous search a no longer displayed. 
        this.setState({ cities:[] });

        // Concatonate input to url and place result in cities array.
        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip).then(results => {
            this.setState({ cities: results.data });
        // If call to axios.get() fails, alert user that their input was invalid. 
        }).catch(function (err) {
                alert("Invalid zip code.");
            }
        );
    }

    handleChange = event => {
        this.setState({ zip: event.target.value });
    }

    render() {
        return (
            <React.Fragment>

                {/* Box containing the name of the page */}
                <div style={headBox}>

                    {/* Page title */}
                    <div style={title}> Zip Code Search </div>

                </div>

                {/* User input */}
                <form style={search} onSubmit={this.handleSubmit}>
                    <label > Enter zip code:
                        <input type="text" name="zip" onChange={this.handleChange}/>
                    </label>
                </form>

                {/* Display information for valid zip code */}
                <div>

                    {/* For each city in cities ... */}
                    {this.state.cities.map(city =>

                        //  Create a div which will act as a cell to diplay city information
                        <div key={city.RecordNumber} style={result}>

                            {/* Title for each cell which include a city's name and state. */}
                            <p style={cellTitle}> {city.City}, {city.State} </p>

                            <ul style ={{fontFamily: "Times New Roman"}} >
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
