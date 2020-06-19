function login() {
    var $uname = uname.value;
    var $upwd = upwd.value;
    if (!$uname) {
        error_display.innerHTML = '账户名不能为空';
        error_display.style.display = 'block'
        return
    }
    if (!$upwd) {
        error_display.innerHTML = '密码不能为空';
        error_display.style.display = 'block'
        return
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            if (result) {
                error_display.innerHTML = '登录成功';
                error_display.style.display = 'block';
                error_display.style.color = 'green'
                var result = JSON.parse(result)
                window.localStorage.setItem("uname", result[0].uname);
                window.localStorage.setItem("uid", result[0].uid);
                location.href = '../index.html'
            } else {
                error_display.style.display = 'block';
                error_display.innerHTML = '账户与密码不匹配'
            }
        }
    }
    xhr.open('GET', '/login/' + $uname + '&' + $upwd, true);
    xhr.send();
}
var vm = new Vue({
    el: "#app",
    data: {
        term: "",
        localStorage: window.localStorage.getItem("uname")
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
    }
})
