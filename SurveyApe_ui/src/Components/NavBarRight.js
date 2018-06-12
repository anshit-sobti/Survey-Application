import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class NavbarRight extends Component {

    constructor() {
        super();
        this.state = {

            qtype:'mcq',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            description:''
        };
        //this.init();
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

    };


    takeGeneralSurvey(surName){
        //alert("in take general survey");
        console.log("component check");

        API.getSurvey({"sname":surName})
            .then((data) => {
                console.log(data);

                this.setState({
                    questions: data,
                    formname: surName
                },() => { this.props.history.push(
                    {
                        pathname: "takegeneralsurvey/"+surName,
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

    takeOpenSurvey(surName){
        //alert("in take open survey");

        API.getSurvey({"sname":surName})
            .then((data) => {
                console.log(data);

                this.setState({
                    questions: data,
                    formname: surName
                },() => { this.props.history.push(
                    {
                        pathname: "takeopensurvey/"+surName,
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
        const surveys1= this.props.surveyList2;
        const val1= this.props.tag2;
        const optionList1= surveys1.map((option) => (val1==='General')? <div>
                <button className="btn btn-link" onClick={() => this.takeGeneralSurvey(option)}>{option}</button>
                <br/>
            </div>:<div>
                <button className="btn btn-link" onClick={() => this.takeOpenSurvey(option)}>{option}</button>
                <br/>
            </div>

        );
        return (
            <div style={style4}>
                {optionList1}

            </div>


        );

    }


}


export default withRouter(NavbarRight);