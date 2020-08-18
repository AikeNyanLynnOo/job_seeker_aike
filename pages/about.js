import React from 'react';
import Link from 'next/link'
import LayoutWithFooter from '../components/LayoutWithFooter';
import {getCollectionRecords,AREA_COLLECTION,EMPLOYER_COLLECTION,JOB_COLLECTION} from '../lib/db'

export default class About extends React.Component {
    
    static async getInitialProps(){
        let areas = await getCollectionRecords(AREA_COLLECTION)
        let companies = await getCollectionRecords(EMPLOYER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        return {areas,companies,jobs}
    }
    render (){
        return (
            
        <LayoutWithFooter title = "About us" count={{empCount : this.props.companies.length, jobCount : this.props.jobs.length}}>
         
        <div class="apply-process-area apply-bg pt-150 pb-150" data-background="assets/img/gallery/how-applybg.png">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle white-text text-center">
                            <span>Apply process</span>
                            <h2> How it works</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-search"></span>
                            </div>
                            <div class="process-cap">
                                <h5>1. Search a job</h5>
                                <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-curriculum-vitae"></span>
                            </div>
                            <div class="process-cap">
                                <h5>2. Apply for job</h5>
                                <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="process-cap">
                                <h5>3. Get your job</h5>
                                <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
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












