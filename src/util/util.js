//fetch: https://blog.csdn.net/mjzhang1993/article/details/72833095
export default function request(method, url, body) {
	method = method.toUpperCase();
	if (method === 'GET') {
		body = undefined;
	} else {
		body = body && JSON.stringify(body);
	}

	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body
	}).then((res) => {
		if (res.status >= 200 && res.status < 300) {
			return res;
		} else {
			return Promise.reject('请求失败！');
		}
	})
};

export const get = path => request('GET', path);
export const post = (path, body) => request('POST', path, body);
export const put = (path, body) => request('PUT', path, body);
export const del = (path, body) => request('DELETE', path, body);
export const GetQueryString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2];
	return null
};
export const util={
	_createXhr:function(){
		let xhr;
		xhr=new XMLHttpRequest();
		return xhr;
	},
	_obj2UrlStr:function(obj){
		let params="";
		for(let key in obj){
			if(obj.hasOwnProperty(key)){
				params+="&"+key+"="+encodeURIComponent(obj[key]);
			}
		}
		return params.slice(1);
	},
	_jsonp:function(opt){
		let script=document.createElement("script"),
			params=this._obj2UrlStr(opt.data),
			lastStr=opt.url[opt.url.length-1]||"",
			head = document.getElementsByTagName("head").item(0),
			fn="fn"+Math.random().toString().slice(2,10);
		if(lastStr==="?"||lastStr==="&"){
			opt.url+=params+"&callback="+fn;
		}else{
			opt.url+="?"+params+"&callback="+fn;
		}
		script.src=opt.url;
		window[fn]=function(data){
			opt.success(data);
			window[fn]=null;
			head.removeChild(script);
			script=null;
		};
		script.onerror=function(e){
			opt.error(e);
			head.removeChild(script);
			script=null;
		};
		head.appendChild(script);
	},
	ajax:function(opt){
		let noop=function(){};
		let async=(typeof opt.async==="undefined")?true:opt.async,
			type=(typeof opt.type==="undefined")?"get":opt.type.toLowerCase(),
			data=opt.data||{},
			dataType=opt.dataType||"json",
			url=opt.url||"",
			success=opt.success||noop,
			error=opt.error||noop;
		let params=this._obj2UrlStr(data),
			lastStr=url[url.length-1]||"";
		if(dataType==="jsonp"){
			this._jsonp({
				url:url,
				data:data,
				success:success,
				error:error
			});
		}else{
			let xhr=this._createXhr();
			xhr.onreadystatechange=function(e){
				if(xhr.readyState===4){
					if(xhr.status>=200&&xhr.status<300||xhr===304){
						success(dataType==="json"?JSON.parse(xhr.responseText):xhr.responseText,xhr.statusText,xhr);
					}else{
						error(xhr,xhr.statusText);
					}
				}
			};
			if(type==="get"){
				if(lastStr==="?"||lastStr==="&"){
					url+=params;
				}else{
					url+="?"+params;
				}
				xhr.open(type,url,async);
				xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
				xhr.send(null);
			}else if(type==="post"){
				if(lastStr==="?"||lastStr==="&"){
					url+="t="+Math.random();
				}else{
					url+="?"+"t="+Math.random();
				}
				xhr.open(type,url,async);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
				xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
				xhr.send(params);
			}
		}
	}
};
