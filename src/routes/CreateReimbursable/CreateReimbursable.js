import React, { Component } from 'react';
import Reimbursable from '../../components/Reimbursable/Reimbursable'
import './CreateReimbursable.css'

export default class CreateReimbursable extends Component { 

    state = {
        association: '',
        client_number: '',
        requested_by: '',
        date: '',
        description: '',
        special_instructions: '',
        submitted: false
      }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.setState({submitted: true})
      }

    render() {
      return (
        <div>
        {this.state.submitted &&
            <div>
            <Reimbursable 
                date={this.state.date}
                association={this.state.association}
                client_number={this.state.client_number}
                requested_by={this.state.requested_by}
                description={this.state.description}
                special_instructions={this.state.special_instructions}
                />
            </div>
        }
        <p>Fill out the information for the reimbursable below, then hit submit.</p>
        <form className='reimbursable-form' onSubmit={this.handleSubmit}>
  <fieldset>
    <legend>Reimbursable Info</legend>
    <div className='form-flex'>
    <div className='form-flex-section'>
    <label htmlFor='date'>
          Date
        </label>
     <input
          placeholder='1/1/21'
          className='date'
          value={this.state.date}
          onChange={(e) => {this.setState({date: e.target.value})}}
          type='text'
          id='date'/>
    <label htmlFor='association'>
          Association
        </label>
     <input
          placeholder='Association Name'
          className='association'
          value={this.state.association}
          onChange={(e) => {this.setState({association: e.target.value})}}
          type='text'
          id='association'/>
    </div>
    <div className='form-flex-section'>
      <label htmlFor='client_number'>
          Client #
        </label>
     <input
          placeholder='1234'
          className='client_number'
          value={this.state.client_number}
          onChange={(e) => {this.setState({client_number: e.target.value})}}
          type='text'
          id='client_number'/>
      <label htmlFor='requested_by'>
          Requested By
        </label>
     <input
          placeholder='John Smith'
          className='requested_by'
          value={this.state.requested_by}
          onChange={(e) => {this.setState({requested_by: e.target.value})}}
          type='text'
          id='requested_by'/>
      <label htmlFor='description'>
          Description
        </label>
     <input
          placeholder='Draft Reserve Study'
          className='description'
          value={this.state.description}
          onChange={(e) => {this.setState({description: e.target.value})}}
          type='text'
          id='description'/>
    </div>
    </div>
    <div className='additional-notes-style'>
    <label htmlFor='special_instructions'>
          Special Instructions
        </label>
     <textarea
          placeholder='Sent draft to client. Please proceed with billing.'
          className='special_instructions'
          value={this.state.special_instructions}
          onChange={(e) => {this.setState({special_instructions: e.target.value})}}
          type='text'
          id='special_instructions'/>
      </div>
  </fieldset>
  <div className='buttons'>
  <button className="submit" type='submit'>
      SUBMIT
    </button> 
      </div>   
</form>
</div>
      )
    }
}