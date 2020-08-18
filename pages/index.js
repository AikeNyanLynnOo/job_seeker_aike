import React from 'react';
import Link from 'next/link';
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class Index extends React.Component {
    constructor (props){
        super(props)
        this.initialState = {
            job_type : '',
            job_location : '',
            areas : this.props.areas || []
        }
        this.state = this.initialState
    }
    static async getInitialProps(){
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        return {areas,companies,jobs}
    }
    handleChange = (event) => {
        console.log(event.target);
        this.setState({[event.target.name] : event.target.value});
    }
    handleSearch = () => {
        console.log(this.state.job_type);
        console.log(this.state.job_location);
    }
    render (){
        const areas = this.state.areas
        console.log(areas)
        return (
            
        <LayoutWithFooter title="Home" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
<div className="slider-area ">
            
            <div className="slider-active">
                <div className="single-slider slider-height d-flex align-items-center" data-background="/assets/img/mainbg.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-9 col-md-10">
                                <div className="hero__caption">
                                    <h1>Find nursing jobs here !</h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-xl-8">
                                
                                <form action="#" className="search-box" style={{marginBottom : 100}}>
                                    <div className="row" style={{width : 80 + "%"}}>
                                        <select name="job_type" id="job_type" onChange={this.handleChange} className="form-control select-itms" style={{width : 40 + "%",height : 4.5 + "em", marginRight : 2.5+"em", marginLeft : 1+ "em"}}>
                                                <option value="">Any Job Type</option>
                                                <option value="Full">Full Time</option>
                                                <option value="Part">Part Time</option>
                                        </select>
                                        <select name="job_location" id="job_location" onChange={this.handleChange} className="form-control select-itms" style={{width : 40 + "%",height : 4.5 + "em" ,  marginLeft : 1+ "em"}}>
                                                <option value="">All Location</option>
                                                {areas && areas.map(area => 
                                                    (<option value={area.id}>{area.data.name}</option>)
                                                )}
                                                
                                        </select>
                                    </div>
                                        
                                    <div className="search-form">
                                        <Link href="" >
                                        <Link href={`/job_listing?type=${this.state.job_type}&location=${this.state.job_location}`}><a>Find job</a></Link>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </LayoutWithFooter>
        
        )
    }
}