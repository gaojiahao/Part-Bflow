import * as ds from "deepstream.io-client-js";
import { getToken } from "@/utils/utils";

const deeps = ds("wss://192.168.3.160:6021/deepstream")

export function deepstream(currentUser) {
    if (currentUser.nickname && currentUser.userId) {
        let username = [currentUser.nickname, currentUser.userId].join("|");
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
