import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';
import Rating from 'react-star-rating-meter';
import {reactLocalStorage} from 'reactjs-localstorage';

class QuestionTake extends Component {

    constructor() {
        super();
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);
        this.state={

                sname:'survey',
                qtype:'fh',
                qdescription:'fh',
                ansM:'',
            ansS:'',
            options:'',
                email:reactLocalStorage.getObject('var'),
                ansT:'',

            //responses:[],
            svgHeart: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);

    };

    handleClick(rating, label, event) {
        this.setState({[label]:rating,
        options:rating});
    }

    handleHover(rating, label, event) {
        console.log(`HOVER rating: ${rating}, label: ${label}`);
    }

    handleChangeSur (qtype, qdesc, index,event) {
        event.preventDefault();
        const val = this.state;
        console.log(val);
        val['options'] = event.target.value;
        // if(qtype === 'text'){
        //     this.setState({ansT: event.target.value});
        // }
        // else if (qtype === 'star'){
        //     this.setState({ansS:this.ratings})
        // }
        // else{
        //     this.setState({ansM:event.target.value})
        // }

        const val2={
            sname:this.props.sname,
            qtype:qtype,
            qdescription:qdesc,
            options:this.state.options,
            email:reactLocalStorage.getObject('var'),
        };
        console.log('index'+index);
        this.props.sendResponse(val2,index);
    }

    // handleChangeSur1 (qtype, qdesc, index,event) {
    //     event.preventDefault();
    //     const val1 = this.state;
    //     console.log(val1);
    //     //val['options'] = val['options']+";"+event.target.value;
    //     // if(qtype === 'text'){
    //     //     this.setState({ansT: event.target.value});
    //     // }
    //     // else if (qtype === 'star'){
    //     //     this.setState({ansS:this.ratings})
    //     // }
    //     // else{
    //     //     this.setState({ansM:event.target.value})
    //     // }
    //
    //     const val2={
    //         sname:this.props.sname,
    //         qtype:qtype,
    //         qdescription:qdesc,
    //         options:this.state.options,
    //         email:reactLocalStorage.getObject('var'),
    //     };
    //     console.log('index'+index);
    //     this.props.sendResponse(val2,index);
    // }



        render()
        {

            var style2 = {
                border: "none",
                float: "left",
                width: "650px"
            };
            var style3 = {
                border: "none",
                float: "left",
                width: "500px"
            };

            let svgHeart = {
                path: "M11.608,21.997c-22.647-12.354-6.268-27.713,0-17.369C17.877-5.716,34.257,9.643,11.608,21.997z",
                viewBox: "0 0 23.217 21.217"
            };

            const titleStyle = {
                marginLeft: "10px",
                marginBottom: "10px",
                fontSize: "1.2em",
                fontFamily: "Helvetica, sans-serif",
                display: "table-caption"
            };
            const ratingStyle = {
                position: "relative",
                paddingBottom: "50px",
                display: "table",
                margin: "auto 0",

            };
            const textStyle = {
                marginLeft: "10px",
                marginTop: "8px"
            };

            var style5={
                width:"200px",
                float:"left",
                border:"none"
            };

            const ratings =
                [
                    <div style={ratingStyle} key={"svgHeart"}>
                        <Rating
                            label={"svgHeart"}
                            height={40}
                            length={500}
                            svg={svgHeart}
                            meterEmptyColor={"#8A2BE2"}
                            meterSelectColor={""}
                            meterBorderColor={"purple"}
                            meterBorderSize={0}
                            meterBorderStyle={"double"}
                            highlightColor={""}
                            highlightWidth={60}
                            starEmptyColor={"#D8BFD8"}
                            starSelectColor={"green"}
                            starSize={25}
                            getRating={this.handleClick}
                            onHover={this.handleHover}
                        />
                    </div>
                ];


            const queShow = this.props.questions;
            console.log(queShow);

            const optionList = queShow.map((option,index) => (

                    (option.qtype === 'text') ?
                        <div>
                    <textarea
                        value={option.description}
                        style={style3}
                        disabled={true}
                    />
                            <br/>
                            <textarea
                                style={style2}
                                placeholder="Enter Text"
                                onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}
                                // value={this.state.ans}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <hr/>
                        </div>



                     :
                (option.qtype === 'star') ?

                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            {ratings}
                            <input type="text" value={this.state.svgHeart} onClick={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} style={textStyle} />
                            {/*<text value={this.state.svgHeart} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}>{ratings}</text>*/}
                        </div>
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        <br/>
                        <hr/>
                    </div>
                     :(option.qtype === 'mcqM') ?
                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <br/>


                        <div className="checkbox">
                            <label style={style5}>
                                <input type="checkbox" name="checkbox" value={option.options.split(";")[0]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                {option.options.split(";")[0]}
                            </label>
                        </div>
                        <br/>
                        <div className="checkbox">
                            <label style={style5}>
                                <input type="checkbox"  name="checkbox" value={option.options.split(";")[1]} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}/>
                                {option.options.split(";")[1]}
                            </label>
                        </div>
                        <br/>
                        <div className="checkbox">
                            <label style={style5}>
                                <input type="checkbox"  name="checkbox" value={option.options.split(";")[2]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                {option.options.split(";")[2]}
                            </label>
                        </div>
                        <br/>
                        <div className="checkbox">
                            <label style={style5}>
                                <input type="checkbox"  name="checkbox" value={option.options.split(";")[3]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                {option.options.split(";")[3]}
                            </label>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                    </div>:
                    (option.qtype === 'mcqIS') ?
                        <div></div>:
                        (option.qtype === 'mcqIM') ?
                            <div></div>:
                            (option.qtype === 'drop') ?
                                <div>
                                <textarea
                                    value={option.description}
                                    style={style3}
                                    disabled={true}
                                />
                                    <br/>
                                    <br/>
                                    <br/>
                                    <select style={style5} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}>
                                        <option value={option.options.split(";")[0]} >{option.options.split(";")[0]}</option>
                                        <option value={option.options.split(";")[1]} >{option.options.split(";")[1]}</option>
                                        <option value={option.options.split(";")[2]}  >{option.options.split(";")[2]}</option>
                                        <option value={option.options.split(";")[3]}  >{option.options.split(";")[3]}</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <hr/>
                                </div>:
                                (option.qtype === 'yn') ?
                                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                                        <br/>
                                        <br/>
                                        <br/>


                                        <div className="radio" style={style5} >
                                            <label >
                                                <input  type="radio" name="radio1" value="Yes"  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                                Yes
                                            </label>
                                        </div>
                                        <br/><br/>
                                        <div className="radio" style={style5}>
                                            <label>
                                                <input type="radio"  name="radio1" value="No" onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}/>
                                                No
                                            </label>
                                        </div><br/>
                                        <br/><hr/>
                                    </div>:
                                    (option.qtype === 'date') ?
                                        <div>
                                        <textarea
                                            value={option.description}
                                            style={style3}
                                            disabled={true}
                                        />
                                            <br/>
                                            <br/>
                                            <br/>
                                            <input onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} style={style5} type="date"
                                                   placeholder="MM/DD/YYYY" />
                                            <br/>
                                            <br/>
                                            <hr/>
                                        </div>:
                        <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                            <br/>
                            <br/>
                            <br/>


                            <div className="radio">
                                <label style={style5}>
                                    <input type="radio" name="radio" value={option.options.split(";")[0]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[0]}
                                </label>
                            </div>
                            <br/>
                            <div className="radio">
                                <label style={style5}>
                                    <input type="radio"  name="radio" value={option.options.split(";")[1]} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}/>
                                    {option.options.split(";")[1]}
                                </label>
                            </div>
                            <br/>
                            <div className="radio">
                                <label style={style5}>
                                    <input type="radio"  name="radio" value={option.options.split(";")[2]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[2]}
                                </label>
                            </div>
                            <br/>
                            <div className="radio">
                                <label style={style5}>
                                    <input type="radio"  name="radio" value={option.options.split(";")[3]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[3]}
                                </label>
                            </div>
                            <br/>
                            <br/>
                            <hr/>
                        </div>







            ));
            return (
                <div>
                    <ul>
                        {optionList}
                    </ul>
                    {/*<button className="btn btn-primary" onClick={() => this.submit}>Submit</button>*/}

                </div>


            );

        }


}


export default withRouter(QuestionTake);