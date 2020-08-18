import React from 'react';
import Link from 'next/link';
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class UserSignin extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }
    static async getInitialProps(){
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        return {areas,companies,jobs}
    }
    render (){
        return (
            
        <LayoutWithFooter title = "User Sign In" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
           <div className="section-top-border">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h3 className="mb-30">User Sign In </h3>
                    <form action="#" className="register_form" style={{marginBottom : 1+"em"}}>
                        <div className="input-group-icon mt-10">
                            <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                            <input type="email" name="email" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'" required className="single-input"/>
                        </div>
                        <div className="input-group-icon mt-10" style={{marginTop : 2 + "em"}}>
                            <div className="icon"><i className="fa fa-key" aria-hidden="true"></i></div>
                            <input type="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" required className="single-input"/>
                        </div>
                        <button className="btn btn_long">Sign In</button>
                    </form>
                    <h6 className="mb-30 ">
                    <Link href="/user_forgotpassword"><a style={{color : "#52c8fa",marginLeft : 1 + "em",textDecoration : "underline"}}>Forgot Password !</a></Link>
                    </h6>
                    <h6 className="mb-30 ">Not a memeber ?
                    <Link href="/user_register"><a style={{color : "#52c8fa",marginLeft : 1 + "em" , textDecoration : "underline"}}>Register now</a></Link>
                    </h6>
                    <hr/>
                    <h6>Or Sign In with &nbsp;
                        <i className="fab fa-facebook-f " aria-hidden="true " style={{paddingRight : 1 + "em"}}></i>
                        <i className="fab fa-google " aria-hidden="true " style={{paddingRight : 1 + "em"}}></i>
                        <i className="fab fa-linkedin " aria-hidden="true " style={{paddingRight : 1 + "em"}}></i>
                        </h6>
                </div>
            </div>
        </div>
        </LayoutWithFooter>
        
        )
    }
}