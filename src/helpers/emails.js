import { regexNamedEmail, regexPlainEmail } from './regex';

export function parseEmails(data) {
    //split by comma, then trim the whitespaces
    let splitData = data.split(",").map((item) => item.trim());
    let parsedData = [];

    for (let i = 0; i < splitData.length; i++) {
        if (regexNamedEmail(splitData[i])) {
            let preparedData = prepareNamedEmail(splitData[i]);
            parsedData.push({ status: 1, email: preparedData.email, name: preparedData.name });
        } else if (regexPlainEmail(splitData[i])) {
            parsedData.push({ status: 1, email: splitData[i], name: null});
        } else {
            parsedData.push({ status: 0, email: splitData[i], name: null});
        }
    }

    return parsedData;
}

function prepareNamedEmail(data) {
    //get position of email string
    let lt = data.indexOf('<');
    let gt = data.indexOf('>');

    return {
        email: data.substring(lt+1, gt),
        name: data.substring(0, lt)
    }
}