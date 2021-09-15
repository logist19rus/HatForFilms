export class ParseResponse {
    getStatus = function (response) {
        var status = response.status;
        console.log(status);
        if (status === 200) {
            return ResponseStatuses.Ok;
        }
        else {
            return ResponseStatuses.Error;
        }
    }
}

export class ResponseStatuses {
    Ok = 1;
    Error = 0;
    Undef = -1;
}