import * as ds from "deepstream.io-client-js";
import { getToken } from "@/utils/utils";

const deeps = ds("wss://sunwingfood.roletask.com:6021/deepstream")

export function deepstream(currentUser) {
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
