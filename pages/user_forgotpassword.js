import Link from "next/link"
export default class AdminSignin extends React.Component {
    constructor(props){
        super(props);
        this.initial_state = {
            email : 'Email',
            mailSent : false
        };
        this.state = this.initial_state;
    }
   
    handleChange = (event) => {
        this.setState  ({[event.target.name] : event.target.value })
    }
    handleSubmit = (event) => {
        $("#successModal").modal('show');
        event.preventDefault(); 
        (this.state.mailSent === false) && this.setState({mailSent : !this.state.mailSent})
    }
    clearInput = (event) => {
        this.setState(this.initial_state);
        let inputs, index;

        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = ''
        }
    }
    render (){
        const {mailSent} = this.state;
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
    <div className="modal fade" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Email Sent Successfully</h5>
        <button type="button" onClick={this.clearInput} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Check Your Email And Follow Link !
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.clearInput}>OK!</button>
      </div>
    </div>
  </div>
</div>
    <div className="section-top-border">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="text-center">
                          <h2 className="text-center">Forgot Password?</h2>
                          <p>You can reset your password here.</p>
                          <div className="panel-body">
                            <form>
            
                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                  <input type="email" id="email" name="email" onChange={this.handleChange} onClick={this.clearInput} placeholder={this.state.email} className="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <button name="recover-submit" onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block">Send Me password Reset Link</button>
                              </div>
                              
                              <input type="hidden" className="hide" name="token" id="token" value=""/> 
                            </form>
            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
    </main>
            </div>


        );
    }
}












