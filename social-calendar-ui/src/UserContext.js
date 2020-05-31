import {createContext} from "react";
const UserContext = createContext({
    loggedIn: false,
    username: "",
    _id: "",
    userProps: {
        friendsList: [{
        }],
        events: [{}]
    },
    logIn: () => undefined
});

export default UserContext