import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import BarChart from './BarChart';
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import {reactLocalStorage} from 'reactjs-localstorage';


class Stats extends Component {

    constructor() {
        super();
        this.state = {
            resData:{}
        };

       // this.init();
    };
    getParticipationRate_pie(){
        var data={
            labels: ["Yet to Take Survey", "Participants"],
            datasets:[this.props.location.state.resData.no_of_submission- this.props.location.state.resData.answers.length,
                this.props.location.state.resData.answers.length
            ]
        };
        return (<PieChart data={data}/>)
    }

    getQuestionMetric_pie(val){
       // const value={val};
        var data={
            labels: Object.keys(val),
            datasets:Object.values(val)

        };
        return (<PieChart data={data}/>)
    }

    getParticipationRate_bar(){
        var data={
            labels: ["Yet to Take Survey", "Participants"],
            datasets:[this.props.location.state.resData.no_of_submission- this.props.location.state.resData.answers.length,
                this.props.location.state.resData.answers.length
            ],
            labelName:"Participation Rate",
            header_text:"Participation Rate"
        };
        return (<BarChart data={data}/>)
    }
    getQuestionMetric_bar(val){
        // const value={val};
        var data={
            labels: Object.keys(val),
            datasets:Object.values(val),
            labelName:"Question Metric Rate",
            header_text:"Question Metric Rate"

        };
        return (<BarChart data={data}/>)
    }

    // init(){
    //     this.setState({
    //         resData: this.props.location.state.resData
    //     });
    // }

    logOut(){
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        var buttons={
            width:"770px",
            // height:"500px",
            minHeight:"500px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%",
            marginLeft:"295px"
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
            float: 'left',
            textDecoration:'underline',
            fontSize:"17px"
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
        console.log("It will render admin dash board page:");

        const answerList= this.props.location.state.resData.answers;
        console.log("check this"+answerList[0].question.qtype);
        const optionList= answerList.map((option) => (option.question.qtype==='mcqS') ?<div>
            <text>{option.question.description}</text>
            {this.getQuestionMetric_pie(option.map)}
            {this.getQuestionMetric_bar(option.map)}
                <br/>
            </div>:<div>
            <text>{option.question.description}</text><br/><br/><br/>
            {/*<li>*/}
                {(Object.keys(option.map)+"")}
                <br/>
            {/*</li>*/}
            </div>

        );
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
                        <div className="col-md-6 col-md-offset-2 col-sm-6 col-sm-offset-2 col-xs-6" style={buttons}>
                            <form className="form">
                                <div className="form-group">
                                    <text style={style7}>Name:</text>
                                    <br/><br/>
                                    <textarea
                                    value={this.props.location.state.resData.sname}
                                    style={style2}
                                    disabled={true}
                                    />
                                    <br/><br/>
                                    <text style={style7}>Publish Date:</text>
                                    <br/><br/>
                                    <textarea
                                        value={this.props.location.state.resData.publish}
                                        style={style2}
                                        disabled={true}
                                    />
                                    <br/><br/><br/>
                                    <text style={style7}>End Date:</text>
                                    <br/><br/>
                                    <textarea
                                        value={this.props.location.state.resData.end}
                                        style={style2}
                                        disabled={true}
                                    />
                                    <br/><br/>
                                    <text style={style7}>No. Of Invitees:</text>
                                    <br/><br/>
                                    <textarea
                                        value={this.props.location.state.resData.no_of_submission}
                                        style={style2}
                                        disabled={true}
                                    />
                                    <br/><br/>
                                    <text style={style7}>No. Of Submissions:</text>
                                    <br/><br/>
                                    <textarea
                                        value={this.props.location.state.resData.answers.length}
                                        style={style2}
                                        disabled={true}
                                    />
                                    <br/><br/>
                                    <text style={style7}>Participation Rate:</text>
                                    <br/><br/>
                                    <textarea
                                        value={this.props.location.state.resData.participation_rate}
                                        style={style2}
                                        disabled={true}
                                    />
                                    <br/><br/>
                                    <text style={style7}>Participation Rate Graphically:</text>
                                    <br/><br/>
                                    {this.getParticipationRate_pie()}
                                    {this.getParticipationRate_bar()}
                                    <text style={style7}>Question Wise Metrics:</text><br/><br/><br/>
                                    {optionList}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        );
    }







}


export default withRouter(Stats);





