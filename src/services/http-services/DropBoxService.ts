import axios from 'axios';

const dropboxClient = axios.create({
    baseURL: 'https://www.dropbox.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const dropboxApi = axios.create({
    baseURL: 'https://api.dropboxapi.com',
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_DB_API_KEY}>`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// https://www.dropbox.com/oauth2/authorize?client_id=<APP_KEY>&response_type=code

// https://api.dropboxapi.com/2/file_requests/get

const END_POINT = ""

class DropBoxApiService {
    /**
     * 
     * @returns 
     */
    getFiles() {
        return dropboxApi.post(`/2/file_requests/count`, {
            "limit": 1000
        })
    }
}

export default new DropBoxApiService();