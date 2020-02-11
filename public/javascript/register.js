
function register(){
	var $uname =uname.value;
	var $upwd = upwd.value;
	var $country = country.value;
	var $email = email.value;
	if(!$uname||!$upwd||!$email){
		error_display.innerHTML = '请按下面简述的规则输入用户名和密码,并查看下面突出显示的更多错误。';
		error_display.style.display = 'block'
		return;
	}else if(i_agree.checked==false){
		error_display.innerHTML = '您必须勾选自己已满13周岁的复选框才能完成注册.';
		error_display.style.display = 'block';
		return;
	}else{
		error_display.innerHTML = 'OK'
		error_display.style.display = 'block';
		error_display.style.border = '1px solid green';
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result = xhr.responseText;
			if(result==1){
				error_display.innerHTML ='该用户名已存在'
			}else if(result==2){
				error_display.innerHTML ='注册成功'
			}else{
				error_display.innerHTML ='注册失败,未知错误,请检查您所有填写的数据然后再试'
			}
		}
	}
	xhr.open('POST','/reg/register/',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var fromdata='uname='+$uname+'&upwd='+$upwd+'&country='+$country
	+'&email='+$email;
	xhr.send(fromdata);
}