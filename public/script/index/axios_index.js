/*****************
主页的请求服务器接口文件
******************/

Vue.prototype.axios = axios;

axios.defaults.baseURL = "http://127.0.0.1:8080";

var vm = new Vue({
    el: "#app",
    data: {
        carousel_arr: [],
        discount_arr: [],
        banner_arr: [],
        allgame_arr: [],
        start: 0,
        pagesize: 10,
        term: "",
        localStorage: window.localStorage.getItem("uname"),
        StorageUid: window.localStorage.getItem("uid")
    },
    methods: {
        requestPage: function(e) {
            var start = parseInt(e.target.innerHTML)
            this.axios.get(`/index/allgame`, {
                params: {
                    start: start - 1,
                    pagesize: this.$data.pagesize
                }
            }).then(res => {
                var data = res.data;
                this.allgame_arr = data;
                console.log(this.allgame_arr)
            });
        },
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
    watch: {
        allgame_arr: function() {
            this.$nextTick(function() {
                var all_left_content = $('.all_nav_left_content .tab_item')
                var nav_right_containe = $('.nav_right_containe .tab_preview')
                for (let key of all_left_content) {
                    $(key).on('mousemove', function() {
                        var index = $(this).index()
                        $(nav_right_containe[index]).addClass('focus').siblings().removeClass(
                            'focus')
                    })
                }
            });
        },
        carousel_arr: function() {
            this.$nextTick(function() {
                var carousel_bgimg = document.getElementsByClassName('carousel_bgimg');
                var indicators_content = $('.carousel_content .indicators_content')
                for (let i = 0; i < this.carousel_arr.length; i++) {
                    var div = document.createElement('div');
                    if (i == 0) {
                        $(div).addClass('focus')
                    }
                    indicators_content.append(div)
                }
                var Pointer = $('.carousel_content .indicators_content>div');
                for (let i of Pointer) {
                    $(i).on("click", function(e) {
                        var $this = $(e.target);
                        var $carousel_bgimg = $(carousel_bgimg[$this.index()]);
                        $this.addClass('focus').siblings().removeClass('focus');
                        $carousel_bgimg.addClass('no_paging').siblings().removeClass(
                            'no_paging');
                    })
                }
                var sm_bgimg = $('.sm_bgimg');

                for (let img of sm_bgimg) {
                    var $img = $(img)
                    $($img).on('mouseover', function(e) {
                        var lg_bgimg = $('.no_paging .screenshot')
                        var dataIndex = this.getAttribute('data-index');
                        $(lg_bgimg[dataIndex]).addClass('focus').siblings().removeClass(
                            'focus');
                    })
                    $($img).on('mouseout', function() {
                        var lg_bgimg = $('.no_paging .screenshot')
                        $(lg_bgimg[0]).addClass('focus').siblings().removeClass('focus')
                    })
                }
            })
        }
    },
    created() {
    },
    beforeMount() {},
    mounted() {
        this.axios.get('/index/carousel').then(res => {
            var data = res.data;
            data.forEach((item) => {
                this.carousel_arr.push(item)
            })
            console.log(this.carousel_arr)
        });
        this.axios.get("/index/discount").then(res => {
            var data = res.data;
            data.forEach(item => {
                this.discount_arr.push(item)
            })
        });
        this.axios.get("/index/banner").then(res => {
            var data = res.data;
            data.forEach(item => {
                this.banner_arr.push(item)
            })
        });
        this.axios.get(`/index/allgame`, {
            params: {
                start: this.$data.start,
                pagesize: this.$data.pagesize
            }
        }).then(res => {
            var data = res.data;
            this.allgame_arr = data;
        });
    }
})
