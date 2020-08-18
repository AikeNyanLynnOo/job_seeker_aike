import Link from 'next/link';
import Head from 'next/head';
import {getCollectionRecords,JOB_COLLECTION,EMPLOYER_COLLECTION} from "../lib/db";
class LayoutWithFooter extends React.Component {

    state = {
        isAuthenticated : true
    }
    componentDidMount () {
        document.getElementById("dateOutput").innerHTML=new Date().getFullYear();
        const script = document.createElement("script");
        script.src = "/assets/js/main.js";
        script.async = true;
    
        document.body.appendChild(script);
    }
    render (){
        return (
<html>
                <Head>
                    <title>{this.props.title}</title>
                </Head>
            <body>
            <header>
    
    <div className="header-area header-transparrent">
        <div className="headder-top header-sticky">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-md-2">
                        
                        <div className="logo">
                            <Link href="/">
                            <a><img src="/images/logo1resize.png" alt=""/></a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <div className="menu-wrapper">
                            
                            <div className="main-menu">
                                <nav className="d-none d-lg-block">
                                    <ul id="navigation">
                                        <li><Link href="/"><a>Home</a></Link></li>
                                        <li><Link href="/job_listing"><a>Find Jobs </a></Link></li>
                                        <li><Link href="/about"><a>About</a></Link></li>

                                        <li><Link href="/contact"><a>Contact</a></Link></li>
                                        
                                    </ul>
                                </nav>
                            </div>
                            
                            <div className="header-btn d-lg-block" style={{marginRight : 3 + "em"}}>
                                {this.state.isAuthenticated ?  (
                                <React.Fragment>
                                    <Link href="/user_register">
                                    <a className="btn head-btn1">Register</a>
                                    </Link>
                                    <Link href="/user_signin">
                                    <a className="btn head-btn2" >Sign In</a>
                                    </Link>
                                </React.Fragment>
                                ) : (
                                <React.Fragment>
                                    <ul>
                                        <li>
                                            <img src="/assets/img/profile_default.png" id="navbarDropdown" className="small_profile dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                            </div>

                                        </li>
                                    </ul>
                                </React.Fragment>    
                                )}
                                
                                
                                
                                
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none" ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</header>
<main>
{this.props.children}
</main>
<footer>
    
    <div className="footer-area footer-bg footer-padding">
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-footer-caption mb-50">
                        <div className="single-footer-caption mb-30">
                            <div className="footer-tittle">
                                <h4>About Us</h4>
                                <div className="footer-pera">
                                    <p>Heaven frucvitful doesn't cover lesser dvsays appear creeping seasons so behold.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                    <div className="single-footer-caption mb-50">
                        <div className="footer-tittle">
                            <h4>Contact Info</h4>
                            <ul>
                                <li>
                                    <p>Address :Your address goes here, your demo address.</p>
                                </li>
                                <li>
                                    <Link href="#">
                                    <a>Phone : +8880 44338899</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                    <a>Email : nursingjobfinderhaj@gmail.com</a>
                                    </Link>
                                    
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                    <div className="single-footer-caption mb-50">
                        <div className="footer-tittle">
                            <h4>Contact us on</h4>
                            <ul>
                                <li>
                                    <Link href="#">
                                    <a>
                                        <li className="fab fa-facebook">
                                        </li>
                                        <span style={{marginLeft : 10}}>facebook</span>
                                    </a>
                                    </Link>
                                    
                                </li>
                                <li>
                                <Link href="#">
                                <a>
                                        <li className="fab fa-twitter"></li>
                                        <span style={{marginLeft : 10}}>twitter</span>
                                    </a>
                                </Link>
                                    
                                </li>
                                <li>
                                <Link href="#">
                                <a>
                                        <li className="fab fa-instagram"></li>
                                        <span style={{marginLeft : 10}}>instagram</span>
                                    </a>
                                </Link>
                                    
                                </li>
                                <li>
                                <Link href="#">
                                <a>
                                        <li className="fab fa-linkedin"></li>
                                        <span style={{marginLeft : 10}}>linkedin</span>
                                    </a>
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row footer-wejed justify-content-between">
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    
                    <div className="footer-logo mb-20">
                    <Link href="/"> 
                    <a><img src="/images/logo1resize.png" alt=""/></a>
                    </Link>
                        
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                    <div className="footer-tittle-bottom">
                        <span>{this.props.count.jobCount}</span>
                        <p>Active Jobs</p>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                    <div className="footer-tittle-bottom">
                        <span>{this.props.count.empCount}</span>
                        <p>Companies</p>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                    <div className="footer-tittle-bottom">
                        <span>568</span>
                        <p>Registered Job Seeker</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div className="footer-bottom-area footer-bg">
        <div className="container">
            <div className="footer-border">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-xl-12 col-lg-10 ">
                        <div className="footer-copy-right">
                            <p>
                                <span id="dateOutput">
                                
                                </span> Nursing Job Finder
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</footer>
            </body>
        </html>
        )
    }
}

export default LayoutWithFooter;