import React from 'react'
import Link from 'next/link'
import {db} from '../lib/db'
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class UserRegister extends React.Component {
    constructor(props){
        super(props);
        this.initial_state = {
            first_name : '',
            last_name : '',
            email : '',
            phone : '',
            birthday : '',
            password : '',
            lang_skill : '',
            address : '',
            remark : ''
        };
        this.state = this.initial_state;
    }

    componentDidMount(){
        const script = document.createElement("script");
        const pswToggle = document.createElement("script");
        script.src = "/assets/js/main.js";
        pswToggle.src = "/assets/js/password_toggle.js";
        script.async = true;
        pswToggle.async = true;

        document.body.appendChild(script);
        document.body.appendChild(pswToggle);
    }
    static async getInitialProps(){
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        return {areas,companies,jobs}
    }
    
 handleChange = (event) =>{
    this.setState({[event.target.name] : event.target.value});
}
clearInput = (event) => {
    this.setState(this.initial_state);
    let inputs, index;

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].value = ''
    }
    document.getElementById('address').value = '';
    $("#lang_skill option[selected]").removeAttr("selected");    
    $("#lang_skill option:first").attr("selected","selected");

}

selectDisable = (event) => {   
    $("#lang_skill option:first").attr("disabled","disabled");
}
handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state; 

    console.log(user.password + ":" + user.password_confirm);
    if (user.password_confirm && user.password !== user.password_confirm){
        this.setState ({remark : "Password does not match"});
    }else{
        this.setState ({remark : ""});
        try {
            db.collection("user").add(
                {first_name : user.first_name,
                 last_name : user.last_name,
                 email : user.email,
                 phone : user.phone,
                 birthday : user.birthday,
                 password : user.password,
                 lang_skill : user.lang_skill,
                 address : user.address
                }
            )
            $("#successModal").modal('show');
        }catch(error){
            console.log(error);
            this.setState({isSuccess : false});
        }
        this.state = this.initial_state;
        console.log(this.state);
    }
}

    render (){
        return (
        <LayoutWithFooter title = "User Registration" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>

<div className="modal fade" id="successModal" tabindex="-1" role="dialog" aria-hidden="true" style={{marginTop : 5+"em"}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{`Welcome ${this.state.first_name} ${this.state.last_name} !`}</h5>
        <button type="button" onClick={this.clearInput} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        User Account Registeration Successful !!!
      </div>
      <div className="modal-footer">
          <button onClick={this.clearInput} className="btn btn-primary" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

           <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            {this.state.isSuccess && alert(`${this.state.first_name} ${this.state.last_name} is created successfully!!!`)}
                <h3 className="mb-30">User Register</h3>
                <form action="#" className="register_form">
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                        <input type="text" name="first_name" onChange={this.handleChange} placeholder="First Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-user " aria-hidden="true "></i></div>
                        <input type="text" name="last_name" onChange={this.handleChange} placeholder="Last Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Last Name'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-envelope " aria-hidden="true "></i></div>
                        <input type="email" name="email" onChange={this.handleChange} placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-mobile " aria-hidden="true "></i></div>
                        <input type="text" name="phone" onChange={this.handleChange} placeholder="Phone Number" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone Number'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-calendar " aria-hidden="true "></i></div>
                        <input type="date" name="birthday" onChange={this.handleChange} placeholder="Birthday" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Brithday'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-key " aria-hidden="true "></i></div>
                        <input type="password" id="password-field" name="password" onChange={this.handleChange} placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" onKeyUp={this.handleChange} required className="single-input"/>
                        <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" style={{float : "right", marginRight : 15, marginTop : -32, position : "relative", zIndex : 2}}></span>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-key " aria-hidden="true "></i></div>
                        <input type="password" id="password-field2" name="password_confirm" placeholder="Confirm Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Confirm Password'" onKeyUp={this.handleChange} required className="single-input"/>
                        <span toggle="#password-field2" class="fa fa-fw fa-eye field-icon toggle-password" style={{float : "right", marginRight : 15, marginTop : -32, position : "relative", zIndex : 2}}></span>
                        {this.state.remark && 
                        <span style={{color : "#ff3368"}}>{this.state.remark}</span>
                        }
                    </div>
                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                    <select id="lang_skill" name="lang_skill" onChange={this.handleChange} onClick={this.selectDisable} className="form-control single-input select_border">
                                        <option value="Japanese Languae Skill">Japanese Languae Skill</option>
                                        <option value="3">N3</option>
                                        <option value="2">N2</option>
                                        <option value="1">N1</option>
                                        </select>
                </div>
                    
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
                        <textarea name="address" id="address" cols="30" rows="5" onChange={this.handleChange} placeholder="Address" className="single-input"></textarea>
                    </div>
                    <hr/>
                    <div className="mt-10 ">
                        <input type="file" name="profile" id="my-file"/>
                        <label for="my-file" className="custom-file-upload">
                            <i className="fa fa-upload"></i> Upload Profile Image
                        </label>
                    </div>
                    <button onClick={this.handleSubmit} className="btn" style={{width : 100 + "%",marginTop : 5 + "em"}}>Register</button>
                </form>
            </div>
        </div>
        </LayoutWithFooter>
        
        )
    }
}