/*************
游戏详情页异步请求脚本
***************/

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://127.0.0.1:8080";

let vm = new Vue({
    el: "#app",
    data: {
        url: window.location.search.substring(1),
        urlObj: {},
        app_arr: [],
        localStorage: window.localStorage.getItem("uname"),
        StorageUid: parseInt(localStorage.getItem("uid")),
        term: ""
    },
    methods: {
        clearStorage: function() {
            window.localStorage.removeItem("uname");
            window.localStorage.removeItem("uid");
            location.reload()
        },
        query: function(event) {
            if (event.keyCode == 13) {
                window.location.href = `apps.html?term=${this.term}`
            }
        },
        addCart(e) {
            if (this.localStorage) {
                e.preventDefault()
                let body =
                    `uid=${this.StorageUid}&uname=${this.localStorage}&cgid=${this.app_arr[0].gid}&game_name=${this.app_arr[0].game_name}`;
                let options = {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    }
                };
                this.axios.post(`/cart`, body, options).then(res => {
                    if (res.data == 1) {
                        location.href = "../cart.html"
                    } else if (res.data == -1) {
                        alert("您已经添加了该商品,请勿重复添加")
                    } else {
                        alert("添加失败！未知原因,请稍候再试。")
                    }
                })
            } else {
                e.preventDefault()
                var fixed = document.getElementsByClassName("fixed")[0]
                fixed.style.display = "block";
                var messageLink = document.getElementsByClassName("message-link")[1];
                console.log(messageLink)
                messageLink.onclick = function() {
                    fixed.style.display = "none"
                }
            }
        }
    },
    watch: {
        app_arr:function(){
            document.title = `正在浏览 ${this.app_arr[0].game_name}`
        }
    },
    created() {

    },
    beforeMount() {
        var parameter = this.url.split("&")
        for (let key of parameter) {
            var a = key.split("=")
            this.urlObj[a[0]] = a[1]
        }
    },
    mounted() {
        this.axios.get(`/app?gid=${this.urlObj.gid}`).then(res => {
            var data = res.data;
            data.forEach(item => {
                item.type = [];
                item.md_item = [];
                item.Sm_img = [];
                for (let i in item) {
                    if (i.slice(0, 2) == "lg") {
                        item.md_item.push(item[i])
                        delete item[i]
                    } else if (i.slice(0, 2) == "sm") {
                        item.Sm_img.push(item[i])
                        delete item[i]
                    } else if (i == "type_name" || i == "type_aka") {
                        item.type.push(item[i])
                        delete item[i]
                    }
                }
                if (item.issue_time) {
                    item.issue_time = item.issue_time.split("T")[0]
                }
                this.app_arr.push(item)
            })
        })
        console.log(this.app_arr)
    }
})
