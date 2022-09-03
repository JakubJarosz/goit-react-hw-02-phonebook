import React from "react"
import { nanoid } from 'nanoid';
import FormAddContact from "../FormAddContact/FormAddContact";
import SearchFilter from "../SearchFilter/SearchFilter";


class Phonebook extends React.Component { 
    state = {
        contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
        filter: '',
        name: '',
        number: '',
    };

    handleFormSubmit = evt => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const number = form.elements.number.value;
        if (this.state.contacts.filter((el) => el.name === name).length > 0) {
            return alert(`${name} is already in contacts`)
        } else {
            this.setState({
                ...this.state, contacts: [...this.state.contacts, { id: nanoid(), name, number }],
                name: '',
            })
        }
    }

    removeContactsFromState = ((id) => {
        const newContactsList = this.state.contacts.filter((el) => el.id !== id);
        this.setState({...this.state, contacts: newContactsList})
    })
    
    renderContacts = (filterValue, contactsArray) => {
        if (!filterValue) return contactsArray.map((contact) => {
            return <li key={contact.id}>
                <span>{contact.name} :{contact.number}</span>
                <button onClick={() => {
                    this.removeContactsFromState(contact.id)
                }}>Delete</button>
            </li>
        })
        return contactsArray.filter((el) => el.name.toLowerCase().includes(filterValue.toLowerCase())).map((contact) => {
            return <li key={contact.id}>
                <span>{contact.name} :{contact.number}</span>
                <button onClick={() => {
                    this.removeContactsFromState(contact.id)
                }}>Delete</button>
            </li>
        })
    }

    filterContacts = event => {
        this.setState({ ...this.state, filter: event.target.value })
    }

    render() {
        console.log(this.state)
        const {filter, contacts} = this.state
        return <div>
                <h1>PhoneBook</h1>
                <FormAddContact submitHandler={this.handleFormSubmit}/>
            
                <h2>Contacts</h2>
                <SearchFilter onFilterChange={this.filterContacts}/>
                <ul>
                {this.renderContacts(filter, contacts)}
                </ul>
         </div>
     }
}


export default Phonebook