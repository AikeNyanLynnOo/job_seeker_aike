import React from 'react';
import LayoutAdmin from '../components/LayoutAdmin';

export default class EmployerEdit extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        const image_script = document.createElement("script");

        script.src = "/assets/js/main.js";
        image_script.src = "/assets/js/image_update.js";

        script.async = true;
        image_script.async = true;

        document.body.appendChild(script);
        document.body.appendChild(image_script);
    }
    render (){
        return (

        <LayoutAdmin title="Employer Edit">
           <div className="row">
                        <div className="col-xl-7 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                            <h3 className="mb-30">
                                <img id="profile-pic" src="/assets/img/icon/job-list2.png" />
                            </h3>
                            <form action="#" className="register_form">
                                <div className="mt-10 ">
                                    <label for="my-file" className="custom-file-upload">
                                        <i className="fa fa-upload"></i> Edit Company Logo
                                    </label>
                                    <input type="file" id="my-file" />
                                </div>
                                <div className="input-group-icon mt-10">
                                    <div className="icon "><i className="fa fa-building " aria-hidden="true "></i></div>
                                    <input type="text" name="name" placeholder="Name" value="{Here real value}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Name'" required className="single-input"/>
                                </div>
                                <div className="input-group-icon mt-10">
                                    <div className="icon "><i className="fa fa-envelope " aria-hidden="true "></i></div>
                                    <input type="email" name="email" placeholder="Email address" value="{Here real value}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email address'" required className="single-input"/>
                                </div>
                                <div className="input-group-icon mt-10">
                                    <div className="icon "><i className="fa fa-phone " aria-hidden="true "></i></div>
                                    <input type="text" name="phone" placeholder="Phone" value="{Here real value}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone'" required className="single-input"/>
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
                                <div className="input-group-icon mt-10">
                                    <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
                                    <textarea name="" id="" cols="30" rows="5" placeholder="Address" className="single-input">Here Real Value</textarea>
                                </div>
                                <hr/>
                                <button className="btn" style={{width : 100 + "%", marginTop : 5 + "em"}}>Update Details</button>
                            </form>
                        </div>
                    </div>
        </LayoutAdmin>
        
        )
    }
}





