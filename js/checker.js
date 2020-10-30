$(document).ready(function(e) {
	resize_to_viewport()
	
	$('#scereenwidth').html(screen_width+' x '+screen_height+' [ '+screen_type+' ] ');
	$('#custom_screen_width').val(screen_width);
	$('#custom_screen_height').val(screen_height);
	
	
	$('.top_menu').click(function(e) {
        e.preventDefault();
		$('.custome-menu').css('display','none');
		top_menu_chlid = $(this).parent().find('.sub-menu');
		if(top_menu_chlid.css('display')=='block')
		{
			$('.sub-menu').css('display','none'); 	
			top_menu_chlid.css('display','none');
		}
		else
		{
			$('.sub-menu').css('display','none'); 	
			top_menu_chlid.css('display','block');
		}
    });
	$('.top_menu_custome').click(function(e) {
        e.preventDefault();
		$('.sub-menu').css('display','none');
		if($('.custome-menu').css('display')=='block')
		{
			$('.custome-menu').css('display','none');
		}
		else
		{
			$('.custome-menu').css('display','block');
		}
    });
	
	
	$('.sub-menu li a').click(function(e) {
        e.preventDefault();
		$('.sub-menu').css('display','none');
		var screen_temp =$(this).attr('href');
		var screen_temp=screen_temp.split('|brk|');
		if(screen_temp.length==3)
		{
			screen_width = screen_temp[0];
			screen_height = screen_temp[1];
			screen_type = screen_temp[2];
			screen_reset();
		}
    });
	
	
	
	$('#custom_screen_go').click(function(e) {
			screen_width = screen_width_temp;
			screen_height = screen_height_temp;
			screen_type = 'Custom Screen';
			screen_reset();
    });
	$('#custom_screen_width').keyup(function(e) {
        if(isNaN($(this).val()))
		{
			$(this).val(screen_width_temp);
		}
		else
		{
			screen_width_temp = $(this).val();
		}
    });
	$('#custom_screen_height').keyup(function(e) {
        if(isNaN($(this).val()))
		{
			$(this).val(screen_height_temp);
		}
		else
		{
			screen_height_temp = $(this).val();
		}
    });
	$('#screen_rotater').click(function(e) {
        e.preventDefault();
		var screen_rotate_temp = screen_width;
		screen_width = screen_height;
		screen_height = screen_rotate_temp;
		screen_reset();
    });
	$('#bookmark_icon').click(function(e) {
        e.preventDefault();
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { 
            alert("This function is not available in Google Chrome. Click the star symbol at the end of the address-bar or hit Ctrl-D (Command+D for Macs) to create a bookmark.");      
    	} else if (window.sidebar) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if( window.external || document.all) { // For IE Favorite
			window.external.AddFavorite( bookmarkUrl, bookmarkTitle);
		} else if(window.opera) { // For Opera Browsers
			$("a.jQueryBookmark").attr("href",bookmarkUrl);
			$("a.jQueryBookmark").attr("title",bookmarkTitle);
			$("a.jQueryBookmark").attr("rel","sidebar");
		} else { // for other browsers which does not support
			 alert('Your browser does not support this bookmark action');
			 return false;
		}				
    });
	$('#screen_scrolling').click(function(e) {
        e.preventDefault();
		if(screen_scrolling =='no')
		{
			screen_scrolling ='yes';
			$('#screen_frame').attr('scrolling','yes');
			$('#screen_scrolling_no').css('display','none');
			$('#screen_scrolling_yes').css('display','block');
		}
		else
		{
			screen_scrolling ='no';
			$('#screen_frame').attr('scrolling','no');
			$('#screen_scrolling_yes').css('display','none');
			$('#screen_scrolling_no').css('display','block');
		}
		$('#screen_frame').attr('src',$('#screen_frame').attr('src'));
		$('#screencheck_width').attr('value',screen_width);
		$('#screencheck_height').attr('value',screen_height);
		$('#screencheck_type').attr('value',screen_type);
		$('#screencheck_scrolling').attr('value',screen_scrolling);
    });
	$('#screen_refresh').click(function(e) {
        e.preventDefault();
		$('#screen_frame').attr('src',$('#screen_frame').attr('src'));
    });
	$('#screencheck_url_frm').submit(function(e) {
        if($('#screencheck_url').val()=='http://' || $('#screencheck_url').val()=='')
		{
			alert('Please enter website url');
			$('#screencheck_url').focus();
			return false;
		}
		else if(!validate_url($('#screencheck_url').val()))
		{
			alert('Please enter valid website url');
			$('#screencheck_url').focus();
			return false;
		}
		else
		{
			return true;
		}
    });
	$('#facebook_share_btn').click(function(e) {
        e.preventDefault();
        window.open($(this).attr("href"), 'FaceBook Share',"width=300,height=400,scrollbars=yes");							
    });
});
$(window).resize(function() {
  resize_to_viewport();
});
function screen_reset()
{
	$('#scereenwidth').html(screen_width+' x '+screen_height+' [ '+screen_type+' ] ');
	$('#screen_frame').animate({width : screen_width, height : screen_height}, 1000, function() {});
	$('#custom_screen_width').val(screen_width);
	$('#custom_screen_height').val(screen_height);
	$('#screencheck_width').attr('value',screen_width);
	$('#screencheck_height').attr('value',screen_height);
	$('#screencheck_type').attr('value',screen_type);
	$('#screencheck_scrolling').attr('value',screen_scrolling);
}
function resize_to_viewport()
{
	var w_std = $(window).width();
	var h_std = $(window).height();
	if(w_std<1024)
	{
		w_std = 1024;
		h_std = 786;
	}
	$('.left_wraper').css({'min-height' : h_std-49+'px'});
	$('.container').css({'min-height' : h_std-107+'px'});
	$('.contentoutercon').css({'min-width' : w_std-108+'px'});
}
function validate_url(textval) {
	var urlregex = new RegExp(           "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	return urlregex.test(textval);
}
