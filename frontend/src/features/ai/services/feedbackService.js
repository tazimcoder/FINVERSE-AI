import {

    saveFeedback,

} from "../api/feedbackApi";

export async function sendFeedback(data) {

    await saveFeedback(data);

}