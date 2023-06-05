import './app.css'
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeeAddForm from "../employee-add-form/employee-add-form";
import {Component} from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Ab', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex Al', salary: 3500, increase: true, rise: false, id: 2},
                {name: 'Sandy Ma', salary: 5200, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }

        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    searchPerson = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterFunc = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }


    render() {
        const {data, term, filter} = this.state;
        const amount = data.length
        const increased = data.filter(item => item.increase).length
        const visibleData = this.filterFunc(this.searchPerson(data,term), filter)
        return (
            <div className="app">
                <AppInfo
                    amount={amount}
                    increased={increased}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect ={this.onFilterSelect}/>
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeeAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App