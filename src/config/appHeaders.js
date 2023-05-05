export const HEADERS = {
    LOGIN: (basicData) => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicData}`,
            'Cache-Control': 'no-cache'
        }
    },
    AUTHENTIC: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            //'Authorization':'Basic YWRtaW46YWRtaW4=',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Cache-Control': 'no-cachey',
            'Access-Control-Allow-Origin' : '*'
        }
    },
    FILE: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': '',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Cache-Control': 'no-cache',
        }
    }
}


