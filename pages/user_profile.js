import React from 'react';
import Link from 'next/link';
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class UserProfile extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/image_update.js";
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
            
        <LayoutWithFooter title = "Here username real value comes" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
           <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h3 className="mb-30">
                    <img id="profile-pic" src="/assets/img/profile_default.png " />
                </h3>
                <form action="# " className="register_form ">
                    <div className="mt-10 ">
                        <label for="my-file" className="custom-file-upload">
                            <i className="fa fa-upload"></i> Edit Profile Image
                        </label>
                        <input type="file" id="my-file" />
                    </div>
                    <div className="input-group-icon mt-10 ">
                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                        <input type="text " name="first_name " placeholder="First Name " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='First Name' " required className="single-input "/>
                    </div>
                    <div className="input-group-icon mt-10 ">
                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                        <input type="text " name="last_name " placeholder="Last Name " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='Last Name' " required className="single-input "/>
                    </div>
                    <div className="input-group-icon mt-10 ">
                        <div className="icon "><i className="fa fa-envelope " aria-hidden="true "></i></div>
                        <input type="email " name="email " placeholder="Email address " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='Email address' " required className="single-input "/>
                    </div>
                    <div className="input-group-icon mt-10 ">
                        <div className="icon "><i className="fa fa-calendar " aria-hidden="true "></i></div>
                        <input type="date " name="birthday " placeholder="Birthday " value="{here real value}" ocus="this.placeholder='' " onblur="this.placeholder='Brithday' " required className="single-input "/>
                    </div>
                    <div className="input-group-icon mt-10 select_border">
                        <div className="icon "><i className="fa fa-language " aria-hidden="true "></i></div>
                        <div className="form-select " id="default-select ">
                            <select>
                                        <option value=" " selected disabled>here real language skill value</option>
                                        <option value="3 ">N3</option>
                                        <option value="2 ">N2</option>
                                        <option value="1 ">N1</option>
                                        </select>
                        </div>
                    </div>
                    <div className="input-group-icon mt-10 ">
                        <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
                        <textarea name=" " id=" " cols="30 " rows="5 " className="single-input ">here real value</textarea>
                    </div>
                    <button className="btn btn_long">Update Profile</button>
                </form>
            </div>
        </div>
        </LayoutWithFooter>
        
        )
    }
}