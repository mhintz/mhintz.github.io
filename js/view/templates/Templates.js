define(["underscore",
		"text!./sections/navbar.html",
		"text!./sections/root.html",
		"text!./sections/work.html",
		"text!./sections/explorations.html",
		"text!./blog/blog-post.html",
		"text!./blog/blog.html"],
function(_,
		 navbarTemplate,
		 rootTemplate,
		 workTemplate,
		 explorationsTemplate,
		 blogTemplate,
		 blogPostTemplate) {
	
	return {
		navbar: _.template(navbarTemplate),
		root: _.template(rootTemplate),
		work: _.template(workTemplate),
		explorations: _.template(explorationsTemplate),
		blog: _.template(blogTemplate),
		blogPost: _.template(blogPostTemplate)
	};
});