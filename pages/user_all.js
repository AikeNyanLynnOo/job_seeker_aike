import React from 'react';
import Link from 'next/link'
import {db, getCollectionRecords} from '../lib/db'
import LayoutAdmin from '../components/LayoutAdmin';

export default class UserAll extends React.Component {
    
    static async getInitialProps ({ req, res, query }){ 
    
        let users = await getCollectionRecords(USER_COLLECTION)
        
        return {
          users
        }
    }
    render (){
        const users = this.props.users;
        return (
        <LayoutAdmin title="All Registered Users">
<table id="example" className="display" style={{width : 100 + "%"}}>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Language Skill</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user) => {
                                return (
                                <tr id={user.id}>
                                <td><img src="./assets/img/profile_default.png" alt="" className="small_profile"/></td>
                                <td>{`${user.data.first_name} ${user.data.last_name}`}</td>
                                <td>{user.data.email}</td>
                                <td>{user.data.lang_skill}</td>
                                <td>{user.data.phone}</td>
                                <td>{user.data.address}</td>
                                <td className="btn_center">
                                    <Link href="/user_profile_view">
                                    <a className="edit_btn"><i className="fa fa-user table_btn"></i>Profile</a>
                                    </Link>
                                    
                                </td>
                            </tr>
                                )
                            })}
                            

                        </tbody>
                    </table>
        </LayoutAdmin>
        
        
        )
    }
}




