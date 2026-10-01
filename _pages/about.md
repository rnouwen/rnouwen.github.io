---
layout: about
title: about
permalink: /
subtitle: 

profile:
  align: right
  image: me26.jpeg #mec.png
  image_circular: true # crops the image to make it circular
  more_info: 
selected_papers: false # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page

display_categories: [work] # categories to show in the projects grid below
horizontal: false # set true for horizontal project cards

announcements:
  enabled: false # rendered manually in a column below (see body); keep false to avoid duplicate news
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---


I'm a language scientist, with a background in cognitive science, artificial intelligence and logic. My main interest is in how we assign meaning to language and how that allows us to use language for communication. I use experimental and computational methods.  

[Tilburg School of Humanities & Digital Sciences](https://www.tilburguniversity.edu/about/schools/tshd)          
[Department of Communication & Cognition](https://www.tilburguniversity.edu/about/schools/tshd/departments/dcc)      
[Tilburg, the Netherlands](https://en.wikipedia.org/wiki/Tilburg)      
r:small_blue_diamond:w:small_blue_diamond:f:small_blue_diamond:nouwen:postbox:tilburguniversity:small_blue_diamond:edu      

<h2>news</h2>
<div class="news">
{% include news.liquid limit=true %}
</div>

<h2>research themes</h2>
<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if site.enable_project_categories and page.display_categories %}
{% assign sorted_projects = '' | split: '' %}
{% for category in page.display_categories %}
{% assign in_category = site.projects | where: "category", category | sort: "importance" %}
{% assign sorted_projects = sorted_projects | concat: in_category %}
{% endfor %}
{% endif %}
<div class="row row-cols-2 row-cols-md-3 row-cols-lg-3">
{% for project in sorted_projects %}
{% include projects.liquid %}
{% endfor %}
</div>
</div>


.