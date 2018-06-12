import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';

import QuestionTake from "./QuestionTake";


class Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            formname:'',
            responses:[]}

        ;
        this.init();
        this.sendResponse = this.sendResponse.bind(this);
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


    init() {
        console.log("component check");

           var mytext= this.getUrlParam('sname','Empty');
           var secParam= this.getUrlParam('uname','Empty');
        //      alert(mytext);
        // alert(secParam);
           //alert(secParam);
           if(secParam ==='Empty'){
               API.getSurvey({"sname":mytext})
                   .then((data) => {
                       console.log(data);
                       this.setState({
                           questions: data,
                           formname:mytext
                       });
                   });
           }
           // else if(secParam !== 'arshiyasethi04@gmail.com'){
           //     alert("Sorry it's a closed survey!!");
           //     window.location='/home';
           // }
           else{
               API.getUniqueSurvey({"sname":mytext,"email":secParam})
                   .then((data) => {
                       console.log('check'+data.length);
                       if(data.length===0){
                           alert('Survey Expired!!');
                           window.location='/home';
                       }
                       else{
                           this.setState({
                               questions: data,
                               formname:mytext
                           });
                       }
                   });
           }



    }

    sendResponse (e,index) {
        console.log('response send called' );
        // e.preventDefault();

        // let stepsValidated = this.state.questions.slice();
        // stepsValidated[index] =e;
        //
        // this.setState({  responses: stepsValidated} )
        // //      this.setState({
        // //          abc:stepsValidated
        // //      })
        let stepsValidated = this.state.responses.slice();
        stepsValidated[index] =e;
            this.setState({  responses: stepsValidated })

    }

    submitSurvey = (survey) => {
        API.submitSurvey(survey)
            .then((res) => {
                console.log(res);
                alert(res.message);
                // window.location.reload();
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    };

    render() {
        var buttons={
            width:"770px",
            // height:"500px",
            minHeight:"500px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%"
        };

        var style={
            // marginTop: "180px",
            backgroundColor: "#8A2BE2",
            height: "200px",
            position:"center"
        };
        var style1={
            // marginTop: "180px",
            backgroundColor: "#E6E6FA",
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
            float:"right"
        };

        return (
            <div className="container-fluid">
                <div className="row" style={style}>
                    <button style={style3} className="btn btn-primary" onClick={() => this.submitSurvey(this.state.responses)}>Submit</button>
                </div>
                <div className="row" style={style1}>
                    <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6" style={buttons}>
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
                                <QuestionTake questions={this.state.questions} sname={this.state.formname} sendResponse={this.sendResponse}/>
                                {/*{this.state.questions.map((item,index)  => <QuestionTake index={index} sname={this.state.formname} sendResponse={this.sendResponse} questions={this.state.questions}/>)}*/}
                                {/*{this.state.survey.questions.map((item,index)  => <QuestionShow arr={this.state.questions} />)}*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(Survey);