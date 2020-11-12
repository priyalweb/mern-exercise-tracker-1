import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// axios is a promise based HTTP client to connect to node.js
import axios from 'axios';


export default class CreateExercises extends Component {
    constructor(props) {
        // in js classes, need to call super when defining a constructor of a subclass
        super(props);

        // ensures that 'this' is referred to the correct thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // states are how you create variables in react.  Whenever you update state, you update the values on the page
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // react lifecycle method that is called right before the page loads
    componentDidMount() {
        // connect to backend, which is connected to the db
        //axios.get('http://localhost:5000/users/')  // uncomment to test locally
        axios.get('/users/')
            // take the response and returns username
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        // returns the array of users
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    // changes the value of the username to what is on the textbox (target)
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    // prevent the default behavior, and instead do what is here
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('/exercises/add', exercise)
            .then(res => console.log(res.data));

        // take user back to homepage after submitting exercise
        window.location = '/';
    }

// renders the page layout
    render() {
        return (
            <div>
                <h3> Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            requiredclassName="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                         <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}