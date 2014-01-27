define([], function() {
	var Content = {
		"nav": {
			"twitter": "https://twitter.com/MarkHintz",
			"github": "http://www.github.com/mhintz/",
			"email": ["mark", "o", "hintz", "@", "gmail", ".com"].join("")
		},
		"root": {

		},
		"work": {
			"header": "The following is a list of the publicly viewable projects I have worked on. It does not include prototypes, back-end work, data analysis, or projects that were intended for clients' internal use. To learn more about this and other work I've done, feel free to drop me a line.",
			"portfolioItems": [
				{
					"title": "50 Years Later: John F. Kennedy's Life, Loss and Legacy",
					"url": "http://nvcdn.nbcnews.com/_util/jfk50/",
					"descriptionTitle": "A tool for exploring interview video clips.",
					"descriptionBody": "For the 50th Anniversary of John F. Kennedy's death, NBC's Tom Brokaw conducted a series of interviews discussing the president's life and legacy. He met with a variety of politicians, media members, scholars, dignitaries, and citizens who were involved with the Kennedy family or the events surrounding the assassination. Periscopic partnered with NBC Universal to design and develop an interface for the video clips.",
					"responsibility": "I implemented most of the site, for the most part working from design comps that had been created by Periscopic designers. I collaborated with another developer on the animation and layout of the thumbnails. Two particular challenges were to make the site functional in Internet Explorer 8, and to build the interaction system for touch-enabled devices.",
					"photos": [
						"img/projects/nbc/nbc_1.jpg",
						"img/projects/nbc/nbc_2.jpg",
						"img/projects/nbc/nbc_3.jpg"
					]
				},
				{
					"title": "Creating change from 2008 to 2012",
					"url": "http://www.adobe.com/corporate-responsibility/cr-reports.html",
					"descriptionTitle": "Creatively Visualizing Data on the Progress of Corporate Responsibility Campaigns at Adobe",
					"descriptionBody": "A creative, data art-inspired look at corporate responsibility initiatives at Adobe. We wanted to do an abstract presentation that would reveal the data behind it as the user interacted with the tool. In particular we wanted animations that would feel surprising, but also natural.",
					"responsibility": "I first built an early prototype to test different concepts. With this prototype we discovered the forms that we would end up using in the final piece. I then implemented the final design for the site, along with all interaction and graphics. My favorite part, but also the most complicated to implement, was the passive animation that occurs on the main page, as the shapes fade one by one into view along with a caption.",
					"photos": [
						"img/projects/adobe/adobe_1.jpg",
						"img/projects/adobe/adobe_2.jpg",
						"img/projects/adobe/adobe_3.jpg"
					]
				},
				{
					"title": "The Wait We Carry",
					"url": "http://thewaitwecarry.org/",
					"descriptionTitle": "Using Data to Tell the Stories of U.S. Veterans Waiting for Medical Assistance from the Government",
					"descriptionBody": "This was a project to visualize data collected from a survey of U.S. veterans of the wars in Iraq and Afghanistan that received support from the Veterans' Administration for medical conditions stemming from their service. These conditions included bodily aches and pains, stress injuries, psychological conditions, and physical injuries incurred in combat. Many veterans spent inordinate time waiting for the VA to process their requests for assistance.",
					"responsibility": "I was the front-end developer for this project, which included a video intro and a large amount of user-supplied data. The data was unprocessed, so it was occasionally strange. The automatic video intro proved to be a challenge. This was the first project for which I used require.js to manage module and dependency loading, which expanded my understanding of object-oriented program architecture.",
					"photos": [
						"img/projects/iava/iava_1.jpg",
						"img/projects/iava/iava_2.jpg",
						"img/projects/iava/iava_3.jpg"
					]
				},
				{
					"title": "U.S. Gun Deaths",
					"url": "http://guns.periscopic.com/",
					"descriptionTitle": "A Visualization of the Loss of Life from Gun Killings in the U.S.",
					"descriptionBody": "After the 2012 mass shooting at Sandy Hook elementary school, we at Periscopic decided to create a visualization using data on homicides collected by the FBI. We looked in particular at killings by gun, which are so alarmingly frequent in the United States, and sought to highlight the tragedy of the loss of the victims' years of life. Using data from the World Health Organization, we put together a very rough life expectancy generator to give an idea of the amount of lost life.",
					"responsibility": "This was my first major programming project at Periscopic, and represented a major learning experience for me. I spent a lot of time collaborating with the designer to get the look and feel just right.",
					"photos": [
						"img/projects/guns/guns_1.jpg",
						"img/projects/guns/guns_2.jpg",
						"img/projects/guns/guns_3.jpg"
					]
				}
			]
		},
		"explorations": {
			"choices": [
				{
					"name": "unknown",
					"preview": "img/explorations/unknown.png"
				},
				{
					"name": "epitrochoid",
					"preview": "img/explorations/epitrochoid.png"
				}
			]
		},
		"blog": {

		}
	};

	return Content;
});