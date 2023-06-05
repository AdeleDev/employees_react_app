import './employee-add-form.css';
import {Component} from "react";

class EmployeesAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            validateName: true,
            validateSalary: true
        }
    }

    onValueChange = (e) => {
        if (this.state.name.length < 3) {
            this.setState({
                validateName: false
            })
        } else {
            this.setState({
                validateName: true
            })
        }
        if (!this.state.salary) {
            this.setState({
                validateSalary: false
            })
        } else {
            this.setState({
                validateSalary: true
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length < 3 || !this.state.salary) {
            return
        }
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: '',
            validateName: true,
            validateSalary: true
        })
    }


    render() {
        const {name, salary, validateName, validateSalary} = this.state
        let inputClasses = 'form-control-warning new-post-label'
        let nameClasses = inputClasses
        let salaryClasses = inputClasses

        if (!validateName) {
            nameClasses += ' is-invalid'
        }

        if (!validateSalary) {
            salaryClasses += ' is-invalid'
        }
        return (
            <div className="app-add-form">
                <h3>Add new person</h3>
                <form
                    className="add-form d-flex form-group"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                           className={nameClasses}
                           placeholder="Name"
                           name="name"
                           value={name}
                           onChange={this.onValueChange}/>
                    <input type="number"
                           className={salaryClasses}
                           placeholder="Salary in $"
                           name="salary"
                           value={salary}
                           onChange={this.onValueChange}/>
                    <button type="submit"
                            className="btn btn-outline-light">Add
                    </button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;