import React from 'react'
import Link from 'next/link'
import LayoutWithFooter from '../components/LayoutWithFooter'
import {db, getCollectionRecords, AREA_COLLECTION, CITY_COLLECTION, EMPLOYER_COLLECTION} from "../lib/db";

export default class JobListing extends React.Component {

    constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.DEFAULT_ENTRY_PER_PAGE = 5
    this.DEFAULT_FIRST_INDEX = 0
    this.DEFAULT_LAST_INDEX = 5
    this.DEFAULT_CURRENT_PAGE = 1
    
    this.paging = {
        currentPage : this.DEFAULT_CURRENT_PAGE,
        firstIndex : this.DEFAULT_FIRST_INDEX,
        lastIndex : this.DEFAULT_LAST_INDEX,
        pages : Math.ceil(props.jobs.length/5),
        entryPerPage : this.DEFAULT_ENTRY_PER_PAGE,
        forWardBtn : true,
        backWardBtn : false,
    }
    this.initialState = {
        area : props.location || '',
        areaName : props.areaName || '',
        city : '',
        employment_type : props.type || '',
        min_exp_year : '',
        min_lang_skill : '',
        posted_within : '',
        min_salary : '',
        max_salary : '',
        noFoundCondition : false,
        regenerated_jobs : props.jobs || [],
        showCities : false,
        cities : props.dyanmic_cities || [],
        ...this.paging,
        isFilterOpen: false

    }
    this.state = this.initialState
    }

    static async getInitialProps ({req,res,query}){ 

        let jobs = []
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let area = {}
        let cities = await getCollectionRecords(CITY_COLLECTION)
        let dyanmic_cities = []
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)

        let type = query.type || ""
        let location = query.location || ""
        let querysnapshot = db.collection('job')
        if(type !== ""){
            querysnapshot = querysnapshot.where('employment_type','==',type)
        }
        if(location !== ""){
            querysnapshot = querysnapshot.where('area','==',location)
            //get the passed area
            try{
                db.collection('area').doc(query.location).get()
                    .then((snapshot)=>{
                        area = snapshot.data();
                    })
                }catch(error){
                    console.log(error)
            }
            //get the cities existing passed area
            try{
                db.collection('city').where('area_id',"==",query.location).get().
                then((snapshot)=>{
                    snapshot.forEach(doc => {
                        dyanmic_cities.push(Object.assign(
                            {id : doc.id,
                            data : doc.data()}
                        ))
                    })
                })
                
            }catch(error){
                console.log(error)
            }
        }
        
        const querySnapshotJob = await querysnapshot.orderBy('posted_date').get()
        querySnapshotJob.forEach(doc => {
            jobs.push(Object.assign(
                {id : doc.id,
            data : doc.data()}
            ))
        })

        return {...query, areaName : area.name, jobs : jobs.reverse(), areas, cities, dyanmic_cities, companies}
    }

    toggleFilter = () => {
        this.setState({
          isFilterOpen: !this.state.isFilterOpen,
        });
      };

    applyFilter = async () => {
        this.setState({
        currentPage : this.DEFAULT_CURRENT_PAGE,
        firstIndex : this.DEFAULT_FIRST_INDEX,
        lastIndex : this.DEFAULT_LAST_INDEX,
        entryPerPage : this.DEFAULT_ENTRY_PER_PAGE,
        forWardBtn : true,
        backWardBtn : false
        })

        let jobs = []
        let toReturnJobs = []
        let REGENERATED_IDS = []
        console.log(this.state)
        const today = new Date()
        try{
            let query = db.collection('job')
        if(this.state.employment_type !== ""){
            query = query.where('employment_type','==',this.state.employment_type)
        }
        if(this.state.area !== ""){
            query = query.where('area','==',this.state.area)
        }
        if(this.state.city !== ""){
            query = query.where('city','==',this.state.city)
        }
        
        if(this.state.min_exp_year !== ""){
            query = query.where('min_exp_year','==',parseInt(this.state.min_exp_year))
        }
        if(this.state.min_lang_skill !== ""){
            query = query.where('min_lang_skill','<=',parseInt(this.state.min_lang_skill))
            query = query.orderBy("min_lang_skill")
        }

            query.orderBy("posted_date").get()
            .then(snaphsot => {
                snaphsot.forEach(doc=>{

                    if(this.state.posted_within !== ""){
                        if(this.state.posted_within == '1'){
                            if(this.checkDateEqual(doc.data().posted_date)){
                                if(this.state.min_salary !== ""){
                                    doc.data().min_salary >= parseInt(this.state.min_salary) &&  jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))
                                }else {
                                    jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))  
                                }
                                }
                        }else if(this.state.posted_within == '2'){
                            if(this.checkDateLastThreeDays(doc.data().posted_date)){
                                   if(this.state.min_salary !== ""){
                                    doc.data().min_salary >= parseInt(this.state.min_salary) &&  jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                        }))
                                    }
                                    else {
                                    jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))  
                                    }
                            }
                        }else if(this.state.posted_within == '3'){
                            if(this.checkDateLastSevenDays(doc.data().posted_date)){
                                   if(this.state.min_salary !== ""){
                                    doc.data().min_salary >= parseInt(this.state.min_salary) &&  jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))
                                    }
                                    else {
                                    jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))  
                                    }
                            }
                        }else if(this.state.posted_within == '4'){
                            if(this.checkDateThisMonth(doc.data().posted_date)){
                                if(this.state.min_salary !== ""){
                                    doc.data().min_salary >= parseInt(this.state.min_salary) &&  jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))
                                }
                                else {
                                    jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))  
                                }
                            }
                        }
                    }else{
                        if(this.state.min_salary !== ""){
                                    doc.data().min_salary >= parseInt(this.state.min_salary) &&  jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))
                        }
                        else {
                                    jobs.push(Object.assign({
                                        id : doc.id,
                                        data : doc.data()
                                    }))  
                        }
                    }
                    
                })

                REGENERATED_IDS = [...new Set(jobs.reverse().map(job => job.id))] 
                console.log(REGENERATED_IDS)
                if(REGENERATED_IDS.length > 0){
                    REGENERATED_IDS.forEach(id => {
                        db.collection('job').doc(id).get()
                        .then(snapshot=>{
                            toReturnJobs.push(Object.assign({id : id , data : snapshot.data()}))
                            this.setState({regenerated_jobs : toReturnJobs})
                            this.setState({noFoundCondition : false})
                            this.setState({pages : Math.ceil(toReturnJobs.length/5)})
                        })
                    })
                    
                }else {
                    this.setState({noFoundCondition : true})
                    this.setState({regenerated_jobs : []})
                }
            })
        }catch(error){
            console.log(error)
        }
        
    }
    checkDateEqual = (dateobj) => {
        const today = new Date()
        var d = new Date(1970, 0, 1);
        d.setSeconds(dateobj.seconds)
        if(d.getDate()+1 == today.getDate()){
            return true
        }else return false
    }
    checkDateLastThreeDays = (dateobj) => {
        const today = new Date()
        var d = new Date(1970, 0, 1);
        d.setSeconds(dateobj.seconds)
        console.log(`Last 3 days is ${today.getDate()-3}`)
        if(today.getDate()-3 <= d.getDate()+1 && d.getDate()+1 <= today.getDate()){
            return true
        }else return false
    }
    checkDateLastSevenDays = (dateobj) => {
        const today = new Date()
        var d = new Date(1970, 0, 1);
        d.setSeconds(dateobj.seconds)
        console.log(`Last 3 days is ${today.getDate()-7}`)
        if(today.getDate()-7 <= d.getDate()+1 && d.getDate()+1 <= today.getDate()){
            console.log("true")
            return true
        }else return false
    }
    checkDateThisMonth = (dateobj) => {
        let today = new Date()
        var d = new Date(1970, 0, 1);
        d.setSeconds(dateobj.seconds)
        if(Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) ) /(1000 * 60 * 60 * 24) )<= 30){
            console.log("true")
            return true
        }else {
            console.log("false")
            return false
        }
    }

    resetFilter = () => {
        this.setState(this.initialState)
        console.log(this.state)
    }



    handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
    if(event.target.name == "area"){
        this.getAreaName(event.target.value)
        this.getCities(event.target.value)
        this.setState({showCities : true})
    }
    if(event.target.name == "area" && event.target.value == ""){
        this.setState({showCities : false})
    }
    if(event.target.name == "entryPerPage"){
        this.setState({
            currentPage : this.DEFAULT_CURRENT_PAGE,
            firstIndex : this.DEFAULT_FIRST_INDEX,
            lastIndex : parseInt(event.target.value),
            forWardBtn : true,
            backWardBtn : false,
            pages : Math.ceil(this.state.regenerated_jobs.length/parseInt(event.target.value))
            })
    }
    }

    getJobsOrderedByDated = (direction) => {
        let jobs = []
        try{
            db.collection('job').orderBy('posted_date').get()
            .then(snaphsot => {
                snaphsot.forEach(doc=>{
                    jobs.push(Object.assign({
                        id : doc.id,
                        data : doc.data()
                    }))
                })
                direction == "old_to_new" ? this.setState({regenerated_jobs : jobs}) : this.setState({regenerated_jobs : jobs.reverse()})
                
            })
        }catch(error){
            console.log(error)
        }
    }

    reGenerateJobs = (event) => {
    let jobs = []
    this.setState({[event.target.name] : event.target.value})
    if(this.state.regenerated_jobs.length == this.props.jobs.length){
        this.getJobsOrderedByDated(event.target.value)
    } else {
        jobs = this.state.regenerated_jobs
        if(event.target.value == "old_to_new"){
            jobs.sort(function(a, b) {
                return a.data.posted_date - b.data.posted_date;
            })
            this.setState({regenerated_jobs : jobs})
        }else if(event.target.value == "new_to_old"){
            jobs.sort(function(a, b) {
                return b.data.posted_date - a.data.posted_date;
            })
            this.setState({regenerated_jobs : jobs})
        }
        
    }
    }

    goPrevious = () => {
    let firstIndex = 0
    this.setState({currentPage : this.state.currentPage-1})
    this.state.currentPage < 3 && this.setState({backWardBtn : false}) 
    this.state.currentPage <= this.state.pages && this.setState({forWardBtn : true}) 
        let lastIndex = this.state.firstIndex
        if(lastIndex==parseInt(this.state.entryPerPage)){
            firstIndex = 0
        }else{
            firstIndex =  lastIndex-parseInt(this.state.entryPerPage)
        }
        
    this.setState({firstIndex : firstIndex})
    this.setState({lastIndex : lastIndex})

    }
    goForward = () => {
    this.setState({currentPage : this.state.currentPage+1})
    this.state.currentPage == this.state.pages-1 && this.setState({forWardBtn : false}) 
    this.state.currentPage >= 1 && this.setState({backWardBtn : true}) 
    this.setState({currentPage : this.state.currentPage+1})
    this.setState({firstIndex : this.state.lastIndex})
    this.setState({lastIndex : this.state.lastIndex+parseInt(this.state.entryPerPage)})

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

    getValue = (id) => {
        let value = ""
        this.props.areas.map(area => {
            if(area.id == id){
                value = area.data.name
            }
        })
        this.props.cities.map(city => {
            if(city.id == id){
                value = city.data.name
            }
        })
        return value
    }

    getDateString = (obj) => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(obj.seconds);
    // console.log(t)
    // console.log(t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()+' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds()+'-'+t.getTimezoneOffset())
    return t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
    }

    filterShow = () => {
    $("#filterModal").modal('show')
    }

    quickView = (id) => {
    let job = {}
    try{
        db.collection('job').doc(id).get()
        .then(snapshot => {
            job = snapshot.data()
            this.setState({
                view_title : job.title,
                view_min_salary : job.min_salary,
                view_max_salary : job.max_salary,
                view_employment_type : job.employment_type,
                view_vacancy : job.vacancy,
                view_min_age : job.min_age,
                view_work_day : job.work_day,
                view_work_hour : job.work_hour,
                view_min_lang_skill : job.min_lang_skill,
                view_min_exp_year : job.min_exp_year,
                view_area : job.area,
                view_city : job.city,
                view_job_address : job.job_address,
                view_company : job.company,
                view_description : job.description,
                view_requirement : job.requirement,
                view_other_qualification : job.other_qualification,
                view_other_message : job.other_message,
                view_posted_date : job.posted_date
            })
        })
        
    }catch(error){
        console.log(error)
    }

    }

    getExpYear = (expID) => {
        let returnString = ""
        switch(expID){
            case 1 : returnString = "Less Than 1 Year" 
                     break
            case 2 : returnString = "1-2 Years"
                     break
            case 3 : returnString = "2-3 Years"
                     break
            case 4 : returnString = "3-6 Years"
                     break
            case 5 : returnString = "6 Years and more"
        }
        return returnString 
    }

    getPostedWithin = (dateID) => {
        let returnString = ""
        switch(dateID){
            case 1 : returnString = "Today" 
                     break
            case 2 : returnString = "Last 3 Days"
                     break
            case 3 : returnString = "Last 7 Days"
                     break
            case 4 : returnString = "This Month"
        }
        return returnString 
    }
    getJobCount = (id) => {
        let count = 0
        this.props.jobs.map(job => {
            (job.data.city == id || job.data.area == id) && count++ 
        })
        return count
    }

    render (){
    const areas = this.props.areas
    const cities = this.state.cities
    const viewCities = this.props.cities

    return (
        <LayoutWithFooter title="Job List" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
        {/* {this.state.pages && <div>{`pages is ${this.state.pages}`}</div>}
        {this.state.currentPage && <div>{`current page is ${this.state.currentPage}`}</div>}
        {this.state.firstIndex && <div>{`first index is ${this.state.firstIndex}`}</div>}
        {this.state.lastIndex && <div>{`last index is ${this.state.lastIndex}`}</div>} */}
        

        <div className="modal fade" id="quickView" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.getCompanyName(this.state.view_company)}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">

            <div className="container">
                <div className="row">

                <div className="label col-2">Job Title</div>
                <div className="value">{this.state.view_title}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Minimum Salary</div>
                <div className="value">{this.state.view_min_salary}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Maximum Salary</div>
                <div className="value">{this.state.view_max_salary}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Employment Type</div>
                <div className="value">{`${this.state.view_employment_type} Time`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Vacancy</div>
                <div className="value">{`${this.state.view_vacancy}`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Minimum Required Age</div>
                <div className="value">{`${this.state.view_min_age} Years Old`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Working Days</div>
                <div className="value">{`${this.state.view_work_day}`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Working Hours</div>
                <div className="value">{`${this.state.view_work_hour}`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Minimum Japanese Language Skill</div>
                <div className="value">{`N${this.state.view_min_lang_skill}`}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Minimum Experience Years</div>
                <div className="value">{this.getExpYear(this.state.view_min_exp_year)}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Area</div>
                <div className="value">{this.getValue(this.state.view_area)}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">City</div>
                <div className="value">{this.getValue(this.state.view_city)}</div>
                </div>
                <hr/>
                <div className="row">
                <div className="label col-2">Job Address</div>
                <div className="value">{this.state.view_job_address}</div>
                </div> 
                <hr/>
                <div className="row">
                <div className="label col-2">Job Description</div>
                <div className="value">{this.state.view_description}</div>
                </div> 
                <hr/>
                <div className="row">
                <div className="label col-2">Job Requirements</div>
                <div className="value">{this.state.view_requirement}</div>
                </div> 
                <hr/>
                <div className="row">
                <div className="label col-2">Other Qualifications (Better if you have)</div>
                <div className="value">{this.state.view_other_qualification}</div>
                </div> 
                <hr/>   
                <div className="row">
                <div className="label col-2">Other Message</div>
                <div className="value">{this.state.view_other_message}</div>
                </div> 
                

            </div>
            </div>
        </div>
        </div>
        </div>

<div className="job-listing-area pt-60 pb-120">
    <div className="container">
        <div className="row">
            
            <div className="col-xl-12 col-lg-12 col-md-8">
                <section className="featured-job-area">
                    <div className="container">
                    <div className="row">
                            <div className="col-lg-12">
                            <div className="wrapper center-block">
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
             <div className="panel panel-default">
                <div className="panel-heading active" role="tab" id="headingOne">
                <h4 className="panel-title">
                    <a role="button" onClick={this.toggleFilter} data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor : "#52c8fa"}}>
                    Filter Jobs  {this.state.area && ` - ${this.getValue(this.state.area)}`}{this.state.city && ` - ${this.getValue(this.state.city)}`}{this.state.employment_type && `- ${this.state.employment_type} Time`}{this.state.min_exp_year && ` - ${this.getExpYear(parseInt(this.state.min_exp_year))}`}{this.state.min_lang_skill && ` - N${this.state.min_lang_skill}`}{this.state.posted_within && ` - ${this.getPostedWithin(parseInt(this.state.posted_within))}`}{this.state.min_salary && ` - ¥ ${this.state.min_salary}`}
                        <i className={`fas fa-${
                                        this.state.isFilterOpen
                                          ? "chevron-up"
                                          : "chevron-down"
                                      }`} style={{float : "right"}}></i>
                    </a>
                </h4>
                </div>
    <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div>
            <div className = "container">
                <div>
                    <div className="row pt-30">
                        <div className=" filter-attribute">
    
                            <div className="small-section-tittle2">
                                <h4>Job Area</h4>
                            </div>
                            <div className="select-job-items2">
                                <select name="area" className="form-control" value={this.state.area} onChange={this.handleChange}>
                                    <option value="">Any</option>
                                    {areas && areas.map(area => 
                                        (<option value={area.id}>{`${area.data.name} - ${this.getJobCount(area.id)} jobs`}</option>)
                                    )}
                                </select>
                            </div>
                        </div>
                        
                        <div className=" filter-attribute">
                            {(this.state.showCities || this.state.areaName !== "") && (
                                <React.Fragment>
                                    <div className="small-section-tittle2 ">
                                        <h4>{this.state.area == "" ? 'Cities' : `Cities in ${this.state.areaName}`}</h4>
                                    </div>
                                    <div className="select-job-items2">
                                        <select name="city" className="form-control" value={this.state.city} onChange={this.handleChange}>
                                        <option value="">Any</option>
                                        {cities && cities.map(city => 
                                                (<option value={city.id}>{`${city.data.name} - ${this.getJobCount(city.id)} jobs`}</option>)
                                            )}
                                        </select>
                                    </div>
                                </React.Fragment>
                            )}
                            
                        </div>
                        <div className="filter-attribute">
                                <div className="small-section-tittle2">
                                    <h4>Employment Type</h4>
                                </div>
                                <div className="select-job-items2">
                                <select name="employment_type" className="form-control" value={this.state.employment_type} onChange={this.handleChange}>
                                    <option value="" >Any</option>
                                    <option value="Full">Full Time</option>
                                    <option value="Part">Part Time</option>
                                </select>
                                </div>
                            </div>
                        
                        <div className="filter-attribute">
                            <div className="select-Categories">
                                <div className="small-section-tittle2">
                                    <h4>Experience</h4>
                                </div>
                                <div className="select-job-items2">
                                <select name="min_exp_year" className="form-control" value={this.state.min_exp_year} onChange={this.handleChange}>
                                    <option value="" >Any</option>
                                    <option value="1">Less Than 1 Year</option>
                                    <option value="2">1-2 Years</option>
                                    <option value="3">2-3 Years</option>
                                    <option value="4">3-6 Years</option>
                                    <option value="5">6 Years and more</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className=" filter-attribute">
                            <div className="select-Categories">
                                <div className="small-section-tittle2">
                                    <h4>Max Japanese Skill</h4>
                                </div>
                                <select name="min_lang_skill" className="form-control" value={this.state.min_lang_skill} onChange={this.handleChange}>
                                    <option value="" >Any</option>
                                    <option value="3">N3</option>
                                    <option value="2">N2</option>
                                    <option value="1">N1</option>  
                                </select>
                            </div>
                        </div>
                        <div className="filter-attribute">
                            <div className="select-Categories">
                                <div className="small-section-tittle2">
                                    <h4>Posted Within</h4>
                                </div>
                                <select name="posted_within" className="form-control" value={this.state.posted_within} onChange={this.handleChange}>
                                    <option value="">All Time</option>
                                    <option value="1">Today</option>
                                    <option value="2">Last 3 Days</option> 
                                    <option value="3">Last 7 Days</option> 
                                    <option value="4">Last 30 Days</option>  
    
                                </select>
                            </div>
                        </div>
                        <div className=" filter-attribute">
                            <aside className="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow">
                                <div className="small-section-tittle2">
                                    <h4>Min Salary</h4>
                                </div>
                                <div className="widgets_inner">
                                    <div className="range_item">
                                        <div className="align-items-center">
                                            <div className="price_text">
                                            </div>
                                            <div className="justify-content-center">
                                                <input type="number" className="form-control" id="min_salary" name="min_salary" value={this.state.min_salary} onChange={this.handleChange} style={{width:150}}/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row pt-30 content-align-center">
                    <button type="button" className="btn-danger" onClick={this.resetFilter} aria-label="Cancel">Reset Filter</button>  
                    <button type="button" className="btn-primary" data-dismiss="modal" onClick={this.applyFilter}>Apply Filter</button>
                </div>
                    
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
                <div className="pt-50">
                <div className="count-job mb-35">
                    <div className="select-job-items">
                            <span>Show</span>
                            <select name="entryPerPage" style={{marginRight : 1+"em"}} onChange={this.handleChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <span>Jobs</span>
                        </div>
                    
                        <h5>{ this.state.regenerated_jobs.length > 0 && `${this.state.regenerated_jobs.length} - Jobs Found`}</h5>
                        
                        <div className="select-job-items">
                            <span>Sort by</span>
                            <select name="sortby" style={{marginRight : 1+"em"}} onChange={this.reGenerateJobs}>
                                <option value="new_to_old">Newest to Oldest</option>
                                <option value="old_to_new">Oldest to Newest</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {this.state.noFoundCondition && 
            
            <div>
                No data Available
            </div>
            }    
                </div>       
                <ul  style={{width : 100 + "%"}}>
                
                    {this.state.regenerated_jobs && this.state.regenerated_jobs.slice(this.state.firstIndex,this.state.lastIndex).map((job) => (
                        <Link href={`/job_detail?id=${job.id}`}>
                            <a>
                            <li id={job.id}>
                            <div className="single-job-items " style={{paddingBottom : 50+"px",paddingTop : 50+"px"}}>
                                <div className="job-items">
                                    <div className="company-img">
                                        <Link href={`/job_detail?id=${job.id}`}><a><img src="/assets/img/lg.png" alt="" className="img_job_list_border" /></a></Link>
                                    </div>
                                    <div className="job-tittle job-tittle2">
                                        <div className="row">
                                        <Link href={`/job_detail?id=${job.id}`}><a>
                                            <h4>{job.data.title}</h4>
                                        </a></Link>
                                        {this.checkDateEqual(job.data.posted_date) && <i className="newlyAddedJob">New</i>}
                                        </div>
                                        
                                        <ul>
                                            <li><i className="fas fa-building "></i>{this.getCompanyName(job.data.company)}</li>
                                            <li><i className="fas fa-map-marker-alt "></i>{this.getLocation(job.data.city,job.data.area)}</li>
                                            <li><i className="fas fa-language "></i>{`N${job.data.min_lang_skill == 1 ? job.data.min_lang_skill : `${job.data.min_lang_skill} and above`}`}</li>
                                        </ul>
                                        <ul>
                                            <li><i className="fas fa-calendar-alt "></i>{this.getDateString(job.data.posted_date)}</li>
                                            <li><i className="fas fa-yen-sign "></i>{`${job.data.min_salary} ~ ${job.data.max_salary}`}</li>
                                            <li style={{color : job.data.employment_type == "Full" ? "#52c8fa" : "#ff4357"}}><i className="fas fa-clock " ></i>{`${job.data.employment_type} time`}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="items-link items-link2 f-right ">
                                    <a data-toggle="modal" data-target="#quickView" onClick={()=>this.quickView(job.id)} style={{cursor : "pointer",color : "#52c8fa"}}>Quick View</a>
                                    <Link href={`/job_detail?id=${job.id}`}><a>View Details</a></Link>
                                </div>
                            </div>
                            </li>
                            </a>
                        </Link>
                        
                    ) )
                    }
                    </ul>
                        
                    </div>

                    <div className="pagination-area pb-115 text-center" style={{marginTop : 5+"em"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="single-wrap d-flex justify-content-center">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-start">
                                                {this.state.backWardBtn && <li onClick={this.goPrevious} className="page-item"><a className="page-link" style={{backgroundColor : "#52c8fa"}}><span className="ti-angle-left"></span></a></li>}
                                                {this.state.forWardBtn && this.state.regenerated_jobs.length > this.state.pages && this.state.entryPerPage < this.state.regenerated_jobs.length && <li onClick={this.goForward} className="page-item"><a className="page-link" style={{backgroundColor : "#52c8fa"}}><span className="ti-angle-right"></span></a></li>}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</LayoutWithFooter>
        )
    }
}
