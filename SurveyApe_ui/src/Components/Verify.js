import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../pic.jpg';
import * as API from '../api/API';
//import logo from '../logo.png';
import {reactLocalStorage} from 'reactjs-localstorage';
import   ReactCodeInput from 'react-code-input';



class Verify extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                code:''
            },
        };
    };



    handleChange1 (propertyName, event) {
        const formData = this.state.formData;
        formData[propertyName] = event;
        this.setState({ formData: formData });
    }


    handleSubmit1 = (formdata) => {
        const val={
            email: this.props.location.state.tag,
            verified: formdata.formData.code
        };
        API.verify(val)
            .then((res) => {
                console.log(res);
                if(res.message=== 'true'){
                    reactLocalStorage.setObject('var', this.props.location.state.tag );
                    this.props.history.push("/home");
                    window.location.reload(1);
                }
                else{
                    alert("Incorrect verification code");
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
                    Please Verify using the code sent!
                    <hr/>
                    <form>
                        <ReactCodeInput type='text' fields={4} onChange={this.handleChange1.bind(this, 'code')} value={this.state.formData.code}  /><br/><br/>
                        <button type="submit" className="btn btn-warning"  onClick={(e) => (e.preventDefault(), this.handleSubmit1(this.state))}>Verify</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default withRouter(Verify);