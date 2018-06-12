import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import QuestionSave from './QuestionSave'
import QuestionPublish from "./QuestionPublish";
import NavBarPublish from "./NavBarPublish";
import NavBarRightPublish from "./NavBarRightPublish";
import {reactLocalStorage} from 'reactjs-localstorage';
import Stats from "./Stats"
import moment from 'moment';

class PublishSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
            ],
            formname:'',
            surveyList:[],
            surveyList2:[],
            addInvitees:'',
            newEndDate:'',
            resData:{},
            survey: {
                name: '',
                questions: [],
                type:'',
                users:'',
                publish: moment(),
                end:moment(),
                email:reactLocalStorage.getObject('var')
            },
            tag:''
        };
        this.init();
        this.addSur=this.addSur.bind(this);
        this.handleQueArr=this.handleQueArr.bind(this);
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

    getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state.survey;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
    }

    handleChange2(date, event) {
        event.preventDefault();
        this.setState({ survey: { ...this.state.survey, end: date} })
    }

    init() {
        console.log("component showsurvey check");

        // var mytext= this.getUrlParam('sname','Empty');
        //  $('.dropdown-menu').click(function(e) {
        //      e.stopPropagation();
        //      if ($(e.target).is('[data-toggle=modal]')) {
        //          $($(e.target).data('target')).modal()
        //      }
        //  });

        API.getSavedSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data,
                    formname: this.props.location.state.formname,
                    questions:this.props.location.state.questions,
                    tag:"Saved",
                 survey: { ...this.state.survey, name: this.props.location.state.formname}
                });
            });


        API.getGeneralSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList2: data,
                    tag2:"General"
                });
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
                    surveyList: data,
                    tag:"Published"
                });
            });
    }

    getSavedSurveys(){
        console.log("component check");

        API.getSavedSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data,
                    tag:"Saved"
                });
            });
    }



    addQue(){
        console.log('here');
        // var joined = this.state.formData.queArrShow.concat(<Question/>);
        // this.setState({ formData: { ...this.state.formData, queArrShow: joined} })
        this.setState(state=> state.survey.questions.push(<QuestionSave handleQueArr={this.handleQueArr}/>));
    }

    // let i=0;
    handleQueArr (e,index) {
        console.log('called' );
        // e.preventDefault();

        let stepsValidated = this.state.survey.questions.slice();
        stepsValidated[index] =e;

        this.setState({ survey: { ...this.state.survey, questions: stepsValidated} })
        //      this.setState({
        //          abc:stepsValidated
        //      })
    }

    addSur(){
        this.props.history.push("home");
    }

    getGeneralSurveys(){
        console.log("component check");

        API.getGeneralSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList2: data,
                    tag2:"General"
                });
            });
    }

    getOpenSurveys(){
        console.log("component check");

        API.getOpenSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList2: data,
                    tag2:"Open"
                });
            });
    }

    addSurvey = (val) => {
    const survey={
        "name": val.survey.name,
        "type": val.survey.type,
            "users":val.survey.users,
            "email":val.survey.email,
            "publish":val.survey.publish,
            "end":val.survey.end,
        "questions":val.questions.concat(val.survey.questions)
    };

        API.postSurvey1(survey)
            .then((res) => {
                console.log(res);
                alert('Survey created successfully!!');
                // window.location.reload();
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    };

    saveSurvey = (survey) => {
        const interSurvey={
            name: survey.survey.name,
            questions:survey.survey.questions,
            email:survey.survey.email
        };
        API.saveSurvey(interSurvey)
            .then((res) => {
                console.log(res);
                alert('Click on the survey again to view the changes!!');
                // window.location.reload();
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    };

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
            width:"550px"
        };
        var style3={
            float:"right",
            // margin:"20px",
            marginTop:"-20px",
            marginRight:"40px",
            backgroundColor:"white",
            //textColor:"#FF4500"
        };
        var style4={
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };
        var style5={
            float:"left"
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

        var style9={
            margin:"10px"
        };

        var style10={
            float:"right",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };

        var nav={
            float:"left",
            width:"180px",
            backgroundColor:"#e9e2f8",
            backgroundSize:"100%",
            minHeight:"600px"
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
                    <div className="dropdown" >
                        <button style={style3} className="btn dropdown-toggle" type="button" data-toggle="dropdown"><text style={style7}>SEND</text>
                            <span className="caret"></span></button>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                            {/*<div className="radio-group">*/}
                            <li><div className="radio">
                                <label>
                                    <input type="radio" name="radio" value='Open'  onChange={this.handleChange1.bind(this, 'type')} />
                                    Open
                                </label>
                            </div></li>
                            <li><div className="radio">
                                <label>
                                    <input type="radio"  name="radio" value='Closed'  onChange={this.handleChange1.bind(this, 'type')}/>
                                    Closed
                                </label>
                            </div></li>
                            <li><div className="radio">
                                <label>
                                    <input type="radio"  name="radio" value='General'  onChange={this.handleChange1.bind(this, 'type')} />
                                    General
                                </label>
                            </div></li>
                            <br/>
                            <li>
                                <text style={style5}> Enter semicolon separated email addresses:</text>
                                <br/>
                                <textarea
                                    onChange={this.handleChange1.bind(this, 'users')} value={this.state.survey.users}
                                    style={style2}
                                    placeholder="Recipients"
                                />
                            </li>
                            <li>
                                <text style={style5}> Please choose the publish date:</text>
                                <br/>
                                <br/>
                                {/*<DatePicker*/}
                                {/*selected={this.state.end}*/}
                                {/*onChange={this.handleChange2.bind(this, 'end')}*/}
                                {/*placeholderText={"mm/dd/yyyy"} />*/}

                                <input type="date"
                                       placeholder="Check-in"  onChange={this.handleChange1.bind(this, 'publish')}/>
                            </li>
                            <br/>
                            <li>
                                <text style={style5}> Please choose the end date:</text>
                                {/*<DatePicker*/}
                                {/*selected={this.state.end}*/}
                                {/*onChange={this.handleChange2.bind(this, 'end')}*/}
                                {/*placeholderText={"mm/dd/yyyy"} />*/}

                                <input type="date"
                                       placeholder="Check-in"  onChange={this.handleChange1.bind(this, 'end')}/>
                            </li>
                            <li>
                                <button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Publish</button>
                            </li>
                            {/*</div>*/}

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
                        <button style={navstyle3} className="btn" type="button" onClick={() => this.getPublishedSurveys()}><text style={navstyle7}>Published</text></button>
                        <button style={navstyle3} className="btn" type="button" onClick={() => this.getSavedSurveys()}><text style={navstyle7}>Saved</text></button>
                        <hr/>
                        <NavBarPublish surveyList={this.state.surveyList} tag={this.state.tag}/>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons}>
                        <form className="form">
                            <div className="form-group">
                                <textarea
                                    onChange={this.handleChange1.bind(this, 'name')} value={this.state.survey.name}
                                    style={style2}
                                    placeholder="Form Name"
                                    disabled={true}
                                />
                                <button className="btn btn-primary" style={style9} onClick={(e) => (e.preventDefault(), this.saveSurvey(this.state))}>Save</button>
                                <button className="btn btn-primary" onClick={(e) => (e.preventDefault(), this.addQue())}>+</button>
                                <br/>
                                <br/>
                                <hr/>
                                <hr/>
                                {/*<Question handleQueArr={this.handleQueArr}/>*/}
                                {/*<Question handleQueArr={this.handleQueArr}/>*/}
                                {/*/!*<Question handleQueArrfunc={this.handleQueArr}/>*!/*/}
                                {/*/!*<Question handleQueArrfunc={this.handleQueArr}/>*!/*/}
                                {/*/!*{this.state.formData.queArrShow.map((item, index) => <Question/>)}*!/*/}
                                <QuestionPublish questions={this.state.questions}/>
                                {this.state.survey.questions.map((item,index)  => <QuestionSave index={index} sname={this.state.survey.name} handleQueArr={this.handleQueArr} />)}
                            </div>
                        </form>
                    </div>
                    <div style={style10}>
                        <div style={nav}>
                            <text>Invited Surveys:</text><br/><br/>
                            <button style={navstyle3} className="btn" type="button" onClick={() => this.getGeneralSurveys()}><text style={navstyle7}>General</text></button>
                            <button style={navstyle3} className="btn" type="button" onClick={() => this.getOpenSurveys()}><text style={navstyle7}>Open</text></button>
                            <hr/>
                            <NavBarRightPublish surveyList2={this.state.surveyList2} tag2={this.state.tag2}/>
                        </div>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(PublishSurvey);