import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import QuestionShow from "./QuestionShow";
import NavBarShow from "./NavBarShow";
import {reactLocalStorage} from 'reactjs-localstorage';

class TakeSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
            ],
            formname:'',
            surveyList:[],
            surveyList2:[],
            addInvitees:'',
            newEndDate:''
        };
        this.init();
        this.addSur=this.addSur.bind(this);
    };

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    getUrlParam(parameter, defaultvalue){
        var urlparameter = defaultvalue;
        if(window.location.href.indexOf(parameter) > -1){
            urlparameter = this.getUrlVars()[parameter];
        }
        return urlparameter;
    }

    delete= (formName) =>{
        console.log(formName);
        API.del({formname:formName})
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };
    stats= (formName) =>{
        console.log(formName);
        API.stats({formname:formName})
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    editDate= (val) =>{
        console.log(val);
        const value={
                end:val.newEndDate,
                name:val.formname
            }
        ;
        API.edit(value)
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    send= (val) =>{
        console.log(val);
        const value={
                users:val.addInvitees,
                name:val.formname
            }
        ;
        API.addInvitees(value)
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    init() {
        console.log("component showsurvey check");

        // var mytext= this.getUrlParam('sname','Empty');
        //  $('.dropdown-menu').click(function(e) {
        //      e.stopPropagation();
        //      if ($(e.target).is('[data-toggle=modal]')) {
        //          $($(e.target).data('target')).modal()
        //      }
        //  });

        API.getSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data,
                    formname: this.props.location.state.formname,
                    questions:this.props.location.state.questions
                });
            });


        API.getGeneralSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                // this.setState({
                //     surveyList2: data
                // });
            });


    }


    logOut(){
        localStorage.clear();
        this.props.history.push("/");
    }

    getPublishedSurveys(){
        console.log("component check");

        API.getSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data
                });
            });
    }

    getSavedSurveys(){
        console.log("component check");

        API.getSavedSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data
                });
            });
    }

    getGeneralSurveys(){
        console.log("component check");

        API.getGeneralSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList2: data
                });
            });
    }

    getOpenSurveys(){
        console.log("component check");

        API.getOpenSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList2: data
                });
            });
    }

    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
    }

    addSur(e){

        //e.preventDefault();
        console.log("I am working");
        window.location='/home';
    }

    render() {
        var buttons={
            width:"770px",
            // height:"500px",
            minHeight:"500px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%"
        };

        var buttons1={
            width:"770px",
            // height:"500px",
            minHeight:"60px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%",
            marginTop:"97px",
            marginLeft:"297px"
        };

        var style={
            // marginTop: "180px",
            backgroundColor: "#8A2BE2",
            height: "200px",
            position:"center"
        };
        var style1={
            // marginTop: "180px",
            backgroundColor: "#e4dbf6",
            //height: "600px",
            minHeight:"600px",
            backgroundSize: "100%"
        };
        var style2={
            border:"none",
            float:"left",
            width:"650px"
        };
        var style3={
            margin:"4px",
            //size:"180px"
            color: "#8A2BE2"
        };
        var style4={
            width:"530px"
        };
        var style5={
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };

        var style6={
            float:'right',
            margin:"20px",
            backgroundColor:"#FF4500",
            textColor:"#D8BFD8"
        };

        var style7={
            color: "#8A2BE2"
        };

        var style8={
            color: "#FFF"
        };

        var navstyle3={
            //float:"right",
            // margin:"20px",
            //marginTop:"-20px",
            //marginRight:"40px",
            backgroundColor:"white",
            width:"90px",
            active:true
            //textColor:"#FF4500"
        };
        var navstyle7={
            color: "#8A2BE2"
        };

        var nav={
            float:"left",
            width:"180px",
            backgroundColor:"#e9e2f8",
            backgroundSize:"100%",
            minHeight:"600px"
        };

        var style10={
            float:"right",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };

        return (
            <div className="container-fluid">
                <div className="row" style={style}>
                    {/*<button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Send</button>*/}
                    <div className="dropdown">
                        <button style={style6} className="btn btn-circle dropdown-toggle" id="menu1" type="button"  data-toggle="dropdown"><text style={style8}>{reactLocalStorage.getObject('var').charAt(0).toUpperCase()}</text>
                        </button>
                        <br/>
                        <br/>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                            {/*<img src ={dropbox} className="img-responsive" alt="profile"/>*/}
                            {reactLocalStorage.getObject('var')}
                            <br/>
                            <li role="presentation" class="divider"></li>
                            <button type="button" className="btn btn-light" onClick={() => this.logOut()}>Sign out</button>
                        </ul>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons1}>
                        SurveyApe
                    </div>
                </div>
                <div className="row" style={style1}>
                    <div style={nav}>
                        <button className="btn btn-default btn-circle" onClick={this.addSur}>+</button>
                        <text>My Created Surveys:</text><br/><br/>
                        <button style={navstyle3} className="btn" type="button" onClick={() => this.getPublishedSurveys}><text style={navstyle7}>Published</text></button>
                        <button style={navstyle3} className="btn" type="button" onClick={() => this.getSavedSurveys}><text style={navstyle7}>Saved</text></button>
                        <hr/>
                        <NavBarShow surveyList={this.state.surveyList}/>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons}>
                        <form className="form">
                            <div className="form-group">
                                <textarea
                                    value={this.state.formname}
                                    style={style2}
                                    disabled={true}
                                />
                                <br/>
                                <br/>
                                <hr/>
                                <hr/>
                                <QuestionShow questions={this.state.questions}/>
                                {/*{this.state.survey.questions.map((item,index)  => <QuestionShow arr={this.state.questions} />)}*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(TakeSurvey);