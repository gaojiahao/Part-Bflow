import * as ds from "deepstream.io-client-js";
import { getToken } from "@/utils/utils";
import { getProp } from "@/services/flowService";

// function getDeepstream(){
//     return  getProp().then(res=>{
//         if(res.success){
//             return res.message;
//         }
//     })
// }

export  function deepstream(currentUser) {
    // let address = getDeepstream();
    let deeps = ds("wss://sunwingfood.roletask.com:6021/deepstream");
    let name = currentUser.name?currentUser.name:currentUser.nickname;
    if (name && currentUser.userId) {
        let username = [name, currentUser.userId].join("|");
        let token = getToken();
        //注册deepStream
        deeps.login(
            {
                token: token,
                username: username
            },
            data => {
                console.log("connect success!");
            }
        );
        return deeps;
    }
}
