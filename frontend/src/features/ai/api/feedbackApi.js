import axios from "axios";

export function saveFeedback(data) {

    return axios.post(

        "http://localhost:5000/api/v1/feedback",

        data

    );

}