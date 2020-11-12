import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// implemented as a functional component.  Used for accepting props and returning jsx
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td><Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a></td>
    </tr>
)
// implemented as a class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get('/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // takes in a MongoDB id to delete
    deleteExercise(id) {
        axios.delete('/exercises/' + id)
            .then(res => console.log(res.data));
        //  react updates the page with the new state, which does not include the deleted id.  '_id' is part of the MongoDB field
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    // returns a list of every element in the exercise array
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;

        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}