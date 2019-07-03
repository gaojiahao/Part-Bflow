(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		define([
			"jquery"
		], factory );
	} else {

		factory( jQuery );
	}
}(function( $ ) {

	/**
	 * @author snack.huang 
	 * @declare rfd-http func
	 * @param  {string}   url      资源地址
	 * @param  {string}   type     http动词 get,post,put,delete
	 * @param  {any}   data        参数
	 * @param  {Function} callback 回调函数
	 * @param  {boolean}		   是否同步，ajax默认为异步请求
	 * @return {function}          [description]
	 */
	$._rfd_http = function (url, type, data, sync, callback){
		$.ajaxSettings.contentType = 'application/json; charset=utf-8';
		$.ajax(
			{
			type: type,
			url:url,
			datatype: "JSON",
			sync: sync || false,
			data:data ? data : {},
			// params: params ? params:{},
			headers: {
				Accept: "application/json, text/plain, */*"
			},
			beforeSend:function (xhr){
				var token = $.parseJSON(window.top.localStorage.getItem("roleplay-token")).token;
				xhr.setRequestHeader('Authorization', token);
			},
			success: function (data){
				if(callback){callback(data); return;}
				return data;
			},
			error: function (error) { 

				var msg = JSON.parse(error.response);

				if (callback) { callback(msg); return;}

				if (msg.message){
					alert(msg.message); 
				} else {
					alert(msg);
				}
			}
		});
	}
}))