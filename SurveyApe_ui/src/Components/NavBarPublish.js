import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class NavbarPublish extends Component {

    constructor(props,context) {
        super(props, context);
        this.state = {

            qtype:'mcq',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            description:''
        };
        //this.addSur=this.addSur.bind(this);
        //this.init();
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

    };





    showSurvey(surName){
        console.log("component check");

        API.getSurvey({"sname":surName})
            .then((data) => {
                console.log(data);

                this.setState({
                    questions: data,
                    formname: surName
                },() => { this.props.history.push(
                    {
                        pathname: "/showsurvey/"+surName,
                        state: { questions: this.state.questions,
                            formname:this.state.formname}
                    });
                });

                // this.setState({
                //     questions: data,
                //     formname:surName
                // });
                // this.props.history.push("takesurvey");
            });
    }

    publishSurvey(surName){
        console.log("component check");

        API.getSavedSurvey({"name":surName})
            .then((data) => {
                console.log(data);

                this.setState({
                    questions: data,
                    formname: surName
                },() => { this.props.history.push(
                    {
                        pathname: surName,
                        state: { questions: this.state.questions,
                            formname:this.state.formname}
                    });
                });
                window.location.reload(1);
                // this.setState({
                //     questions: data,
                //     formname:surName
                // });
                // this.props.history.push("takesurvey");
            });
    }


    // init() {
    //     console.log("component check");
    //
    //     API.getSurveys({"email":"abc@gmail.com"})
    //         .then((data) => {
    //             console.log(data);
    //             this.setState({
    //                 surveyList: data
    //             });
    //         });
    // }

    render() {

        var style4={
            float:"left",
            width:"180px",
            backgroundColor:"#e9e2f8",
            backgroundSize:"100%",
            minHeight:"600px"
        };
        const surveys= this.props.surveyList;
        const val= this.props.tag;
        const optionList= surveys.map((option) => (val==='Published')? <div>
                <button className="btn btn-link" onClick={() => this.showSurvey(option)}>{option}</button>
                <br/>
            </div>:<div>
                <button className="btn btn-link" onClick={() => this.publishSurvey(option)}>{option}</button>
                <br/>
            </div>

        );
        return (
            <div style={style4}>
                {optionList}

            </div>


        );

    }


}


export default withRouter(NavbarPublish);