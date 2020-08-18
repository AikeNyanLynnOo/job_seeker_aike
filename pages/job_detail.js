import React from 'react'
import Link from 'next/link'
import {db, getCollectionRecords, AREA_COLLECTION, CITY_COLLECTION, EMPLOYER_COLLECTION, JOB_COLLECTION} from '../lib/db'
import LayoutWithFooter from '../components/LayoutWithFooter'

export default class JobDetail extends React.Component {
    
    static async getInitialProps ({req,res,query}){
        let job = {}

        let areas = await getCollectionRecords(AREA_COLLECTION)
        let cities = await getCollectionRecords(CITY_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)

        const querySnapshot = await db.collection('job').doc(query.id).get()
        job = querySnapshot.data()

        return {job,areas,cities,companies,jobs}
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
 
     getCompanyMail = (id) => {
        const companies = this.props.companies
        let email = ''
        companies.map(company=>{
            if(company.id == id){
                email = company.data.email
            }
        })
        return email
     }

     getCompanyAddress = (id) => {
        const companies = this.props.companies
        let address = ''
        companies.map(company=>{
            if(company.id == id){
                address = company.data.address
            }
        })
        return address
     }

     getCompanyPhone = (id) => {
        const companies = this.props.companies
        let phone = ''
        companies.map(company=>{
            if(company.id == id){
                phone = company.data.phone
            }
        })
        return phone
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
          console.log(obj)
          var t = new Date(1970, 0, 1);
          t.setSeconds(obj.seconds);
          console.log(t)
          console.log(t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()+' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds()+'-'+t.getTimezoneOffset())
          return t.getDate()+1+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
      }
      getExpYear = (key) => {
        switch (key){
            case 1 : return "Less Than 1 Year"
            case 2 : return "1-2 Years"
            case 3 : return "2-3 Years"
            case 4 : return "3-6 Years"
            case 5 : return "6 Years and more"
        }
      }

    render (){
        const job = this.props.job
        return (
            
        <LayoutWithFooter title = {job.title} count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
            
        <div className="job-post-company pt-120 pb-120">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-7 col-lg-8">
                        <div className="single-job-items mb-50">
                            <div className="job-items">
                                <div className="company-img company-img-details">
                                    <img src="/assets/img/icon/job-list1.png" alt=""/>
                                </div>
                                <div className="job-tittle">
                                    <h4>{job.title}</h4>
                                    <ul>
                                        <li><i className="fas fa-map-marker-alt"></i>{this.getLocation(job.city,job.area)}</li>
                                        <li><i className="fas fa-yen-sign"></i>{`${job.min_salary} ~ ${job.max_salary}`}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="job-post-details">
                            <div className="post-details1 mb-50">
                                <div className="small-section-tittle">
                                    <h4>Job Description</h4>
                                </div>
                                <p>{job.description}</p>
                            </div>
                            <div className="post-details2  mb-50">
                                <div className="small-section-tittle">
                                    <h4>Key Qualifications</h4>
                                </div>
                                <ul>
                                    <li>{`Minimum Japanese Skill - N${job.min_lang_skill}`}</li>
                                    <li>{`Work experience- ${this.getExpYear(job.min_exp_year)}`}</li>
                                    <li>{`Minimum Age - ${job.min_age}`}</li>
                                    <li>{job.requirement}</li>
                                </ul>
                            </div>
                            <div className="post-details2  mb-50">
                                <div className="small-section-tittle">
                                    <h4>Other Qualifications</h4>
                                </div>
                                <ul>
                                    <li>{job.other_qualification}</li>
                                </ul>
                            </div>
                            <div className="post-details2  mb-50">
                                <div className="small-section-tittle">
                                    <h4>Other Message</h4>
                                </div>
                                <ul>
                                    <li>{job.other_message}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <div className="post-details3  mb-50">
                            <div className="small-section-tittle">
                                <h4>Job Overview</h4>
                            </div>
                            <ul>
                                <li>Posted date : <span>{this.getDateString(job.posted_date)}</span></li>
                                <li>Vacancy : <span>{job.vacancy}</span></li>
                                <li>Job Type : <span>{job.employment_type}</span></li>
                                <li>Working Hour : <span>{job.work_hour}</span> </li>
                                <li>Working Days : <span>{job.work_day}</span> </li>
                                <li>Work Address Details: <span>	
                                    {job.job_address}</span>
                                </li>
                            </ul>
                            <div className="apply-btn2 ">
                                <button className="btn">Apply Now</button>
                            </div>
                        </div>
                        <div className="post-details4 mb-50 ">
                            <div className="small-section-tittle ">
                                <h4>Company Information</h4>
                            </div>
                            <span>{this.getCompanyName(job.company)}</span>
                            
                            <ul>
                                <li>Email: <span>{this.getCompanyMail(job.company)}</span></li>
                                <li>Phone: <span>{this.getCompanyPhone(job.company)}</span></li>
                                <li>Address: <span>{this.getCompanyAddress(job.company)}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </LayoutWithFooter>
        
        )
    }
}