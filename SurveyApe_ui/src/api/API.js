const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


export const login = (payload) =>
    fetch(`${apis}/users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:payload.userData.email,pwd:payload.userData.password})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const register = (payload) =>
    fetch(`${apis}/users/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:payload.formData.email,pwd:payload.formData.password,firstname:payload.formData.Fname,lastname:payload.formData.Lname})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const verify = (payload) =>
    fetch(`${apis}/users/verify`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});


export const postSurvey = (payload) =>
    fetch(`${apis}/surveys/addSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.survey.name,"type":payload.survey.type,"users":payload.survey.users,"email":payload.survey.email,"publish":payload.survey.publish,"end":payload.survey.end},"questions":payload.survey.questions})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const postSurvey1 = (payload) =>
    fetch(`${apis}/surveys/addSurvey1`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.name,"type":payload.type,"users":payload.users,"email":payload.email,"publish":payload.publish,"end":payload.end},"questions":payload.questions})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const saveSurvey = (payload) =>
    fetch(`${apis}/surveys/saveSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.name,"email":payload.email},"questions":payload.questions})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});



export const getSurvey = (payload) =>
    fetch(`${apis}/surveys/getSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getUniqueSurvey = (payload) =>
    fetch(`${apis}/surveys/getUniqueSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.sname},"user":{"email":payload.email}})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});




export const getSurveys = (payload) =>
    fetch(`${apis}/surveys/getPublished`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getGeneralSurveys = (payload) =>
    fetch(`${apis}/surveys/getGeneral`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getOpenSurveys = (payload) =>
    fetch(`${apis}/surveys/getOpen`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getSavedSurveys = (payload) =>
    fetch(`${apis}/surveys/getSaved`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getSavedSurvey = (payload) =>
    fetch(`${apis}/surveys/getISurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const submitSurvey = (payload) =>
    fetch(`${apis}/surveys/addResponse`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"responses":payload,"user":{"email":payload[0].email}})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const del = (payload) =>
    fetch(`${apis}/surveys/deleteSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const edit = (payload) =>
    fetch(`${apis}/surveys/editEnd`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const addInvitees = (payload) =>
    fetch(`${apis}/surveys/editInvite`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});


export const stats = (payload) =>
    fetch(`${apis}/surveys/stats`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":payload.formname})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

