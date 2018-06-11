export const getToken = () =>{
    let token ;
    if (localStorage['roleplay-token']) {
        try {
            token = JSON.parse(localStorage['roleplay-token']).token;
        } catch (e) {
            token = false;
        }
    }
    return token;
}