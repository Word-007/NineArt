/* apps页面 axios异步请求脚本文件 */

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://127.0.0.1:8080";

var vm = new Vue({
    el: "#app",
    data: {
        search: {},
        data: [],
        term: "",
        localStorage: window.localStorage.getItem("uname"),
        StorageUid: window.localStorage.getItem("uid")
    },
    methods: {
        query: function(event) {
            if (event.keyCode == 13) {
                window.location.href = `apps.html?term=${this.term}`
            }
        },
        clearStorage: function() {
            window.localStorage.removeItem("uname");
            window.localStorage.removeItem("uid");
            location.reload()
        }
    },
    watch: {
    },
    created() {
        var search = window.location.search.substring(1);
        search = search.split("&")
        for (let key in search) {
            this.search[search[key].split("=")[0]] = decodeURI(search[key].split("=")[1])
        }
    },
    mounted() {
        if (this.search.tid) {
            this.axios.get(`/apps?tid=${this.search.tid}`).then(res => {
                if (res.data != 0) {
                    res.data.forEach(item => {
                        this.data.push(item)
                    })
                }
                console.log(this.data)
            })
        };
        if (this.search.term) {
            this.axios.get(`/apps?term=${this.search.term}`).then(res => {
                if (res.data) {
                    this.data = res.data
                }
            })
        }
    }
})
