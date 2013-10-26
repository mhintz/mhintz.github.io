define(["jquery"], function($) {

	var lightTheme = $(body).hasClass("lightScheme");
	
	var Values = {
		FG_COLOR: lightTheme ? "#151515" : "#fafafa",
		BG_COLOR: lightTheme ? "#fafafa" : "#151515"
	};

	return Values;
});