import Link from 'next/link';
import Head from 'next/head';

class LayoutAdmin extends React.Component{
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "/assets/js/admin_panel.js";
        script.async = true;
        document.body.appendChild(script);
    }
    render (){
        return (
            <html>
                <Head>
        <title>{this.props.title}</title>
        
        <link rel="stylesheet" href="/assets/css/admin_panel.css"></link>
                </Head>
                <body>
                

<main>
    
        <div className="d-flex" id="wrapper">

            <div className="border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">
                    <Link href="/">
                    <a><img src="assets/img/logo1resize.png" alt=""/></a>
                    </Link>
                </div>
                <div className="list-group list-group-flush">
                    <Link href="/admin"><a className="list-group-item list-group-item-action btn">
                        <li className="fa fa-tachometer-alt menuicon"></li>Dashboard</a></Link>
                    {/* <Link href="/job_new"><a className="list-group-item list-group-item-action btn">
                        <li className="fa fa-paper-plane menuicon"></li>Post new Job</a></Link> */}
                    <Link href="/employer_new"><a className="list-group-item list-group-item-action btn">
                        <li className="fa fa-building menuicon"></li>Add New Company</a></Link>
                    <Link href="/admin_profile"><a className="list-group-item list-group-item-action btn">
                        <li className="fa fa-user menuicon"></li>Profile</a></Link>
                    <Link href="/admin_signout"><a className="list-group-item list-group-item-action btn">
                        <li className="fa fa-power-off menuicon"></li>Logout</a></Link>
                </div>
            </div>
            <div id="page-content-wrapper">

                <nav className="navbar">
                    <img src="/assets/img/logo/menu.png" alt="Toggle_Menu" id="menu-toggle" className="menubar"/>
                    
                </nav>

                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>

        </div>
        </main>
                </body>
            </html>
            
        )
    }
        
}

export default LayoutAdmin;