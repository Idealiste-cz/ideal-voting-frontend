export function parseEmails(data) {
    //split by comma, then trim the whitespaces
    let parsedData = data.split(",").map((item) => item.trim());
    return parsedData;
}