import React from 'react';
import Link from 'next/link'
import {JOB_COLLECTION,USER_COLLECTION,EMPLOYER_COLLECTION,getCollectionRecords} from '../lib/db'
import LayoutAdmin from '../components/LayoutAdmin';


export default class Admin extends React.Component {
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);
    }

    static async getInitialProps ({ req, res, query }){ 

        let users = await getCollectionRecords(USER_COLLECTION)
        let jobs = await getCollectionRecords(JOB_COLLECTION)
        let employers = await getCollectionRecords(EMPLOYER_COLLECTION)
        
        return {
          users,
          jobs,
          employers
        }
    }

     
    render (){
        const {users,jobs,employers} = this.props;
        return (
                <LayoutAdmin title="Admin Panel">
                   <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card-counter primary">
                                    <i class="fa fa-briefcase"></i>
                                    <span class="count-numbers">{jobs.length}</span>
                                    <span class="count-name">Posted Jobs</span>
                                </div>
                                <Link href="/job_all">
                                <a class="view_btn btn">View</a>
                                </Link>
                                
                            </div>

                            <div class="col-md-3">
                                <div class="card-counter danger">
                                    <i class="fa fa-users"></i>
                                    <span class="count-numbers">{users.length}</span>
                                    <span class="count-name">Registered Users</span>
                                </div>
                                <Link href="/user_all">
                                <a class="view_btn btn">View</a>
                                </Link>
                            </div>

                            <div class="col-md-3">
                                <div class="card-counter success">
                                    <i class="fa fa-building"></i>
                                    <span class="count-numbers">{employers.length}</span>
                                    <span class="count-name">Companies</span>
                                </div>
                                <Link href="/employer_all">
                                <a class="view_btn btn">View</a>
                                </Link>
                            </div>

                            <div class="col-md-3">
                                <div class="card-counter info">
                                    <i class="fa fa-clock"></i>
                                    <span class="count-numbers">0</span>
                                    <span class="count-name">Pending Applications</span>
                                </div>
                                <Link href="/application_pending">
                                <a class="view_btn btn">View</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </LayoutAdmin>
        )
    }
}




