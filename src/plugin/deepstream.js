import * as ds from "deepstream.io-client-js";
import { getToken } from "@/utils/utils";
import { getProp } from "@/services/flowService";
import { lstat } from "fs";

function getDeepstream() {
    return getProp().then(res => {
        if (res.success) {
            return res.message;
        }
    })
}

export async function deepstream(currentUser,address) {
    if(!address){
        address = await getDeepstream();
    }
    let protocol = window.top.location.protocol.indexOf('https') != -1 ? "wss" : 'ws';
    let deeps = ds(`${protocol}://${address}`),
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

        // deeps.on('connectionStateChanged', connectionState => {
        //     debugger
        // // will be called with 'CLOSED' once the connection is successfully closed.
        // })

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
