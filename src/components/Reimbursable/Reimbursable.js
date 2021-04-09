import React, { Component } from 'react';
import ReactToPdf from 'react-to-pdf'
import './Reimbursable.css'

export default class Reimbursable extends Component { 
    render() {
      return (
        <ReactToPdf>
            {({toPdf, targetRef}) => (
                <div className='reimbursable' onClick={toPdf} ref={targetRef}>
                <span className='date'>{this.props.date}</span>
                <span className='client-number'>{this.props.client_number}</span>
                <span className='requested-by'>{this.props.requested_by}</span>
                <span className='association'>{this.props.association}</span>
                <span className='description'>{this.props.description}</span>
                <span className='special-instructions'>{this.props.special_instructions}</span>
            </div>
            )}
        </ReactToPdf>
      )
    }
}