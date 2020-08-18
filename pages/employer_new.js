import React from 'react';
import LayoutAdmin from '../components/LayoutAdmin';
import {db, getCollectionRecords, AREA_COLLECTION} from '../lib/db'

export default class EmployerNew extends React.Component {
    constructor(props){
        super(props);
        this.initial_state = {
            name : 'Company Name',
            email : 'Business Email',
            phone : 'Phone Number',
            city : 'City',
            area : 'Area',
            address : 'Address',
            showCities : false,
            cities : []
            
        };
        this.state = this.initial_state;
    }
    static async getInitialProps ({ req, res, query }){ 
        let areas = await getCollectionRecords(AREA_COLLECTION)
       
        return {areas}
    }
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }

   
    handleChange = (event) => {
            this.setState({[event.target.name] : event.target.value});
            if(event.target.name == "area"){
                this.getCities(event.target.value)
                this.getAreaName(event.target.value)
            }
            this.setState({showCities : true})
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

    clearInput = (event) => {
        this.setState(this.initial_state);
        let inputs, index;

        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = ''
        }
        document.getElementById('address').value = '';
        $("#city option[selected]").removeAttr("selected");    
        $("#city option:first").attr("selected","selected");

        $("#area option[selected]").removeAttr("selected");    
        $("#area option:first").attr("selected","selected");   
    }
    selectDisable = (event) => {   
        $("#city option:first").attr("disabled","disabled");
   
        $("#area option:first").attr("disabled","disabled"); 
    }
    handleSubmit = (event) => {
        const employer = this.state; 
        
        event.preventDefault();
        try {
            db.collection("employer").add(
                {name : employer.name,
                 email : employer.email,
                 phone : employer.phone,
                 city : employer.city,
                 area : employer.area,
                 address : employer.address
                }
            )
            $("#successModal").modal('show');
        }catch(error){
            console.log(error);
            this.setState({isSuccess : false});
        }
        console.log(this.state);
    }
    render (){
        const {areas} = this.props
        const dynamic_cities = this.state.cities
        return (
            
        <LayoutAdmin title="Add New Company">
            <div className="modal fade" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">New Company Created Successfully !</h5>
        <button type="button" onClick={this.clearInput} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {this.state.name}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.clearInput}>OK!</button>
      </div>
    </div>
  </div>
</div>
            <div className="row">
        <div className="col-xl-7 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
        {this.state.isSuccess && <p className="alert alert-success">{`${this.state.name} is created successfully !!!`}</p>}
            <h3 className="mb-30">New Company</h3>
            <form className="register_form">
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-building " aria-hidden="true "></i></div>
                    <input type="text" name="name" onChange={this.handleChange}  placeholder={this.state.name} required className="single-input"/>
                </div>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-envelope " aria-hidden="true "></i></div>
                    <input type="email" name="email" onChange={this.handleChange} placeholder={this.state.email} required className="single-input"/>
                </div>
                <div className="input-group-icon mt-10">
                    <div className="icon "><i className="fa fa-phone " aria-hidden="true "></i></div>
                    <input type="text" name="phone" onChange={this.handleChange} placeholder={this.state.phone} required className="single-input"/>
                </div>
                <div className="input-group-icon mt-10 ">
                    <div className="icon "><i className="fas fa-map-marker-alt " aria-hidden="true "></i></div>
                     <select id="area" name="area" onClick={this.selectDisable} onChange={this.handleChange} className="form-control single-input select_border">
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
                    <select id="city_add_new" name="city" onClick={this.selectDisable} onChange={this.handleChange}  className="form-control single-input select_border">
                        <option value="">{`Cities in ${this.state.areaName}`}</option>
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
                    <textarea name="address" id="address" cols="30" rows="5" onChange={this.handleChange} placeholder={this.state.address} className="single-input"></textarea>
                </div>
                <hr/>
                <div className="mt-10 ">
                    <input type="file" name="logo" id="my-file"/>
                    <label for="my-file" className="custom-file-upload">
                        <i className="fa fa-upload"></i> Upload Company Logo
                    </label>
                </div>
                <button onClick={this.handleSubmit} className="btn" style={{width:100+"%" , marginTop : 5 + "em"}}>Add Company</button>
            </form>
        </div>
    </div>
        </LayoutAdmin>
        
        )
    }
}





