import Link from 'next/link';
import Head from 'next/head';

class LayoutWithoutFooter extends React.Component{
    componentDidMount () {
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
                                
                                <div className="header-btn d-none f-right d-lg-block">
                                <Link href="/user_register">
                                <a className="btn head-btn1">Register</a>
                                </Link>
                                <Link href="/user_signin">
                                <a className="btn head-btn2">Sign In</a>
                                </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </header>
    <main>
{this.props.children}
    </main>
    
                </body>
            </html>
            
        )
    }
        
}

export default LayoutWithoutFooter;