import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if( accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }


    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if(request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response) => {
        if(response.status === 200) {
            return response.json();
        } else if( response.status === 403) { // forbidden 이면
            window.location.href = "/login"; // 로그인페이지로 리다이렉션
        } else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch( (error) => {
        console.log("http.error");
        console.log(error);
    });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then( (response) => {
            // console.log("response: ", response);
            alert("로그인 토큰: " + response.token);
            if(response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                window.location.href = "/";
            }
        });
}


export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}