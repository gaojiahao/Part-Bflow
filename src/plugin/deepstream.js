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

export async function deepstream(currentUser) {
    let address = await getDeepstream(),
        deeps = ds(`wss://${address}`),
        token = getToken(),
        name = currentUser.name ? currentUser.name : currentUser.nickname;

    
    if (name && currentUser.userId) {
        let username = [name, currentUser.userId].join("|");
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
