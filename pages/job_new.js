import React from 'react';
import {db} from '../lib/db'
import LayoutAdmin from '../components/LayoutAdmin';

export default class JobNew extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }

    static async getInitialProps ({ req, res, query }){ 

        let areas = []
        let cities = []
        let employers = []

        const querySnapshotArea = await db.collection('area').get()

        querySnapshotArea.forEach(doc => {
            areas.push(Object.assign(
                {id : doc.id,
              data : doc.data()}
            ))
          })

        const querySnapshotCity = await db.collection('city').get()
        querySnapshotCity.forEach(doc => {
            cities.push(Object.assign(
                {id : doc.id,
              data : doc.data()}
            ))
          })

        const querySnapshotEmployer = await db.collection('employer').get()
        querySnapshotEmployer.forEach(doc => {
            employers.push(Object.assign(
                {id : doc.id,
              data : doc.data()}
            ))
          })
            console.log(areas);
            console.log(cities);
            console.log(employers);
       
        return {
          areas,
          cities,
          employers
        }
    }

    constructor(props){
        super(props);
        this.initial_state = {
            title : '',
            min_salary : 0,
            max_salary : 0,
            employment_type : '',
            min_age : 0,
            work_day : '',
            work_hour : '',
            min_lang_skill : '',
            min_exp_year : 0,
            area : '',
            city : '',
            company : '',
            description : '',
            requirement : '',
            other_qualifiation : '',
            isSuccess : false
        };
        this.state = this.initial_state;
    }
    handleChange = (event) => {

        this.setState({[event.target.name] : event.target.value});
       
}
handleSubmit = (event) => {
    const job = this.state; 
    const today = new Date();
    //const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const date = new Date().now()
    event.preventDefault();
    try {
        db.collection("job").add(
            {title : job.title,
            min_salary : job.min_salary,
            max_salary : job.max_salary,
            employment_type : job.employment_type,
            min_age : job.min_age,
            work_day : job.work_day,
            work_hour : job.work_hour,
            min_lang_skill : job.min_lang_skill,
            min_exp_year : job.min_exp_year,
            area : job.area,
            city : job.city,
            company : job.company,
            description : job.description,
            requirement : job.requirement,
            other_qualifiation : job.other_qualifiation,
            posted_date : date,
            }
        )
        this.setState({isSuccess : true});
    }catch(error){
        console.log(error);
        this.setState({isSuccess : false});
    }
    this.state = this.initial_state;
    console.log(this.state);
}

    render (){
        const {areas,cities,employers} = this.props;
        return (

        <LayoutAdmin title="Add New Job">
        <div className="row">
            <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            {this.state.isSuccess && alert(`${this.state.title} is posted successfully!!!`)}
                <h3 className="mb-30">Add New Job Post</h3>
                <form action="#" className="register_form">
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-briefcase   " aria-hidden="true "></i></div>
                        <input type="text" name="title" onChange={this.handleChange} placeholder="Job Title" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Job Title'" required className="single-input"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="input-group-icon mt-10 two_col_input_left">
                                <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                                <input type="number" name="min_salary" id="min_salary" onChange={this.handleChange} placeholder="Minimum Salary" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Min Salary'" required className="single-input"/>

                            </div>
                            <div className="input-group-icon mt-10 two_col_input">
                                <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                                <input type="number" name="max_salary" id="max_salary" onChange={this.handleChange} placeholder="Max Possible Salary" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Max Possible Salary'" required className="single-input"/>
                            </div>
                        </div>
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-list " aria-hidden="true "></i></div>
                    <select name="employment_type" onChange={this.handleChange} onChange={this.handleChange} className="form-control single-input select_border">
                                <option value="" selected disabled>Employment Type</option>
                                <option value="Full">Full Time</option>
                                <option value="Part">Part Time</option>   
                    </select>
                    </div>
                    
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-child" aria-hidden="true "></i></div>
                        <input type="number" name="min_age" id="min_age" onChange={this.handleChange} placeholder="Minimum Required Age" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Minimum Required Age'" required className="single-input"/>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-calendar-alt " aria-hidden="true "></i></div>
                        <textarea name="work_day" id="workday" cols="30" rows="4" onChange={this.handleChange} placeholder="Working Days" className="single-input"></textarea>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-clock " aria-hidden="true "></i></div>
                        <textarea name="work_hour" id="workhour" cols="30" rows="4" onChange={this.handleChange} placeholder="Working Hours" className="single-input"></textarea>
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-language " aria-hidden="true "></i></div>
                    <select name="min_lang_skill" onChange={this.handleChange} onChange={this.handleChange} className="form-control single-input select_border">
                    <option value="" selected disabled>Japanese Languae Skill</option>
                                        <option value="N3">N3</option>
                                        <option value="N2">N2</option>
                                        <option value="N1">N1</option>  
                    </select>
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-calendar-check " aria-hidden="true "></i></div>
                    <select name="min_exp_year" onChange={this.handleChange} onChange={this.handleChange} className="form-control single-input select_border">
                    <option value="" selected disabled>Min Experience Years</option>
                                        <option value=" ">Less Than 1 Year</option>
                                        <option value="1-2 Years">1-2 Years</option>
                                        <option value="2-3 Years">2-3 Years</option>
                                        <option value="3-6 Years">3-6 Years</option>
                                        <option value="6 Years and more">6 Years and more</option> 
                    </select>
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                    <select name="area" onChange={this.handleChange} className="form-control single-input select_border">
                    <option value="" selected disabled>Area</option>
                        {areas && areas.map((area)=> (
                            <option value={area.id}>{area.data.name}</option>
                        ))}
                        
                        
                    </select>
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                    <select name="city" onChange={this.handleChange} className="form-control single-input select_border">
                        <option value="" selected disabled>City</option>
                        {cities && cities.map((city) => (
                            <option value={city.id}>{city.data.name}</option>
                        ))}
                        
                    </select>
        
                    </div>

                    <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-building " aria-hidden="true "></i></div>
                    <select name="company" onChange={this.handleChange} className="form-control single-input select_border">
                    <option value="" selected disabled>Company</option>
                    {employers && employers.map((employer) => (
                            <option value={employer.id}>{`${employer.data.name} - ${employer.data.city},${employer.data.area}`}</option>
                    ))}
                        
                    </select>
        
                    </div>

                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                        <textarea name="description" id="description" cols="30" rows="4" onChange={this.handleChange} placeholder="Job Description" className="single-input"></textarea>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                        <textarea name="requirement" id="requirement" cols="30" rows="4" onChange={this.handleChange} placeholder="Job Requirements" className="single-input"></textarea>
                    </div>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                        <textarea name="other_qualification" id="other_qualifiations" cols="30" rows="4" onChange={this.handleChange} placeholder="Other Qualifications (Optional)" className="single-input"></textarea>
                    </div>
                    <hr/>
                    <button onClick={this.handleSubmit} className="btn btn_long">Post Job</button>
                </form>
            </div>
        </div>



        

        </LayoutAdmin>
        
        )
    }
}





