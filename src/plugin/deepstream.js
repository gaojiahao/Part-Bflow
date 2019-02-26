import * as ds from "deepstream.io-client-js";
import { getToken } from "@/utils/utils";
import { getProp } from "@/services/flowService";

function getDeepstream() {
    return getProp().then(res => {
        if (res.success) {
            return res.message;
        }
    })
}

export async function deepstream(currentUser,address) {
    let deepstreamAddress = '';
    if(address){
       deepstreamAddress =JSON.parse(address)['deepstream.uri2'];
    }else{
        deepstreamAddress = await getDeepstream();
    }
    let deeps = ds(`wss://${deepstreamAddress}`),
    token = getToken(),
    name = currentUser.name ? currentUser.name : currentUser.nickname;

    
    if (name && currentUser.userId) {
        let username = [name, currentUser.userId].join("|");
        deeps.on('error', function (error, type) {
            if (type == 'connectionError'){
                console.log('ds服务器连接障碍！');
                this.close();
            }   
        });
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
