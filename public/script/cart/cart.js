/* 购物车页面脚本文件 */

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://127.0.0.1:8080"

var vm = new Vue({
    el: "#app",
    data: {
        localStorage: window.localStorage.getItem("uname"),
        StorageUid: localStorage.getItem("uid"),
        allData: false,
        checkData: [],
        cartArr: [],
        term: ""
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
        },
        allCheck: function() {
            var check = document.getElementsByClassName("commodities-check");
            for (let i of check) {
                i.checked = !i.checked
            }
            this.checkData.forEach(item => {
                item.value = this.allData
            })
        },
        singleCheck: function() {
            var ischeck = this.checkData.filter(item => {
                return item.value == true;
            });
            ischeck.length == this.checkData.length ? this.allData = true : this.allData = false;
        },
        purchase: function() {
            var check = document.getElementsByClassName("commodities-check");
            var checkCommodity = [];
            for (let i of check) {
                if (i.checked) {
                    checkCommodity.push(i.getAttribute("id"))
                }
            }
            var wxPay = document.getElementsByClassName("wx")[0];
            var body = `buyitem=${checkCommodity}&uid=${this.StorageUid}`;
            var options = {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            };
            if (checkCommodity.length > 0) {
                wxPay.style.display = "block";
                wxPay.onclick = () => {
                    wxPay.style.display = "none";
                    this.axios.post("/cart/buy", body, options).then(res => {
                        if (res.data == 1) {
                            alert("购买成功")
                            var orderArr = [];
                            for (var i = 0; i < checkCommodity.length; i++) {
                                for (var j = 0; j < this.cartArr.length; j++) {
                                    if (checkCommodity[i] == this.cartArr[j].cid) {
                                        this.cartArr[j].buyTime = new Date().getTime();
                                        orderArr.push(this.cartArr[j]);
                                    }
                                }
                            };
                            var orderBody = `orders=${JSON.stringify(orderArr)}&uid=${this.StorageUid}&uname=${this.localStorage}`;
                            this.axios.post("/order", orderBody, options).then(res => {
                                console.log(res.data)
                            })
                            location.reload()
                        } else {
                            alert("购买失败")
                        }
                    })
                }
            } else {
                alert("请先勾选你要购买的商品")
            }
        },
        removeCommodity: function(id) {
            var body = `cid=${id}&uid=${this.StorageUid}`;
            var options = {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }
            this.axios.post("/cart/remove", body, options).then(res => {
                if (res.data == 1) {
                    location.reload()
                } else {
                    alert("移除失败")
                }
            })
        }
    },
    watch: {},
    computed: {
        total: function() {
            return function() {
                var check = document.getElementsByClassName("commodities-check");
                var price = 0;
                for (let i of check) {
                    if (i.checked == true) {
                        price += parseInt($(i).siblings(".commodities-price").html().split("￥")[1].split(
                            "<")[0])
                    }
                }
                return price
            }
        }
    },
    mounted() {
        if (this.StorageUid) {
            this.axios.get(`/cart?uid=${this.StorageUid}`).then(res => {
                var data = res.data;
                if (data) {
                    data.forEach(item => {
                        this.cartArr.push(item);
                        this.checkData.push({
                            id: item.cid,
                            value: false
                        })
                    })
                    console.log(this.cartArr, this.checkData)
                }
            })
        }
    }
})
