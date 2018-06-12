import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

class Question extends Component {

    constructor() {
        super();
        this.state = {

            qtype:'mcqS',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            description:''
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

    };



handleChange = (propertyName, event) => {
        event.preventDefault();
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
        // this.props.onFillingQue({});
        // this.props.onFillingQue({});
    //this.props.ref(this.state);
   // this.props.();
    //
    const val2={
        sname: this.props.sname,
      qtype:this.state.qtype,
      options: this.state.opt1 + ';' + this.state.opt2 + ';' + this.state.opt3 + ';' + this.state.opt4,
      description: this.state.description
    };

console.log(this.props.index);
    this.props.handleQueArr(val2,this.props.index);

    }

    ;


    submitHandler() {
        //evt.preventDefault();
        // pass the input field value to the event handler passed
        // as a prop by the parent (App)
        //this.props.check(this.state);
        this.props.handleQueArr(this.state);

        this.setState({
            qtype:'',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            description:''
        });
    }



    render() {

        var style2={
            border:"none",
            float:"left",
            width:"650px"
        };
        var style3={
            border:"none",
            float:"left",
            width:"500px"
        };
        var style4={
            float:"right"
        };
        var style5={
            width:"200px",
            float:"left"
        };
        var fileStyle1={
            float:'left',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        const options= this.state.qtype;
        console.log(options);
        const optionList= ((options ==='text') ?
                <div>
                <textarea
                    style={style2}
                    placeholder="Enter Text"
                    disabled={true}
                />
                    <br/>
                    <br/>
                    <hr/>
                </div> :
                (options === 'star')?
                    <div>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                    </div>:(options === 'mcqM')?
                    <div>
                        <button style={style5} className="btn">
                            <input disabled={true} type="checkbox"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt1')} value={this.state.opt1}
                            style={style5}
                            placeholder="Option 1"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="checkbox"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt2')} value={this.state.opt2}
                            style={style5}
                            placeholder="Option 2"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="checkbox"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt3')} value={this.state.opt3}
                            style={style5}
                            placeholder="Option 3"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="checkbox"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt4')} value={this.state.opt4}
                            style={style5}
                            placeholder="Option 4"
                        />
                    </div>:(options === 'mcqIS')?
                        <div>
                            <button style={style5} className="btn">
                                <input disabled={true} type="radio"></input>
                            </button>
                            <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                            </div>
                            <br/>
                            <br/>
                            <button style={style5} className="btn">
                                <input  disabled={true} type="radio"></input>
                            </button>
                            <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                            </div>
                            <br/>
                            <br/>
                            <button style={style5} className="btn">
                                <input disabled={true} type="radio"></input>
                            </button>
                            <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                            </div>
                            <br/>
                            <br/>
                            <button style={style5} className="btn">
                                <input disabled={true} type="radio"></input>
                            </button>
                            <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                            </div>
                        </div>
                        :(options === 'mcqIM')?
                            <div>
                                <button style={style5} className="btn">
                                    <input disabled={true} type="checkbox"></input>
                                </button>
                                <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                                </div>
                                <br/>
                                <br/>
                                <button style={style5} className="btn">
                                    <input disabled={true} type="checkbox"></input>
                                </button>
                                <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                                </div>
                                <br/>
                                <br/>
                                <button style={style5} className="btn">
                                    <input disabled={true} type="checkbox"></input>
                                </button>
                                <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                                </div>
                                <br/>
                                <br/>
                                <button style={style5} className="btn">
                                    <input disabled={true} type="checkbox"></input>
                                </button>
                                <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <span className="btn btn-primary btn-file file-upload"><span>Upload Image</span><input type="file" name="mypic"/></span>
                                </div>
                            </div>:
                            (options === 'drop')?
                                <div>
                                    <text style={style5}>1.</text><input
                                        onChange={this.handleChange.bind(this, 'opt1')} value={this.state.opt1}
                                        style={style5}
                                        placeholder="Option 1"
                                    /><br/><br/>
                                    <text style={style5}>2.</text><input
                                        onChange={this.handleChange.bind(this, 'opt2')} value={this.state.opt2}
                                        style={style5}
                                        placeholder="Option 2"
                                    /><br/><br/>
                                    <text style={style5}>3.</text><input
                                        onChange={this.handleChange.bind(this, 'opt3')} value={this.state.opt3}
                                        style={style5}
                                        placeholder="Option 3"
                                    /><br/><br/>
                                    <text style={style5}>4.</text><input
                                        onChange={this.handleChange.bind(this, 'opt4')} value={this.state.opt4}
                                        style={style5}
                                        placeholder="Option 4"
                                    />
                                </div>:
                                (options === 'yn')?
                                    <div>
                                        <button style={style5} className="btn">
                                            <input disabled={true} type="radio"></input>
                                        </button>
                                        <text style={style5}>Yes</text>
                                        <br/>
                                        <br/>
                                        <button style={style5} className="btn">
                                            <input disabled={true} type="radio"></input>
                                        </button>
                                        <text style={style5}>No</text>
                                    </div>:
                                    (options === 'date')?
                                        <div>
                                            <input disabled={true} style={style5} type="date"
                                                   placeholder="MM/DD/YYYY" />
                                        </div>:

                    <div>
                        <button style={style5} className="btn">
                            <input disabled={true} type="radio"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt1')} value={this.state.opt1}
                            style={style5}
                            placeholder="Option 1"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="radio"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt2')} value={this.state.opt2}
                            style={style5}
                            placeholder="Option 2"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="radio"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt3')} value={this.state.opt3}
                            style={style5}
                            placeholder="Option 3"
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input disabled={true} type="radio"></input>
                        </button>
                        <input
                            onChange={this.handleChange.bind(this, 'opt4')} value={this.state.opt4}
                            style={style5}
                            placeholder="Option 4"
                        />
                    </div>

        );
        return (
            <div>
                    <textarea
                        onChange={this.handleChange.bind(this, 'description')} value={this.state.description}
                        style={style3}
                        placeholder="Question"
                    />
                    <div className="dropdown">
                        <button style={style4} className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Response Type
                            <span className="caret"></span></button>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='mcqS'>Text Single</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='mcqM'>Text Multiple</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='mcqIS'>Image Single</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='mcqIM'>Image Multiple</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='drop'>DropdownList</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='yn'>Yes/No</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='text'>Short Answer</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='date'>Date/Time</button></li>
                            <li><button type="link" className="btn btn-link" onClick={this.handleChange.bind(this, 'qtype')} value='star'>Star Rating</button></li>
                        </ul>
                    </div>
                    <br/>
                    <br/>
                    <hr/>
                    {optionList}
                    <br/>
                    <hr/>

                </div>


        );

    }


}


export default withRouter(Question);