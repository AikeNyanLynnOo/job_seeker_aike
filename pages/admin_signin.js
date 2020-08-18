import Link from "next/link"
export default class AdminSignin extends React.Component {
    render (){
        return (
            <div>
<header>
        <div className="header-area header-transparrent">
            <div className="headder-top header-sticky">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                            <div className="logo">
                                <Link href="/"><a><img src="assets/img/logo1resize.png" alt=""/></a></Link>  
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
        <div className="section-top-border">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h3 className="mb-30">Welcome Admin !!! </h3>
                    <form action="#" style={{marginBottom : 3 + "em"}}>
                        <div className="input-group-icon mt-10">
                            <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                            <input type="email" name="email" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'" required className="single-input"/>
                        </div>
                        <div className="input-group-icon mt-10" style={{marginTop : 2 + "em"}}>
                            <div className="icon"><i className="fa fa-key" aria-hidden="true"></i></div>
                            <input type="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" required className="single-input"/>
                        </div>
                        <button className="btn" style={{width : 100 + "%",marginTop : 5 + "em"}}>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
            </div>


        );
    }
}