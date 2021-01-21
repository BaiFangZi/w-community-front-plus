// import {
//     getToken
// } from "@utils/auth"
import jwtDecode from "jwt-decode"
const state = {
    token: '',
    role: '',
    get isLogin() {
        return !!localStorage.getItem('token')
    },
    // get decodeToken() {
    //     console.log(jwtDecode(localStorage.getItem('token')))
    //     return
    //     // return jwt.decode(localStorage.getItem('token'))
    // }
    // token: getToken()
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    CLEAR_TOKEN() {
        localStorage.removeItem('token')
    },

    LOGIN(state) {
        state.isLogin = true
    },
    LOGOUT() {
        state.isLogin = false
    },

}
const getters = {
    DECODE_TOKEN() {
        // console.log(jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJfaWQiOiI1ZjY0OGY2Y2ZjNDEwMDAwZmIwMDcwZjIiLCJpYXQiOjE2MTExMDc4NzUsImV4cCI6MTYxMTE5NDI3NX0.U0qaN4bZEIfa6fOXzL92FccVg78uzTvG0W_a0l1dIdo"))
        return jwtDecode(localStorage.getItem('token'))
    },
    GET_TOKEN() {
        return localStorage.getItem('token')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}