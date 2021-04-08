import React, { Component } from 'react';
import dateFormat from 'dateformat';
import RenderAsImage from 'react-render-as-image'
import ReactToPdf from 'react-to-pdf'
import './Reimbursable.css'

export default class Reimbursable extends Component { 
    render() {
      return (
        <ReactToPdf>
            {({toPdf, targetRef}) => (
                <div className='reimbursable' onClick={toPdf} ref={targetRef}>
                <span className='date'>dateFormat({new Date(), "shortDate"}</span>
                <span className='client-number'>1234</span>
                <span className='requested-by'>Jordan Henn</span>
                <span className='association'>association</span>
                <span className='description'>T{'&'}M Funding Update - 3.3 Hrs</span>
                <span className='special-instructions'>Sent T{'&'}M Funding Update to Client. Please proceed with billing.</span>
            </div>
            )}
        </ReactToPdf>
      )
    }
}