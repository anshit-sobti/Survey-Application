import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../pic.jpg';
import * as API from '../api/API';
//import logo from '../logo.png';
import {reactLocalStorage} from 'reactjs-localstorage';
import   ReactCodeInput from 'react-code-input';



class Register extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                Fname: '',
                Lname: '',
                email: '',
                password: '',
                code:'',

            },
            emailError: ""
        };
    };

    validate = () => {
        let isError = false;
        const errors = {
            emailError: ""
        };if (this.state.formData.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    handleChange (propertyName, event) {
        const formData = this.state.formData;
        formData[propertyName] = event.target.value;
        this.setState({ formData: formData });
    }

    handleChange1 (propertyName, event) {
        const formData = this.state.formData;
        formData[propertyName] = event;
        this.setState({ formData: formData });
    }

    handleSubmit = (formdata) => {
        const err = this.validate();
        if (err) {
            alert("Please enter a valid email");
            this.props.history.push("/register");
            window.location.reload(1);
        }
        else if(formdata.formData.Fname === '' || formdata.formData.email === '' || formdata.formData.password === '' ) {
            alert("Please enter the details");
            this.props.history.push("/register");
            window.location.reload(1);
        }
        else{
            API.register(formdata)

                .then((res) => {
                    console.log(res);

                    if(res.message=== 'User already exists!! Please login.'){
                        alert(res.message);
                        this.props.history.push("/");
                    }
                    //alert(res.message);
                   // this.props.history.push("/verify");
                });}
        // setTimeout(function(){
        //     window.location.reload(1);
        // }, 500)
    };

    handleSubmit1 = (formdata) => {
        const val={
            email: formdata.formData.email,
            verified: formdata.formData.code
        };
            API.verify(val)
                .then((res) => {
                    console.log(res);
                    if(res.message=== 'true'){
                        reactLocalStorage.setObject('var', formdata.formData.email );
                        this.props.history.push("/home");
                        window.location.reload(1);
                    }
                    else{
                        alert("Incorrect verification code!!");
                        this.props.history.push("/");
                        window.location.reload(1);
                    }

                });};




    render() {


        var pos={
            marginTop: "120px"
        };

        return (
            <div className="row justify-content-md-center" style={pos}>
                <div className="col">
                </div>
                <div className="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-3 col-xs-6">
                    <img src={img} className="img-responsive" alt="logo"/>
                </div>
                <div className="col-md-4 col-md-offset-0 col-sm-5 col-sm-offset-0 col-xs-6">
                    Create an account
                    <hr/>
                    <form>
                        <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange.bind(this, 'Fname')} value={this.state.formData.Fname}/><br/>
                        <input type="text" className="form-control" placeholder="Surname" onChange={this.handleChange.bind(this, 'Lname')} value={this.state.formData.Lname}/><br/>
                        <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.formData.email} /><br/>
                        <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} value={this.state.formData.password} /><br/><br/>
                        <button type="submit" className="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Create an account</button>
                        {/*{this.state.emailError}*/}
                        <div className="modal fade" id="myModal" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Please enter the verification code</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form action="" className="form-group">
                                            <ReactCodeInput type='text' fields={4} onChange={this.handleChange1.bind(this, 'code')} value={this.state.formData.code}  />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-warning"  onClick={(e) => (e.preventDefault(), this.handleSubmit1(this.state))}>Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default withRouter(Register);