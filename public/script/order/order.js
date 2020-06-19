/* 用户订单脚本文件 */

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://127.0.0.1:8080";

var vm = new Vue({
    el: "#app",
    data: {
        result: [],
        term: "",
        localStorage: window.localStorage.getItem("uname"),
        StorageUid: window.localStorage.getItem("uid"),
        orders:[]
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
        }
    },
    watch: {},
    mounted() {
        if (this.StorageUid) {
            this.axios.get(`/order?uid=${this.StorageUid}`).then(res => {
                var data = res.data;
                data.forEach(item=>{
                    item.buy_time = new Date(item.buy_time).toLocaleString()
                    this.orders.push(item)
                })
                console.log(this.orders)
            })
        }
    }
})
