import React from 'react';
import Link from 'next/link';
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class Contact extends React.Component {
    static async getInitialProps(){
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        return {areas,companies,jobs}
    }
    render (){
        return (
            
        <LayoutWithFooter title = "Contact us" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
        
    <section className="contact-section">
        <div className="container">
             

            <div className="row">
                <div className="col-12">
                    <h2 className="contact-title">Get in Touch</h2>
                </div>
                <div className="col-lg-8">
                    <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input className="form-control valid" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name"/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input className="form-control valid" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn">Send</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 offset-lg-1">
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-home"></i></span>
                        <div className="media-body">
                            <h3>Address</h3>
                            <p>Address</p>
                        </div>
                    </div>
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-tablet"></i></span>
                        <div className="media-body">
                            <h3>+1 253 565 2365</h3>
                            <p>Mon to Fri 9am to 5pm</p>
                        </div>
                    </div>
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-email"></i></span>
                        <div className="media-body">
                            <h3>www.nursingjobfinderhaj.com</h3>
                            <p>Welcome !</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </LayoutWithFooter>
        
        )
    }
}