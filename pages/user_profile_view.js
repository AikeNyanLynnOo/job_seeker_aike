import React from 'react';
import LayoutAdmin from '../components/LayoutAdmin';

export default class UserProfileView extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }
    render (){
        return (

        <LayoutAdmin title="Edit Job">
        <div className="container">
                        <div className="row">
                            <div className="col-xl-7 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                                <h3 className="mb-30">
                                    <img id="profile-pic" src=" /assets/img/profile_default.png " />
                                </h3>
                                <form action="# " className="register_form ">

                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                                        <input type="text " name="first_name " placeholder="First Name " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='First Name' " required className="single-input " readonly/>
                                    </div>
                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                                        <input type="text " name="last_name " placeholder="Last Name " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='Last Name' " required className="single-input " readonly/>
                                    </div>
                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-envelope " aria-hidden="true "></i></div>
                                        <input type="email " name="email " placeholder="Email address " value="{here real value}" onfocus="this.placeholder='' " onblur="this.placeholder='Email address' " required className="single-input " readonly/>
                                    </div>
                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-calendar " aria-hidden="true "></i></div>
                                        <input type="date " name="birthday " placeholder="Birthday " value="{here real value}" ocus="this.placeholder='' " onblur="this.placeholder='Brithday' " required className="single-input " readonly/>
                                    </div>
                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-language " aria-hidden="true "></i></div>
                                        <input type="text " name="lang_skill " placeholder="Japanese Language Skill " value="{here real value}" ocus="this.placeholder='' " onblur="this.placeholder='Japanese Language Skill' " required className="single-input " readonly/>
                                    </div>
                                    <div className="input-group-icon mt-10 ">
                                        <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
                                        <textarea name=" " id=" " cols="30 " rows="5 " className="single-input " disabled>here real value</textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </LayoutAdmin>
        
        )
    }
}





