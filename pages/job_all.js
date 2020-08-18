import React from 'react'
import LayoutAdmin from '../components/LayoutAdmin';
import {db, getCollectionRecords, JOB_COLLECTION, AREA_COLLECTION, CITY_COLLECTION, EMPLOYER_COLLECTION} from "../lib/db";

export default class JobAll extends React.Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.datatableRef = React.createRef();
        this.$datatable = null

        this.state = {
            delete_id : '',
            edit_id : '',
    
            //edit job fields

            title : '',
            min_salary : 0,
            max_salary : 0,
            employment_type : '',
            vacancy : 1,
            min_age : 0,
            work_day : '',
            work_hour : '',
            min_lang_skill : '',
            min_exp_year : 0,
            area : '',
            city : '',
            job_address : '',
            company : '',
            description : '',
            requirement : '',
            other_qualification : '',
            other_message : '',
            posted_date : '',
    
            cities : [],
            areaName : '',
            jobs : props.jobs || []
            }
        }

        componentDidMount() {
            this.initializeDatatable()
        }
        
        initializeDatatable() {
            this.$datatable = $(this.datatableRef.current).DataTable({
                "pagingType": "full",
                "columns": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    { "orderable": false },
                    { "orderable": false }
                  ],
                order: [[1, "desc"]],
                "bInfo": false
            });
        }

        refreshTable() {
            this.$datatable.clear()
            const self = this;
            JobAll
            .getInitialProps()
            .then((response) => {
                self.setState({
                jobs: response.jobs,
                });
            })
            .bind(this);
        }

        static async getInitialProps (){ 
    
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let cities = await getCollectionRecords(CITY_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)

        return {jobs, areas, cities, companies}
    }


    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        if(event.target.name == "area"){
          this.getAreaName(event.target.value)
          this.getCities(event.target.value)

      }
    }

    getPassIdDelete = (id,cmp_id) => {
        event.preventDefault()
        console.log(`Company id is ${cmp_id}`)
        $("#deleteConfirm").modal('show');
        this.setState({delete_id : id , company : cmp_id})
    }

    deleteJob = async () => {
        try{
            db.collection('job').doc(this.state.delete_id).delete()
            this.setState({updateOrDelete : "Deleted"})
            this.refreshTable()
        }catch(error) {
            console.log(error)
        }
    }

    getPassIdEdit = (id) => {

        this.setState ({edit_id : id})
        let job = {}
        try{
            db.collection('job').doc(id).get()
            .then((snapshot)=>{
                job = snapshot.data();
                console.log(job)
                this.setState({
                    title : job.title,
                    min_salary : job.min_salary,
                    max_salary : job.max_salary,
                    employment_type : job.employment_type,
                    vacancy : job.vacancy,
                    min_age : job.min_age,
                    work_day : job.work_day,
                    work_hour : job.work_hour,
                    min_lang_skill : job.min_lang_skill,
                    min_exp_year : job.min_exp_year,
                    area : job.area,
                    city : job.city,
                    job_address : job.job_address,
                    company : job.company,
                    description : job.description,
                    requirement : job.requirement,
                    other_qualification : job.other_qualification,
                    other_message : job.other_message,
                    posted_date : job.posted_date
                })

                
                this.getCities(job.area)
                this.getAreaName(job.area)
                
               
            })
            
        }catch(error){
            console.log(error)
        }
        
    }

    updateJob = async () => {
        const today = new Date();
        //const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        try{
          db.collection('job').doc(this.state.edit_id).update({
            title : this.state.title,
            min_salary : parseInt(this.state.min_salary),
            max_salary : parseInt(ths.state.max_salary),
            employment_type : this.state.employment_type,
            vacancy : parseInt(this.state.vacancy),
            min_age : parseInt(this.state.min_age),
            work_day : this.state.work_day,
            work_hour : this.state.work_hour,
            min_lang_skill : parseInt(this.state.min_lang_skill),
            min_exp_year : parseInt(this.state.min_exp_year),
            area : this.state.area,
            city : this.state.city,
            job_address : this.state.job_address,
            description : this.state.description,
            requirement : this.state.requirement,
            other_qualification : this.state.other_qualification,
            other_message : this.state.other_message,
            posted_date : this.state.posted_date,
            company : this.state.company,
            last_updated_date : today
            })
          this.setState({updateOrDelete : "Updated"})  
          this.showSuccessfulDialog()
          this.refreshTable()   
          
      }catch(error){
          console.log(error)
      }
    }

    showSuccessfulDialog (){
        $("#updateSuccessfulModal").modal('show')
    }

    getCities = (id) => {
        let cities = []
        try{
            db.collection('city').where('area_id',"==",id).get().
            then((snapshot)=>{
                snapshot.forEach(doc => {
                    cities.push(Object.assign(
                        {id : doc.id,
                      data : doc.data()}
                    ))
                })
                this.setState({cities})
            })
            
        }catch(error){
            console.log(error)
        }
    }


    getCompanyName = (id) => {
        const companies = this.props.companies
        let name = ''
        companies.map(company=>{
            if(company.id == id){
                name = company.data.name
            }
        })
        return name
     }
 
     getLocation = (city_id,area_id) => {
         const cities = this.props.cities
         const areas = this.props.areas
         let city_name = ''
         let area_name = ''
 
         cities.map(city=>{
             if(city.id == city_id){
                 city_name = city.data.name
             }
         })
         areas.map(area=>{
             if(area.id == area_id){
                 area_name = area.data.name
             }
         })
        return city_name + "," + area_name
      }

    getAreaName = (id) => {
        let area = {}
        try{
          db.collection('area').doc(id).get()
          .then((snapshot)=>{
              area = snapshot.data();
              this.setState({areaName : area.name})
          })
      }catch(error){
          console.log(error)
      }
      }

      clearInput = (event) => {
        let inputs, index;
  
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = ''
        }
        document.getElementById('work_day').value = '';
        document.getElementById('work_hour').value = '';
        document.getElementById('description').value = '';
        document.getElementById('requirement').value = '';
        document.getElementById('other_qualification').value = '';
  
        $("#employment_type option[selected]").removeAttr("selected");    
        $("#employment_type option:first").attr("selected","selected");
  
        $("#min_lang_skill option[selected]").removeAttr("selected");    
        $("#min_lang_skill option:first").attr("selected","selected");
  
        $("#min_exp_year option[selected]").removeAttr("selected");    
        $("#min_exp_year option:first").attr("selected","selected");
  
        $("#city option[selected]").removeAttr("selected");    
        $("#city option:first").attr("selected","selected"); 
        
        $("#area option[selected]").removeAttr("selected");    
        $("#area option:first").attr("selected","selected"); 
    }
    selectDisable = (event) => {   
        $("#city option:first").attr("disabled","disabled");
   
        $("#area option:first").attr("disabled","disabled"); 
  
        $("#employment_type option:first").attr("disabled","disabled"); 
  
        $("#min_lang_skill option:first").attr("disabled","disabled"); 
  
        $("#min_exp_year option:first").attr("disabled","disabled"); 
    }

    getDateString = (obj) => {
        console.log(obj.seconds)
        var t = new Date(1970, 0, 1);
        t.setSeconds(obj.seconds);
        console.log(t)
        console.log(t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()+' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds()+'-'+t.getTimezoneOffset())
        return t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
    }

    render (){
        const areas = this.props.areas
        const dynamic_cities = this.state.cities

        return (
        <LayoutAdmin title="All Posted Jobs">
        <table ref={this.datatableRef} className="display" style={{width : 100 + "%"}}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Employer</th>
                    <th>Employment Type</th>
                    <th>Salary <i className="fa fa-yen-sign"></i></th>
                    <th>Work Location</th>
                    <th>Posted Date</th>    
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.state.jobs && this.state.jobs.map((job) => (
                    <tr id={job.id}>

                        <td>{job.data.title}</td>
                        <td>{this.getCompanyName(job.data.company)}</td>
                        <td>{job.data.employment_type}</td>
                        <td>{`${job.data.min_salary} ~ ${job.data.max_salary}`}</td>
                        <td>{this.getLocation(job.data.city,job.data.area)}</td>
                        <td>{this.getDateString(job.data.posted_date)}</td>
                        <td className="btn_center">
                            <a data-toggle="modal" data-target="#jobEditModal" onClick={()=>this.getPassIdEdit(job.id)} className="edit_btn"><i className="fa fa-edit table_btn"></i>Edit</a>
                        </td>
                        <td className="btn_center">
                            <a onClick={()=>this.getPassIdDelete(job.id,job.data.company)} className="delete_btn"><i className="fa fa-trash table_btn"></i>Delete</a>
                        </td>
                    </tr>
                ) )
                
                }
                
                
            </tbody>
        </table>

        <div className="modal fade" id="jobEditModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Job Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">

            <form className="register_form">

                <div className="form-group">
                <label for="title">Job Title</label>
                    <div className="input-group-icon mt-10">
                        <div className="icon "><i className="fa fa-briefcase   " aria-hidden="true "></i></div>
                        <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} required className="single-input"/>
                    </div>
                </div>
                
                <div className="container to_up">
                    
                    <div className="row">
                    <div className="form-group two_col_input_left">
                    <label for="min_salary">Minimum Salary</label>
                    <div className="input-group-icon mt-10 ">
                            <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                            <input type="number" name="min_salary" id="min_salary"   value={this.state.min_salary} onChange={this.handleChange} required className="single-input"/>

                        </div>
                    </div>
                    <div className="form-group two_col_input">
                    <label for="max_salary">Maximum Salary</label>
                    <div className="input-group-icon mt-10 ">
                            <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                            <input type="number" name="max_salary" id="max_salary"  value={this.state.max_salary} onChange={this.handleChange} required className="single-input"/>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="form-group to_up">
                <label for="employment_type">Employment Type</label>
                <div className="input-group-icon mt-10 ">
                <div className="icon "><i className="fas fa-list " aria-hidden="true "></i></div>
                <select id="employment_type" name="employment_type" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
                        <option value="">Employment Type</option>
                        {this.state.employment_type == "Full" ? <option value="Full" selected>Full Time</option> : <option value="Full">Full Time</option>}
                        {this.state.employment_type == "Part" ? <option value="Part" selected>Part Time</option> : <option value="Part">Part Time</option>}
                           
                </select>
                </div>
                </div>

                <div className="form-group to_up">
                <label for="min_age">Vacancy</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-briefcase" aria-hidden="true "></i></div>
                    <input type="number" name="vacancy" id="vacancy"  value={this.state.vacancy} onChange={this.handleChange} required className="single-input"/>
                </div>
                </div>

                <div className="form-group to_up">
                <label for="min_age">Minimum Required Age</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-child" aria-hidden="true "></i></div>
                    <input type="number" name="min_age" id="min_age"  value={this.state.min_age} onChange={this.handleChange} required className="single-input"/>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="work_day">Work Days</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-calendar-alt " aria-hidden="true "></i></div>
                    <textarea name="work_day" id="work_day" cols="30" rows="4"  value={this.state.work_day} onChange={this.handleChange} className="single-input" required></textarea>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="work_hour">Work Hours</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-clock " aria-hidden="true "></i></div>
                    <textarea name="work_hour" id="work_hour" cols="30" rows="4"  value={this.state.work_hour} onChange={this.handleChange} className="single-input" required></textarea>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="min_lang_skill">Minimum Japanese Language Skill</label>
                <div className="input-group-icon mt-10 ">
                <div className="icon "><i className="fas fa-language " aria-hidden="true "></i></div>
                <select id="min_lang_skill" name="min_lang_skill" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
                        <option value="">Japanese Languae Skill</option>
                        {this.state.min_lang_skill == 3 ? <option value="3" selected>N3</option> : <option value="3">N3</option>}
                        {this.state.min_lang_skill == 2 ? <option value="2" selected>N2</option> : <option value="2">N2</option>}
                        {this.state.min_lang_skill == 1 ? <option value="1" selected>N1</option> : <option value="1">N1</option>}
                        
                </select>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="min_exp_year">Minimum Experience Years</label>
                <div className="input-group-icon mt-10 ">
                <div className="icon "><i className="fas fa-calendar-check " aria-hidden="true "></i></div>
                <select id="min_exp_year" name="min_exp_year" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
                        <option value="">Min Experience Years</option>
                        {this.state.min_exp_year == 1 ? <option value="1" selected>Less Than 1 Year</option> : <option value="1">Less Than 1 Year</option>}
                        {this.state.min_exp_year == 2 ? <option value="2" selected>1-2 Years</option> : <option value="2">1-2 Years</option>}
                        {this.state.min_exp_year == 3 ? <option value="3" selected>2-3 Years</option> : <option value="3">2-3 Years</option>}
                        {this.state.min_exp_year == 4 ? <option value="4" selected>3-6 Years</option> : <option value="4">3-6 Years</option>}
                        {this.state.min_exp_year == 5 ? <option value="5" selected>6 Years and more</option> : <option value="5">6 Years and more</option>} 
                </select>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="area">Area</label>
                <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                        <select id="area" name="area" onChange={this.handleChange} className="form-control single-input select_border" required>
                            
                            {areas && areas.map(area => (
                            this.state.area == area.id ? <option value={area.id} selected>{area.data.name}</option> : <option value={area.id}>{area.data.name}</option>
                            ))}
                        </select>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="city">{ this.state.areaName !== "" && `Cities in ${this.state.areaName}` || `Cities`}</label>
                <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                    <select id="city" name="city" onChange={this.handleChange} className="form-control single-input select_border" required>
                    {
                    dynamic_cities && dynamic_cities.map(city => (
                        this.state.city == city.id ? <option value={city.id} selected>{city.data.name}</option> : <option value={city.id}>{city.data.name}</option>
                    ))
                    }
                </select>
                </div>
                </div>

                <div className="form-group to_up">
                <label for="job_address">Job Address</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
                    <textarea name="job_address" id="job_address" cols="30" rows="4"  value={this.state.job_address} onChange={this.handleChange} className="single-input" required></textarea>
                </div>
                </div>    

                <div className="form-group to_up">
                <label for="description">Description</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                    <textarea name="description" id="description" cols="30" rows="4"  value={this.state.description} onChange={this.handleChange} className="single-input" required></textarea>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="requirement">Requirements</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                    <textarea name="requirement" id="requirement" cols="30" rows="4"  value={this.state.requirement} onChange={this.handleChange} className="single-input" required></textarea>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="other_qualification">Other Qualifications</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
                    <textarea name="other_qualification" id="other_qualification" cols="30" rows="4"  value={this.state.other_qualification} onChange={this.handleChange} className="single-input"></textarea>
                </div>
                </div>
                <div className="form-group to_up">
                <label for="other_message">Other Message</label>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-comments " aria-hidden="true "></i></div>
                    <textarea name="other_message" id="other_message" cols="30" rows="4"  value={this.state.other_message} onChange={this.handleChange} className="single-input"></textarea>
                </div>
                </div>

            </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn" data-dismiss="modal" aria-label="Cancel">Cancel</button>  
                <button onClick={this.updateJob} className="btn" data-dismiss="modal" style={{width:100+"%"}}>Update Job Details</button>
            </div>
            </div>
        </div>
        </div>

        <div className="modal fade" id="updateSuccessfulModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Congratulations !!!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            {`${this.state.updateOrDelete} Successfully`} 
            </div>
            <div className="modal-footer">  
                <button type="button" className="btn" data-dismiss="modal">OK</button>
            </div>
            </div>
        </div>
        </div>
        
        <div className="modal fade" id="deleteConfirm" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Hey Admin !!!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Are You Sure to Delete the Job ?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn" data-dismiss="modal" aria-label="Cancel">Cancel</button>  
                <button type="button" className="btn" data-dismiss="modal" onClick={this.deleteJob}>Delete</button>
            </div>
            </div>
        </div>
        </div>                

        </LayoutAdmin>
        
        
        )
    }
}




