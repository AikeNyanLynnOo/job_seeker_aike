import React from 'react'
import LayoutAdmin from '../components/LayoutAdmin'
import {db,JOB_COLLECTION,AREA_COLLECTION,EMPLOYER_COLLECTION,CITY_COLLECTION,getCollectionRecords} from '../lib/db'

export default class EmployerAll extends React.Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.datatableRef = React.createRef()
        this.$datatable = null

        this.state = {
          delete_id : '',
          edit_id : '',
      
          //employer detail fields
          name : '',
          email : '',
          address : '',
          phone : '',
          city : '',
          area : '',
          showCities : false,
          cities : props.cities,
          employers : props.employers,
          jobs : props.jobs,
          generated_jobs : props.generated_jobs || [],
          
          //add job fields
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
          area_add_new : '',
          city_add_new : '',
          job_address : '',
          description : '',
          requirement : '',
          other_qualification : '',
          other_message : '',
      
          updateOrPostNew : '',
          job_count : 0
          }
    }
    
    
    static async getInitialProps (){ 
        let employers =  await getCollectionRecords(EMPLOYER_COLLECTION)
        let cities =  await getCollectionRecords(CITY_COLLECTION)
        let areas =  await getCollectionRecords(AREA_COLLECTION)
        let jobs =  await getCollectionRecords(JOB_COLLECTION)

        let generated_jobs = await getCollectionRecords(JOB_COLLECTION,1)
        
        return {employers,cities,areas,jobs,generated_jobs} 
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
      EmployerAll
        .getInitialProps()
        .then((response) => {
          self.setState({
            employers: response.employers,
            jobs : response.jobs
          });
        })
        .bind(this);
    }

    getJobCount = (id) => {
        let count = 0
        this.state.jobs.map(job => {
          if(job.data.company == id ){
            count ++
          }
        })
        return count
    }
    seeJobs = (id,name) => {
      
        this.setState({eName : name})
        let jobs = []
        this.props.jobs.map(job => {
          job.data.company == id && jobs.push(Object.assign({id : job.id,data : job.data}))
        })
        this.setState({generated_jobs : jobs})
        
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        if(event.target.name == "area" || event.target.name=="area_add_new"){
          this.getAreaName(event.target.value)
          this.getCities(event.target.value)

      }
      if(event.target.id == "area_add_new"){
        this.setState({showCities : true})
      }
    }

	  getPassIdDelete = (id) => {
        event.preventDefault()
        $("#deleteConfirm").modal('show');
        this.setState({delete_id : id})
    }

    deleteEmployer = async () => {
        try{
            db.collection('employer').doc(this.state.delete_id).delete()
            this.setState({updateOrDelete : "Deleted"})
            this.refreshTable()
            this.showSuccessfulDialog()
        }catch(error) {
            console.log(error)
        }
    }

    getPassIdEdit = (id) => {

        this.setState ({edit_id : id})
        let data = {}
        try{
            db.collection('employer').doc(id).get()
            .then((snapshot)=>{
                data = snapshot.data();
                this.setState({name : data.name, email : data.email, phone : data.phone, address : data.address, city : data.city, area : data.area})
                this.getCities(data.area)
                this.getAreaName(data.area)
            })
            
        }catch(error){
            console.log(error)
        }
        $("#editModal").modal('show');
    }

    UpdateEmployer =  () => {
      try{
          db.collection('employer').doc(this.state.edit_id).update({name : this.state.name ,
               email : this.state.email , 
               phone : this.state.phone , 
               address : this.state.address , 
               city : this.state.city , 
               area : this.state.area})
          this.setState({updateOrPostNew : "Updated"})    
          this.refreshTable()
          this.showSuccessfulDialog()
      }catch(error){
          console.log(error)
      }
    }

    showSuccessfulDialog (){
        $("#updateSuccessfulModal").modal('show')
    }


    getPassIdAddJob = (id) => {
      this.setState ({edit_id : id})
      let data = {}
      try{
          db.collection('employer').doc(id).get()
          .then((snapshot)=>{
              data = snapshot.data();
              this.setState({name : data.name})
          })
      }catch(error){
          console.log(error)
      }
      $("#jobAddNew").modal('show');
    }

    addNewJob = () =>{
      const today = new Date();
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      //const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    try {
        db.collection("job").add(
            {title : this.state.title,
            min_salary : parseInt(this.state.min_salary),
            max_salary : parseInt(this.state.max_salary),
            employment_type : this.state.employment_type,
            vacancy : parseInt(this.state.vacancy),
            min_age : parseInt(this.state.min_age),
            work_day : this.state.work_day,
            work_hour : this.state.work_hour,
            min_lang_skill : parseInt(this.state.min_lang_skill),
            min_exp_year : parseInt(this.state.min_exp_year),
            area : this.state.area,
            city : this.state.city,
            job_address  : this.state.job_address,
            description : this.state.description,
            requirement : this.state.requirement,
            other_qualification : this.state.other_qualification,
            other_message : this.state.other_message,
            posted_date : today,
            company : this.state.edit_id
            }
        )
          this.showSuccessfulDialog()
          this.setState({updateOrPostNew : "Posted"})   
          this.setState({areaName : ''})  
          this.setState({cities : []})
          this.refreshTable() 
          
          
          
        
    }catch(error){
        console.log(error);
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
      document.getElementById('job_address').value = '';
      document.getElementById('other_qualification').value = '';
      document.getElementById('other_message').value = '';

      $("#employment_type option[selected]").removeAttr("selected");    
      $("#employment_type option:first").attr("selected","selected");

      $("#min_lang_skill option[selected]").removeAttr("selected");    
      $("#min_lang_skill option:first").attr("selected","selected");

      $("#min_exp_year option[selected]").removeAttr("selected");    
      $("#min_exp_year option:first").attr("selected","selected");

      $("#city_add_new option[selected]").removeAttr("selected");    
      $("#city_add_new option:first").attr("selected","selected"); 
      
      $("#area_add_new option[selected]").removeAttr("selected");    
      $("#area_add_new option:first").attr("selected","selected"); 
  }
  selectDisable = (event) => {   
      $("#city_add_new option:first").attr("disabled","disabled");
 
      $("#area_add_new option:first").attr("disabled","disabled"); 

      $("#employment_type option:first").attr("disabled","disabled"); 

      $("#min_lang_skill option:first").attr("disabled","disabled"); 

      $("#min_exp_year option:first").attr("disabled","disabled"); 
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

   getDateString = (obj) => {
    console.log(obj.seconds)
    var t = new Date(1970, 0, 1);
    t.setSeconds(obj.seconds);
    console.log(t)
    console.log(t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()+' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds()+'-'+t.getTimezoneOffset())
    return t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
}

    render (){
        const dynamic_cities = this.state.cities
        
        const areas = this.props.areas

        return (
        <LayoutAdmin title="All Companies">
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
        Are You Sure to Delete the Employer ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" data-dismiss="modal" aria-label="Cancel">Cancel</button>  
        <button type="button" className="btn" data-dismiss="modal" onClick={this.deleteEmployer}>Delete</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Employer</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

    <div class="form-group">
      <label for="name">Company Name</label>
      <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange}></input>
    </div>
    <div class="form-group">
      <label for="email">Business Email</label>
      <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange}></input>
    </div>
    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}></input>
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" className="form-control" id="address" name="address" value={this.state.address} onChange={this.handleChange}></input>
    </div>
    
    <div class="form-group">
      <label for="area">Area</label>
      <select id="area" name="area" onChange={this.handleChange} className="form-control">
        {areas && areas.map(area => (
          this.state.area == area.id ? <option value={area.id} selected>{area.data.name}</option> : <option value={area.id}>{area.data.name}</option>
        ))}
      </select>
    </div>
      <div class="form-group">
        <label for="city">{`Cities in ${this.state.areaName}`}</label>
      <select id="city" name="city" onChange={this.handleChange} className="form-control">
        {
          dynamic_cities && dynamic_cities.map(city => (
            this.state.city == city.id ? <option value={city.id} selected>{city.data.name}</option> : <option value={city.id}>{city.data.name}</option>
        ))
        }
      </select>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" data-dismiss="modal" aria-label="Cancel">Cancel</button>  
        <button type="button" className="btn" data-dismiss="modal" onClick={this.UpdateEmployer}>Update</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="jobAddNew" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add New Job</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      <form className="register_form">

          <div className="input-group-icon mt-10 ">
          <div className="icon "><i className="fas fa-building " aria-hidden="true "></i></div>
          <input type="text" name="name" placeholder={this.state.name} className="single-input" disabled/>
          </div>

          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-briefcase   " aria-hidden="true "></i></div>
              <input type="text" name="title" onChange={this.handleChange} placeholder="Job Title" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Job Title'" required className="single-input"/>
          </div>
          <div className="container">
              <div className="row">
                  <div className="input-group-icon mt-10 two_col_input_left">
                      <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                      <input type="number" name="min_salary" id="min_salary" onChange={this.handleChange} placeholder="Minimum Salary" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Minimum Salary'" required className="single-input"/>
                  </div>
                  <div className="input-group-icon mt-10 two_col_input">
                      <div className="icon "><i className="fa fa-yen-sign" aria-hidden="true "></i></div>
                      <input type="number" name="max_salary" id="max_salary" onChange={this.handleChange} placeholder="Max Possible Salary" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Max Possible Salary'" required className="single-input"/>
                  </div>
              </div>
          </div>

          <div className="input-group-icon mt-10 ">
          <div className="icon "><i className="fas fa-list " aria-hidden="true "></i></div>
          <select id="employment_type" name="employment_type" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
                      <option value="">Employment Type</option>
                      <option value="Full">Full Time</option>
                      <option value="Part">Part Time</option>   
          </select>
          </div>
          
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-briefcase" aria-hidden="true "></i></div>
              <input type="number" name="vacancy" id="vacancy" onChange={this.handleChange} placeholder="Vacancy" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Vacancy'" required className="single-input"/>
          </div>

          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-child" aria-hidden="true "></i></div>
              <input type="number" name="min_age" id="min_age" onChange={this.handleChange} placeholder="Minimum Required Age" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Minimum Required Age'" required className="single-input"/>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-calendar-alt " aria-hidden="true "></i></div>
              <textarea name="work_day" id="work_day" cols="30" rows="4" onChange={this.handleChange} placeholder="Working Days" className="single-input" required></textarea>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-clock " aria-hidden="true "></i></div>
              <textarea name="work_hour" id="work_hour" cols="30" rows="4" onChange={this.handleChange} placeholder="Working Hours" className="single-input" required></textarea>
          </div>

          <div className="input-group-icon mt-10 ">
          <div className="icon "><i className="fas fa-language " aria-hidden="true "></i></div>
          <select id="min_lang_skill" name="min_lang_skill" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
          <option value="">Japanese Languae Skill</option>
                              <option value="3">N3</option>
                              <option value="2">N2</option>
                              <option value="1">N1</option>  
          </select>
          </div>

          <div className="input-group-icon mt-10 ">
          <div className="icon "><i className="fas fa-calendar-check " aria-hidden="true "></i></div>
          <select id="min_exp_year" name="min_exp_year" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
          <option value="">Min Experience Years</option>
                              <option value="1">Less Than 1 Year</option>
                              <option value="2">1-2 Years</option>
                              <option value="3">2-3 Years</option>
                              <option value="4">3-6 Years</option>
                              <option value="5">6 Years and more</option> 
          </select>
          </div>

          <div className="input-group-icon mt-10 ">
              <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                <select id="area_add_new" name="area" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border" required>
                  <option value="">Area</option>
                              {areas && areas.map(area=>(
                                  <option value={area.id}>{area.data.name}</option>
                              ))
                              }
                  </select>
          </div>
          {this.state.showCities && (
          <React.Fragment>
              <div className="input-group-icon mt-10 ">
                  <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                  <select id="city_add_new" name="city" onClick={this.selectDisable} onChange={this.handleChange}  className="form-control single-input select_border" required>
                      <option value="">{ this.state.areaName !== "" && `Cities in ${this.state.areaName}` || `Cities`}</option>
                      {dynamic_cities.map((city)=>(
                          <option value={city.id}>{city.data.name}</option>
                      )  
                      )
                      }
                  </select>
              </div>
          </React.Fragment>
          )
          }

          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-home " aria-hidden="true "></i></div>
              <textarea name="job_address" id="job_address" cols="30" rows="4" onChange={this.handleChange} placeholder="Job Address" className="single-input" required></textarea>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
              <textarea name="description" id="description" cols="30" rows="4" onChange={this.handleChange} placeholder="Job Description" className="single-input" required></textarea>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
              <textarea name="requirement" id="requirement" cols="30" rows="4" onChange={this.handleChange} placeholder="Job Requirements" className="single-input" required></textarea>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-tasks " aria-hidden="true "></i></div>
              <textarea name="other_qualification" id="other_qualification" cols="30" rows="4" onChange={this.handleChange} placeholder="Other Qualifications (Optional)" className="single-input"></textarea>
          </div>
          <div className="input-group-icon mt-10">
              <div className="icon "><i className="fa fa-comments " aria-hidden="true "></i></div>
              <textarea name="other_message" id="other_message" cols="30" rows="4" onChange={this.handleChange} placeholder="Other Message (Optional)" className="single-input"></textarea>
          </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" data-dismiss="modal" aria-label="Cancel">Cancel</button>  
        <button onClick={this.addNewJob} className="btn" data-dismiss="modal" style={{width:100+"%"}}>Add Company</button>
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
       {`${this.state.updateOrPostNew} Successfully`} 
      </div>
      <div className="modal-footer">  
        <button type="button" className="btn" data-dismiss="modal" onClick={this.clearInput}>OK</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="seeJobsModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.eName && this.state.eName}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      <table className="display" style={{width : 100 + "%"}}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Employment Type</th>
                    <th>Salary <i className="fa fa-yen-sign"></i></th>
                    <th>Work Location</th>
                    <th>Posted Date</th> 
                </tr>
            </thead>
            <tbody>
                {this.state.generated_jobs && this.state.generated_jobs.map((job) => (
                    <tr id={job.id}>

                        <td>{job.data.title}</td>
                        <td>{job.data.employment_type}</td>
                        <td>{`${job.data.min_salary} ~ ${job.data.max_salary}`}</td>
                        <td>{this.getLocation(job.data.city,job.data.area)}</td>
                        <td>{this.getDateString(job.data.posted_date)}</td>
                        
                    </tr>
                ) )
                
                }
                
                
            </tbody>
        </table>
      </div>
      
    </div>
  </div>
</div>

            <table ref={this.datatableRef} className="display" style={{width : 100 + "%"}}>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Total Jobs</th>
                                <th>New Job</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employers && this.state.employers.map((employer) => (
                                <tr id={employer.id}>
                                <td><img src="/assets/img/icon/job-list3.png" alt="" className="small_profile"/></td>
                                <td>{employer.data.name}</td>
                                <td>{employer.data.email}</td>
                                <td>{employer.data.phone}</td>
                                <td>{this.getLocation(employer.data.city,employer.data.area)}</td>
                                <td>{this.getJobCount(employer.id)}<i data-toggle="modal" data-target="#seeJobsModal" className="fa fa-eye" style={{marginLeft : 1+"em",cursor : "pointer"}} onClick={()=>this.seeJobs(employer.id,employer.data.name)}></i></td>
                                <td className="btn_center">
                                    <a onClick={()=>this.getPassIdAddJob(employer.id)} className="edit_btn table_btn"><i className="fa fa-plus" style={{marginBottom : 0.5+"em"}}></i>Add_Job</a>
                                </td>
                                <td className="btn_center">
                                    <a onClick={()=>this.getPassIdEdit(employer.id)} className="edit_btn table_btn"><i className="fa fa-edit" style={{marginBottom : 0.5+"em"}}></i>Edit</a>
                                </td>
                                <td className="btn_center">
                                    <a onClick={()=>this.getPassIdDelete(employer.id)} className="delete_btn table_btn"><i className="fa fa-trash" style={{marginBottom : 0.5+"em"}}></i>Delete</a>
                                </td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
        </LayoutAdmin>
        )
    }
}