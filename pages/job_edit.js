import React from 'react';
import LayoutAdmin from '../components/LayoutAdmin';

export default class JobEdit extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }
    render (){
        return (

        <LayoutAdmin title="Edit Job">
        <div className="row">
                        <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                            <h3 className="mb-30">Edit Job Details</h3>
                            <form action="#" className="register_form">
                                <div className="input-group-icon mt-10">
                                    <div className="icon "><i className="fa fa-briefcase   " aria-hidden="true "></i></div>
                                    <input type="text" name="title" placeholder="Job Title" value="{here real value}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Job Title'" required className="single-input"/>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="input-group-icon mt-10 two_col_input_left">
                                            <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                                            <input type="number" name="min_salary" id="min_salary" value="195000" placeholder="Minimum Salary" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Min Salary'" required className="single-input"/>

                                        </div>
                                        <div className="input-group-icon mt-10 two_col_input">
                                            <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                                            <input type="number" name="max_salary" id="max_salary" value="250000" placeholder=" Max Possible Salary " onfocus="this.placeholder='' " onblur="this.placeholder='Max Possible Salary' " required className="single-input "/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-list " aria-hidden="true "></i></div>
                                <select name="employment_type" onChange={this.handleChange} className="form-control single-input select_border">
                                            <option value="" selected disabled>Employment Type</option>
                                            <option value="True ">Full Time</option>
                                            <option value="False ">Part Time</option>   
                                </select>
                                </div>
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-child " aria-hidden="true "></i></div>
                                    <input type="number " name="min_age " id="min_age " value="{here real value} " placeholder="Minimum Required Age " onfocus="this.placeholder='' " onblur="this.placeholder='Minimum Required Age' " required className="single-input "/>
                                </div>
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-calendar-alt " aria-hidden="true "></i></div>
                                    <textarea name="workday " id="workday " cols="30 " rows="4 " placeholder="Working Days " className="single-input ">here real value</textarea>
                                </div>
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-clock " aria-hidden="true "></i></div>
                                    <textarea name="workhour " id="workhour " cols="30 " rows="4 " placeholder="Working Hours " className="single-input ">here real value</textarea>
                                </div>

                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-language " aria-hidden="true "></i></div>
                                <select name="lang_skill" onChange={this.handleChange} className="form-control single-input select_border">
                                <option value="" selected disabled>Japanese Languae Skill</option>
                                                    <option value="3 ">N3</option>
                                                    <option value="2 ">N2</option>
                                                    <option value="1 ">N1</option>  
                                </select>
                                </div>

                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-calendar-check " aria-hidden="true "></i></div>
                                <select name="min_experience" onChange={this.handleChange} className="form-control single-input select_border">
                                <option value="" selected disabled>Min Experience Years</option>
                                                    <option value=" ">Less Than 1 Year</option>
                                                    <option value=" ">1-2 Years</option>
                                                    <option value=" ">2-3 Years</option>
                                                    <option value=" ">3-6 Years</option>
                                                    <option value=" ">6 Years and more</option> 
                                </select>
                                </div>

                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                                <select name="area" onChange={this.handleChange} className="form-control single-input select_border">
                                    <option value="area">Area</option>
                                    <option value="hokkaido">Hokkaido</option>
                                    <option value="honshu">Honshu</option>
                                    <option value="shikoku">Shikoku </option>
                                    <option value="kyushu">Kyushu</option>
                                    <option value="okinawa">Okinawa</option>
                                </select>
                                </div>

                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                                <select name="city" onChange={this.handleChange} className="form-control single-input select_border">
                                    <option value="city">City</option>
                                    <option value="sapporo">Sappro</option>
                                    <option value="osaka">Osaka</option>
                                    <option value="tokyo">Tokyo</option>
                                </select>
                    
                                </div>

                                <div className="input-group-icon mt-10 " style={{marginBottom : 4+"em"}}>
                                <div className="icon "><i className="fas fa-building " aria-hidden="true "></i></div>
                                <select name="company" onChange={this.handleChange} className="form-control single-input select_border">
                                <option value="" selected disabled>Company</option>
                                                    <option value=" ">Company A</option>
                                                    <option value=" ">Company B</option>
                                                    <option value=" ">Company C</option>
                                </select>
                    
                                </div>
                                
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                                    <textarea name="description " id="description " cols="30 " rows="4 " placeholder="Job Description " className="single-input ">here real value</textarea>
                                </div>
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                                    <textarea name="requirement " id="requirement " cols="30 " rows="4 " placeholder="Job Requirements " className="single-input ">here real value</textarea>
                                </div>
                                <div className="input-group-icon mt-10 ">
                                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                                    <textarea name="other_qualifications " id="other_qualifiations " cols="30 " rows="4 " placeholder="Other Qualifications (Optional) " className="single-input ">here real value</textarea>
                                </div>
                                <hr/>
                                <button className="btn btn_long ">Edit Job Details</button>
                            </form>
                        </div>
                    </div>

        </LayoutAdmin>
        
        )
    }
}





