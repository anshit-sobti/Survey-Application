import React, {Component} from 'react';
import {Route,withRouter,Link} from 'react-router-dom';
import * as API from '../api/API';
import  '../App.css';
import Register from "./Register"
import Home from "./Home"
import Survey from "./Survey"
import ShowSurvey from "./ShowSurvey"
import TakeSurvey from "./TakeSurvey"
import TakeGeneralSurvey from "./TakeGeneralSurvey"
import TakeOpenSurvey from "./TakeOpenSurvey"
import PublishSurvey from "./PublishSurvey"
import {reactLocalStorage} from 'reactjs-localstorage';
import Verify from "./Verify"
import Stats from "./Stats"


// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);


class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            tag:'',
            userData: {
                email: '',
                password: '',
                code1:'',
                code2:'',
                code3:'',
                code4:''
            },

        };
        this.init();

    };


    init(){
        //alert("Welcome page");
        // const check= JSON.stringify(reactLocalStorage.getObject('var'));
        // if(check !== JSON.stringify({})){
        //      window.location="/home";
        //     // window.location.reload(1);
        //     //this.props.history.push("/home");
        // }
    }

    handleChange (propertyName, event) {
        const userData = this.state.userData;
        userData[propertyName] = event.target.value;
        this.setState({ userData: userData });
    }

    handleSubmit = (userdata) => {
        if(userdata.userData.email === '' || userdata.userData.password === '') {
            alert('Please enter the details');
        }
        else{
            API.login(userdata)
                .then((res) => {
                    console.log(res);
                    if(res.message ==='Verify first!!'){
                        alert(res.message);
                        this.props.history.push({
                            pathname: '/verify',
                            state: { tag: userdata.userData.email }
                        });
                    }
                    else if (res.message === 'logged in'){
                        reactLocalStorage.setObject('var',  userdata.userData.email);

                        this.setState(
                            {
                                tag : res.email
                            });
                        this.props.history.push("home");
                    }
                    else alert(res.message);
                });
            setTimeout(function(){
                window.location.reload(1);
            }, 500)
        }
    };




    render() {

        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div className="background">
                        <div className="row">
                            {/*<button type="submit" style={style1} id="verify" className="btn btn-warning" data-toggle="modal" data-target="#myModal1" onClick={(e) => (e.preventDefault())}></button>*/}
                            <div className="text-center">
                                <button className="background-btn" id="menu1" type="button" data-toggle="modal" data-target="#myModal">
                                Go to Google Forms
                                </button>
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Sign in using an existing account</h4>
                                            </div>
                                            <div className="modal-body">
                                                <form action="" className="form-group">
                                                    <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.userData.email}/><br/>
                                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.userData.password}/><br/>
                                                    <button className="btn btn-primary" type="submit" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Sign In</button>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <Link onClick={this.forceUpdate} to="/register">Or create an account</Link><br/><br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}/>
                <Route exact path="/register" render={() => (
                    <div>
                        <Register/>
                    </div>
                )}/>
                <Route exact path="/home" render={() => (
                    <div>
                        <Home/>
                    </div>
                )}/>
                <Route exact path="/takesurvey" render={() => (
                    <div>
                        <Survey/>
                    </div>
                )}/>
                <Route exact path="/showsurvey/:formname" render={() => (
                    <div>
                        <ShowSurvey/>
                    </div>
                )}/>
                <Route exact path="/publishsurvey/:formname" render={() => (
                    <div>
                        <PublishSurvey/>
                    </div>
                )}/>
                <Route exact path="/takegeneralsurvey/:formname" render={() => (
                    <div>
                        <TakeGeneralSurvey/>
                    </div>
                )}/>
                <Route exact path="/takeopensurvey/:formname" render={() => (
                    <div>
                        <TakeOpenSurvey/>
                    </div>
                )}/>
                <Route exact path="/showsurvey/:formname/stats" render={() => (
                    <div>
                        <Stats/>
                    </div>
                )}/>
                <Route exact path="/takesurvey/:formname" render={() => (
                    <div>
                        <TakeSurvey/>
                    </div>
                )}/>
                <Route exact path="/verify" render={() => (
                    <div>
                        <Verify/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(Welcome);